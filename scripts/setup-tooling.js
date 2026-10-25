import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

async function installPackage(name, version, targetDir) {
  console.log(`Downloading ${name}@${version}...`);
  const url = `https://registry.npmjs.org/${name}/-/${name.split('/').pop()}-${version}.tgz`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to download ${url}: ${res.statusText}`);

  const tgzPath = path.join(rootDir, `${name.replace('/', '_')}.tgz`);
  const extractDir = path.join(rootDir, `temp_${Date.now()}`);

  fs.writeFileSync(tgzPath, Buffer.from(await res.arrayBuffer()));
  fs.mkdirSync(extractDir, { recursive: true });

  execSync(`tar -xzf "${tgzPath}" -C "${extractDir}"`);

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const pkgSrc = path.join(extractDir, 'package');
  fs.cpSync(pkgSrc, targetDir, { recursive: true });

  fs.unlinkSync(tgzPath);
  try {
    fs.rmSync(extractDir, { recursive: true, force: true });
  } catch (e) {
    // ignore
  }

  console.log(`Successfully installed ${name}@${version}`);
}

async function run() {
  await installPackage('tailwindcss', '3.4.17', path.join(rootDir, 'node_modules', 'tailwindcss'));
  fs.cpSync(path.join(rootDir, 'node_modules', 'tailwindcss'), path.join(rootDir, 'client', 'node_modules', 'tailwindcss'), { recursive: true });
}

run().catch(console.error);
