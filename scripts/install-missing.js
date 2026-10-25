import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const nmDir = path.join(rootDir, 'node_modules');

const pkgsToFetch = [
  'nanoid',
  'autoprefixer',
  'browserslist',
  'caniuse-lite',
  'acorn',
  'cssesc',
  'jiti',
  'js-yaml',
  'loose-envify',
  'lz-string',
  'mime',
  'resolve',
  'rimraf',
  'tldts',
  'tree-kill',
  'tsx',
  'which',
];

async function fetchAndUnpack(pkgName) {
  try {
    const metaRes = await fetch(`https://registry.npmjs.org/${pkgName}/latest`);
    if (!metaRes.ok) return;
    const meta = await metaRes.json();
    const tarballUrl = meta.dist?.tarball;
    if (!tarballUrl) return;

    console.log(`Downloading ${pkgName}@${meta.version}...`);
    const tarRes = await fetch(tarballUrl);
    if (!tarRes.ok) return;

    const tgz = path.join(rootDir, `${pkgName.replace('/', '_')}.tgz`);
    const extract = path.join(rootDir, `temp_${pkgName.replace('/', '_')}`);
    fs.writeFileSync(tgz, Buffer.from(await tarRes.arrayBuffer()));
    fs.mkdirSync(extract, { recursive: true });

    execSync(`tar -xzf "${tgz}" -C "${extract}"`);

    const dest = path.join(nmDir, pkgName);
    fs.mkdirSync(dest, { recursive: true });
    fs.cpSync(path.join(extract, 'package'), dest, { recursive: true });

    fs.unlinkSync(tgz);
    fs.rmSync(extract, { recursive: true, force: true });
    console.log(`Installed ${pkgName}`);
  } catch (err) {
    console.warn(`Error on ${pkgName}:`, err.message);
  }
}

async function main() {
  for (const pkg of pkgsToFetch) {
    await fetchAndUnpack(pkg);
  }
  console.log('Finished downloading missing dependencies.');
}

main().catch(console.error);
