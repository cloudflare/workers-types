/// <reference types="node" />
import * as assert from "assert";
import * as fs from "fs";
import * as path from "path";
import * as ts from "typescript";
import {
  Type,
  TypeParam,
  Comment,
  Field,
  Class,
  Struct,
  TypeDef,
  Function,
  Variable,
} from "./types";

// Get files to build overrides from
const publicOverridesDir = path.join(__dirname, "..", "overrides");
const filePaths = fs
  .readdirSync(publicOverridesDir)
  .map((fileName) => path.join(publicOverridesDir, fileName));
// Additional internal overrides
const additionalOverridesDir = process.argv[2] && path.resolve(process.argv[2]);
if (additionalOverridesDir) {
  filePaths.push(
    ...fs
      .readdirSync(additionalOverridesDir)
      .map((fileName) => path.join(additionalOverridesDir, fileName))
  );
}

// Parse file into AST
const program = ts.createProgram(filePaths, {
  noResolve: true,
  target: ts.ScriptTarget.Latest,
});

const keywordTypes = new Set<ts.SyntaxKind>([
  ts.SyntaxKind.NeverKeyword,
  ts.SyntaxKind.VoidKeyword,
  ts.SyntaxKind.NullKeyword,
  ts.SyntaxKind.UndefinedKeyword,
  ts.SyntaxKind.BooleanKeyword,
  ts.SyntaxKind.NumberKeyword,
  ts.SyntaxKind.StringKeyword,
  ts.SyntaxKind.AnyKeyword,
  ts.SyntaxKind.UnknownKeyword,
]);

type Declaration = Class | Struct | TypeDef | Function | Variable;
const declarations: Record<string, Declaration> = {};

