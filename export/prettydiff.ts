import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";

const types: string = readFileSync("index.d.ts", "utf-8");

function findLineNumber(line): number | undefined {
  const index = types.indexOf(line.trim());
  if (index !== -1) {
    const pre = types.substring(0, index);
    const lines = pre.split("\n");
    return lines.length;
  }
}

function printLinkHeading(block: string) {
  const withoutBlockComment = block.replace(/^\s*\/\*\*.*\*\/\s*/s, "");

  const name =
    /^( |\+)(export )?(declare function|declare type|declare const|type|declare class|interface|declare abstract class) (?<name>[a-zA-Z0-9]+)/m.exec(
      withoutBlockComment
    );

  if (name?.groups?.name) {
    const lineNumber = findLineNumber(name[0]);
    if (lineNumber)
      console.log(`### [${name?.[4]}](/index.d.ts#L${lineNumber})\n`);
  }
  return withoutBlockComment;
}

function codeBlock(lang: string, code: string) {
  return `\`\`\`${lang}
${code}
\`\`\`
`;
}

const lastTag = execSync(
  `git for-each-ref --sort=creatordate --format '%(refname)' refs/tags | tail -1`
).toString();

const secondLastTag = execSync(
  `git for-each-ref --sort=creatordate --format '%(refname)' refs/tags | tail -2 | head -1`
).toString();

// Get a git diff between the two most recent tags with full context
const diff = execSync(
  `git diff --minimal --unified="$(wc -l < index.d.ts)" ${secondLastTag.trim()}:index.d.ts ${lastTag}:index.d.ts | tail -n +5`
).toString();

// Split the diff by empty line (i.e. between type definitions)
// Also split by added newlines and removed newlines
const blocks = diff.split(/(\n \n|\n\+\n|\n-\n)/);

// Get all type definitions that have changed
const diffedBlocks = blocks.filter((b) => /^(\+|-)/m.test(b));

// Get all type definitions that are purely additive
const added = diffedBlocks.filter((b) => /^(\+.*\n?)+$/.test(b));
if (added.length > 0) {
  console.log(`## Added definitions`);
  added.forEach((b) => {
    printLinkHeading(b);
    console.log(codeBlock("ts", b.replace(/^\+(.*)$/gm, "$1")));
  });
}

// Get all type definitions that are purely deletions
const removed = diffedBlocks.filter((b) => /^(-.*\n?)+$/.test(b));
if (removed.length > 0) {
  console.log(`## Removed definitions`);
  removed.forEach((b) => {
    console.log(codeBlock("ts", b.replace(/^-(.*)$/gm, "$1")));
  });
}

// Get all changes that are updates to existing definitions
const updated = diffedBlocks.filter((b) => /^ /m.test(b));
if (updated.length > 0) {
  console.log(`## Updated definitions`);
  updated.forEach((b) => {
    const withoutBlockComment = printLinkHeading(b);
    console.log(
      codeBlock("diff", withoutBlockComment.replace(/^(  .*\n)+/gm, "   ...\n"))
    );
  });
}
