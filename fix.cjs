#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const projectRoot = process.cwd();
const srcFolder = path.join(projectRoot, "src");
const exts = new Set([".js", ".jsx", ".ts", ".tsx"]);

// Regex para distintos casos
const IMPORT_FROM_RE = /\b(from\s+)(['"])(\.{1,2}\/[^'"]+)\2/g;
const REQUIRE_RE = /\brequire\(\s*(['"])(\.{1,2}\/[^'"]+)\1\s*\)/g;
const DYN_IMPORT_RE = /\bimport\(\s*(['"])(\.{1,2}\/[^'"]+)\1\s*\)/g;

function convertRelativeToAbsolute(filePath, relPath) {
  const fileDir = path.dirname(filePath);
  const absolutePath = path.resolve(fileDir, relPath);
  let relativeToSrc = path.relative(srcFolder, absolutePath);
  relativeToSrc = relativeToSrc.split(path.sep).join("/");
  return `@/${relativeToSrc}`;
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");
  let hasChanged = false;

  content = content
    .replace(IMPORT_FROM_RE, (m, prefix, quote, rel) => {
      hasChanged = true;
      return `${prefix}${quote}${convertRelativeToAbsolute(filePath, rel)}${quote}`;
    })
    .replace(REQUIRE_RE, (m, quote, rel) => {
      hasChanged = true;
      return `require(${quote}${convertRelativeToAbsolute(filePath, rel)}${quote})`;
    })
    .replace(DYN_IMPORT_RE, (m, quote, rel) => {
      hasChanged = true;
      return `import(${quote}${convertRelativeToAbsolute(filePath, rel)}${quote})`;
    });

  if (hasChanged) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`✔ Modificado: ${filePath}`);
  }
}

function traverse(folder) {
  for (const entry of fs.readdirSync(folder, { withFileTypes: true })) {
    const full = path.join(folder, entry.name);
    if (entry.isDirectory()) {
      traverse(full);
    } else if (exts.has(path.extname(entry.name))) {
      processFile(full);
    }
  }
}

console.log("🔄 Convirtiendo imports relativos a alias @/ …");
traverse(srcFolder);
console.log("✅ Listo.");