for (const filePath of filePaths) {
  const sourceFile = program.getSourceFile(filePath);
  assert.ok(sourceFile);

  function getPos(pos: number): string {
    assert.ok(sourceFile);
    const mapped = sourceFile.getLineAndCharacterOfPosition(pos);
    return `${filePath}:${mapped.line + 1}:${mapped.character + 1}`;
  }

  function convertType(type?: ts.TypeNode): Type {
    if (type === undefined) {
      return { name: "any" };
    } else if (keywordTypes.has(type.kind)) {
      return { name: type.getText(sourceFile) };
    } else if (ts.isLiteralTypeNode(type)) {
      return { name: type.literal.getText(sourceFile) };
    } else if (ts.isTypeReferenceNode(type)) {
      return {
        name: type.typeName.getText(sourceFile),
        args: type.typeArguments?.map(convertType),
      };
    } else if (ts.isArrayTypeNode(type)) {
      return {
        name: "[]",
        args: [convertType(type.elementType)],
      };
    } else if (ts.isUnionTypeNode(type)) {
      return {
        name: "|",
        args: type.types.map(convertType),
      };
    } else if (ts.isTupleTypeNode(type)) {
      return {
        name: "()",
        params: type.elements.map(convertTupleMember),
      };
    } else if (ts.isFunctionTypeNode(type)) {
      const params = type.parameters.map(convertParameter);
      const returns = convertType(type.type);
      return { params, returns };
    } else if (ts.isTypeQueryNode(type)) {
      return {
        name: "typeof",
        args: [{ name: type.exprName.getText(sourceFile) }],
      };
    } else if (
      ts.isTypeOperatorNode(type) &&
      type.operator === ts.SyntaxKind.KeyOfKeyword
    ) {
      return {
        name: "keyof",
        args: [{ name: type.type.getText(sourceFile) }],
      };
    } else if (ts.isTypeLiteralNode(type)) {
      return {
        members: type.members.map(convertMember),
      };
    } else if (ts.isIndexedAccessTypeNode(type)) {
      const objectType = convertType(type.objectType);
      objectType.index = convertType(type.indexType);
      return objectType;
    } else if (ts.isParenthesizedTypeNode(type)) {
      return convertType(type.type);
    }
    throw new TypeError(
      `unrecognised type at ${getPos(type.pos)}: ${type.getText(sourceFile)}`
    );
  }

  function convertTupleMember(node: ts.TypeNode | ts.NamedTupleMember): Field {
    if (ts.isNamedTupleMember(node)) {
      return {
        name: node.name.getText(sourceFile),
        type: convertType(node.type),
      };
    } else {
      return { name: "", type: convertType(node) };
    }
  }

  function convertTypeParams(
    nodes?: ts.NodeArray<ts.TypeParameterDeclaration>
  ): TypeParam[] | undefined {
    return nodes?.map((node) => ({
      name: node.name.getText(sourceFile),
      constraint: node.constraint && convertType(node.constraint),
      default: node.default && convertType(node.default),
    }));
  }

  function convertCommentText(
    text?: string | ts.NodeArray<ts.JSDocText | ts.JSDocLink>
  ): string | undefined {
    if (text === undefined || typeof text === "string") {
      return text?.toString();
    } else {
      return text.map((part) => part.text).join(" ");
    }
  }

  function convertComment(node: ts.Node): Comment | undefined {
    // @ts-expect-error jsDoc is marked as @internal
    const jsDocs = node.jsDoc as ts.JSDoc[];
    if (jsDocs === undefined || jsDocs.length === 0) return undefined;
    const jsDoc = jsDocs[jsDocs.length - 1];
    const comment: Comment = { text: convertCommentText(jsDoc.comment) ?? "" };
    for (const tag of jsDoc.tags ?? []) {
      if (ts.isJSDocParameterTag(tag)) {
        comment.params ??= [];
        comment.params.push({
          name: tag.name.getText(sourceFile),
          text: convertCommentText(tag.comment) ?? "",
        });
      } else if (ts.isJSDocReturnTag(tag)) {
        comment.returns = convertCommentText(tag.comment);
      } else if (ts.isJSDocDeprecatedTag(tag)) {
        comment.deprecated = convertCommentText(tag.comment);
      }
    }
    return comment;
  }

  function convertParameter(node: ts.ParameterDeclaration): Field {
    const name = node.name.getText(sourceFile);
    const type = convertType(node.type);
    if (node.dotDotDotToken) type.variadic = true;
    type.optional = node.questionToken && true;
    return { name, type };
  }

  function convertConstructor(node: ts.ConstructorDeclaration): Field {
    const params = node.parameters.map(convertParameter);
    const type: Type = { params };
    const comment = convertComment(node);
    return { name: "constructor", type, comment };
  }

  function convertFieldMeta(
    node:
      | ts.MethodSignature
      | ts.MethodDeclaration
      | ts.PropertySignature
      | ts.PropertyDeclaration
      | ts.FunctionDeclaration
      | ts.ConstructSignatureDeclaration
  ): Partial<Field> {
    const comment = convertComment(node);
    const meta: Partial<Field> = { comment };
    for (const modifier of node.modifiers ?? []) {
      if (modifier.kind == ts.SyntaxKind.StaticKeyword) {
        meta.static = true;
      } else if (modifier.kind == ts.SyntaxKind.ReadonlyKeyword) {
        meta.readonly = true;
      }
    }
    return meta;
  }

  function convertMethod(
    node:
      | ts.MethodSignature
      | ts.MethodDeclaration
      | ts.FunctionDeclaration
      | ts.ConstructSignatureDeclaration
  ): Field {
    const defaultName = ts.isConstructSignatureDeclaration(node) ? "new" : "";
    const name = node.name?.getText(sourceFile) ?? defaultName;
    const params = node.parameters.map(convertParameter);
    const returns = convertType(node.type);
    const optional = node.questionToken && true;
    const type: Type = { params, returns, optional };
    const meta = convertFieldMeta(node);
    const typeparams = convertTypeParams(node.typeParameters);
    return { name, type, ...meta, typeparams };
  }

  function convertProperty(
    node: ts.PropertySignature | ts.PropertyDeclaration
  ): Field {
    const name = node.name.getText(sourceFile);
    const type = convertType(node.type);
    type.optional = node.questionToken && true;
    const meta = convertFieldMeta(node);
    return { name, type, ...meta };
  }

  function convertIndexSignature(node: ts.IndexSignatureDeclaration): Field {
    assert.ok(node.parameters.length == 1);
    const name = `[${node.parameters[0].getText(sourceFile)}]`;
    const type = convertType(node.type);
    return { name, type };
  }

  function convertMember(node: ts.Node): Field {
    if (ts.isConstructorDeclaration(node)) {
      return convertConstructor(node);
    }
    if (
      ts.isMethodSignature(node) ||
      ts.isMethodDeclaration(node) ||
      ts.isConstructSignatureDeclaration(node)
    ) {
      return convertMethod(node);
    }
    if (ts.isPropertySignature(node) || ts.isPropertyDeclaration(node)) {
      return convertProperty(node);
    }
    if (ts.isIndexSignatureDeclaration(node)) {
      return convertIndexSignature(node);
    }
    throw new TypeError(
      `unrecognised member at ${getPos(node.pos)}: ${node.getText(sourceFile)}`
    );
  }

  function convertHeritageClause(node: ts.HeritageClause): Type[] {
    return node.types.map((type) => ({
      name: type.expression.getText(sourceFile),
      args: type.typeArguments && type.typeArguments.map(convertType),
    }));
  }

  function convertHeritageClauses(
    nodes?: ts.NodeArray<ts.HeritageClause>
  ): Pick<Class, "extends" | "implements"> {
    const heritage: Pick<Class, "extends" | "implements"> = {};
    for (const node of nodes ?? []) {
      if (node.token === ts.SyntaxKind.ExtendsKeyword) {
        heritage.extends ??= [];
        heritage.extends.push(...convertHeritageClause(node));
      } else if (node.token === ts.SyntaxKind.ImplementsKeyword) {
        heritage.implements ??= [];
        heritage.implements.push(...convertHeritageClause(node));
      }
    }
    return heritage;
  }

  function convertClass(node: ts.ClassDeclaration): Class {
    assert.ok(node.name);
    const name = node.name.escapedText.toString();
    const members = node.members.map(convertMember);
    const typeparams = convertTypeParams(node.typeParameters);
    const heritage = convertHeritageClauses(node.heritageClauses);
    const comment = convertComment(node);
    return {
      kind: "class",
      name,
      members,
      typeparams,
      ...heritage,
      comment,
    };
  }

  function convertStruct(node: ts.InterfaceDeclaration): Struct {
    const name = node.name.escapedText.toString();
    const members = node.members.map(convertMember);
    const typeparams = convertTypeParams(node.typeParameters);
    const heritage = convertHeritageClauses(node.heritageClauses);
    const comment = convertComment(node);
    return {
      kind: "struct",
      name,
      members,
      typeparams,
      extends: heritage.extends,
      comment,
    };
  }

  function convertTypeDef(node: ts.TypeAliasDeclaration): TypeDef {
    const name = node.name.escapedText.toString();
    const type = convertType(node.type);
    const typeparams = convertTypeParams(node.typeParameters);
    const comment = convertComment(node);
    return {
      kind: "typedef",
      name,
      type,
      typeparams,
      comment,
    };
  }

  function convertFunction(node: ts.FunctionDeclaration): Function {
    const { name, type, typeparams, comment } = convertMethod(node);
    return {
      kind: "function",
      name,
      type,
      typeparams,
      comment,
    };
  }

  function convertVariableDeclaration(node: ts.VariableDeclaration): Variable {
    const name = node.name.getText(sourceFile);
    const type = convertType(node.type);
    const comment = convertComment(node);
    return {
      kind: "variable",
      name,
      type,
      comment,
    };
  }

  function convertVariable(node: ts.VariableStatement): Variable[] {
    return node.declarationList.declarations.map(convertVariableDeclaration);
  }

  function convertStatement(node: ts.Statement): Declaration[] {
    if (ts.isClassDeclaration(node)) {
      return [convertClass(node)];
    } else if (ts.isInterfaceDeclaration(node)) {
      return [convertStruct(node)];
    } else if (ts.isTypeAliasDeclaration(node)) {
      return [convertTypeDef(node)];
    } else if (ts.isFunctionDeclaration(node)) {
      return [convertFunction(node)];
    } else if (ts.isVariableStatement(node)) {
      return convertVariable(node);
    }
    throw new TypeError(
      `unrecognised statement at ${getPos(node.pos)}: ${node.getText(
        sourceFile
      )}`
    );
  }

  /**
   * Merge nodes that have the same name.
   * @param node1: The current node in the overrides.
   * @param node2: The node with the same name we encountered.
   * @return True if node2 was merged into node1. False if node1 doesn't exist and thus node2
   * just needs to be inserted.
   */
  function merge(node1: Declaration | undefined, node2: Declaration): boolean {
    if (node1 === undefined) {
      return false;
    }

    assert.strictEqual(node1.name, node2.name);

    if (node1.kind !== node2.kind) {
      throw new TypeError(
        `Conflicting types for ${node1.name}: ${node1.kind} vs ${node2.kind}`
      );
    }
    switch (node1.kind) {
      case "typedef":
      case "function":
      case "variable":
        throw new TypeError(
          `Two ${node1.kind}s with the same name ${node1.name}`
        );
      case "struct":
      case "class":
        if (node1.extends !== node2.extends) {
          throw new TypeError(
            `Conflicting extends values for multiple overrides of ${node1.name}`
          );
        }
        if (node1.implements !== node2.implements) {
          throw new TypeError(
            `Conflicting extends values for multiple overrides of ${node1.name}`
          );
        }
        for (const memberToMerge of node2.members) {
          node1.members.push(memberToMerge);
        }
        return true;
      default: {
        const _never: never = node1;
        throw new TypeError("Unexpected state");
      }
    }
  }

  for (const statement of sourceFile.statements) {
    if (ts.isExportDeclaration(statement)) {
      // Ignore "export {}" at the end of files, we use this so TypeScript doesn't think
      // the override files are lib files causing name collisions
      continue;
    }
    const nodes = convertStatement(statement);
    for (const node of nodes) {
      let name = node.name;
      if (merge(declarations[name], node)) {
        continue;
      }
      declarations[name] = node;
    }
  }
}

fs.writeFileSync(
  "overrides.json",
  JSON.stringify(declarations, null, 2),
  "utf8"
);
