import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const binDir = path.join(rootDir, 'node_modules', '.bin');

if (!fs.existsSync(binDir)) {
  fs.mkdirSync(binDir, { recursive: true });
}

const binaries = [
  { name: 'tsc', target: '../typescript/bin/tsc' },
  { name: 'vite', target: '../vite/bin/vite.js' },
  { name: 'vitest', target: '../vitest/vitest.mjs' },
  { name: 'eslint', target: '../eslint/bin/eslint.js' },
  { name: 'tsx', target: '../tsx/dist/cli.mjs' },
  { name: 'concurrently', target: '../concurrently/dist/bin/concurrently.js' },
  { name: 'rimraf', target: '../rimraf/dist/esm/bin.mjs' },
  { name: 'tailwindcss', target: '../tailwindcss/lib/cli.js' },
];

for (const b of binaries) {
  const cmdFile = path.join(binDir, `${b.name}.cmd`);
  const ps1File = path.join(binDir, `${b.name}.ps1`);
  const shFile = path.join(binDir, b.name);

  const cmdContent = `@ECHO off
GOTO start
:find_dp0
SET dp0=%~dp0
EXIT /b
:start
SETLOCAL
CALL :find_dp0

IF EXIST "%dp0%\\node.exe" (
  SET "_prog=%dp0%\\node.exe"
) ELSE (
  SET "_prog=node"
  SET PATHEXT=%PATHEXT:;.JS;=;%
)

endLocal & goto #_undefined_# 2>NUL || title %COMSPEC% & "%_prog%"  "%dp0%\\${b.target.replace(/\//g, '\\')}" %*
`;

  const shContent = `#!/bin/sh
basedir=$(dirname "$(echo "$0" | sed -e 's,\\\\,/,g')")
case \`uname\` in
    *CYGWIN*) basedir=\`cygpath -w "$basedir"\`;;
esac
exec node "$basedir/${b.target}" "$@"
`;

  fs.writeFileSync(cmdFile, cmdContent, 'utf8');
  fs.writeFileSync(shFile, shContent, 'utf8');
  console.log(`Created binary wrapper for ${b.name}`);
}

console.log('Successfully linked all workspace binaries.');
