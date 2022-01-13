/// <reference types="node" />
import * as fs from "fs";
import * as path from "path";
// marked is great for this: it includes the raw text in its tokens so
// we don't need to write code that renders tokens back to markdown
import marked from "marked";
import { Comment, CommentParam } from "./types";

interface CommentedField {
  name: string;
  comment?: Comment;
}

interface CommentedDeclaration {
  name: string;
  comment?: Comment;
  members?: CommentedField[];
}

// Get files to build docs from
const docsDir = path.join(__dirname, "..", "docs");
const filePaths = fs
  .readdirSync(docsDir)
  .map((fileName) => path.join(docsDir, fileName));

// Maps fenced code-block languages to those recognised by declaration renderers
const exampleLangRenames = {
  js: "typescript",
  ts: "typescript",
  javascript: "typescript",
  rs: "rust",
};

function trimComment(comment?: Comment) {
  if (comment === undefined) return;
  comment.text = comment.text.trim();
  if (comment.params) {
    comment.params = comment.params.map(({ name, text }) => ({
      name,
      text: text.trim(),
    }));
  }
  if (comment.returns) {
    comment.returns = comment.returns.trim();
  }
}

const declarations: Record<string, CommentedDeclaration> = {};
let declaration: CommentedDeclaration | undefined = undefined;
let field: CommentedField | undefined = undefined;

enum FieldState {
  // Enum member names must case-sensitive match expected 4th level heading texts
  Parameters,
  Returns,
  Examples,
}
let fieldState: FieldState | undefined = undefined;

function pushDeclaration() {
  /// Adds the current declaration (if any) to the map
  if (declaration !== undefined) {
    trimComment(declaration.comment);
    declarations[declaration.name] = declaration;

    declaration = undefined;
    fieldState = undefined;
  }
}

function pushField() {
  /// Adds the current field (if any) to the current declaration
  if (declaration !== undefined && field !== undefined) {
    trimComment(field.comment);
    declaration.members ??= [];
    declaration.members.push(field);

    field = undefined;
    fieldState = undefined;
  }
}

for (const filePath of filePaths) {
  const tokens = marked.lexer(fs.readFileSync(filePath, "utf8"));

  for (const token of tokens) {
    if (token.type === "heading" && token.depth === 2) {
      // New declaration
      pushDeclaration();
      // token.text === "`Declaration`"
      declaration = { name: token.text.substring(1, token.text.length - 1) };
      continue;
    } else if (declaration === undefined) {
      // If this isn't a new declaration, wait until we've got a declaration to add to
      continue;
    }

    if (token.type === "heading" && token.depth === 3) {
      // New field
      pushField();
      // token.text === "`Declaration.field`" or "`Declaration#field`"
      field = {
        name: token.text.substring(
          1 + declaration.name.length + 1,
          token.text.length - 1
        ),
      };
      continue;
    }

    if (field && token.type === "heading" && token.depth === 4) {
      fieldState = undefined;
      if (token.text in FieldState) {
        fieldState = FieldState[token.text];
        continue;
      }
    }

    if (
      field &&
      fieldState === FieldState.Parameters &&
      token.type === "list"
    ) {
      // Field parameters
      field.comment ??= { text: "" };
      field.comment.params ??= [];
      field.comment.params.push(
        ...token.items.map<CommentParam>((item) => {
          // item.text === "`name`: text" (text will be trimmed later by trimComment)
          const colon = item.text.indexOf(":");
          return {
            name: item.text.substring(1, colon - 1),
            text: item.text.substring(colon + 1),
          };
        })
      );
      continue;
    }

    if (field && fieldState === FieldState.Returns) {
      // Field returns
      field.comment ??= { text: "" };
      field.comment.returns ??= "";
      field.comment.returns += token.raw;
      continue;
    }

    if (field && fieldState === FieldState.Examples && token.type === "code") {
      // Field examples
      if (!token.lang) continue;
      let lang = token.lang;
      if (lang in exampleLangRenames) lang = exampleLangRenames[lang];
      field.comment ??= { text: "" };
      field.comment.examples ??= {};
      field.comment.examples[lang] ??= [];
      field.comment.examples[lang].push(token.text);
      continue;
    }

    // If we're in a field, add comments to that, otherwise add them to the declaration itself
    if (field) {
      field.comment ??= { text: "" };
      field.comment.text += token.raw;
    } else if (declaration) {
      declaration.comment ??= { text: "" };
      declaration.comment.text += token.raw;
    }
  }

  // Record final field and declaration (if any)
  pushField();
  pushDeclaration();
}

fs.writeFileSync("docs.json", JSON.stringify(declarations, null, 2), "utf8");
