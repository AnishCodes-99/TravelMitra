import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const tsDir = path.join(rootDir, 'node_modules', 'typescript');
const tempTgz = path.join(rootDir, 'typescript.tgz');
const tempExtract = path.join(rootDir, 'temp_ts');

async function downloadAndExtract() {
  console.log('Downloading typescript-5.7.2.tgz from npm registry...');
  const res = await fetch('https://registry.npmjs.org/typescript/-/typescript-5.7.2.tgz');
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(tempTgz, buffer);
  console.log(`Saved ${tempTgz} (${buffer.length} bytes)`);

  if (fs.existsSync(tempExtract)) {
    fs.rmSync(tempExtract, { recursive: true, force: true });
  }
  fs.mkdirSync(tempExtract, { recursive: true });

  console.log('Extracting with tar.exe...');
  execSync(`tar -xzf "${tempTgz}" -C "${tempExtract}"`);

  const packageDir = path.join(tempExtract, 'package');
  if (!fs.existsSync(tsDir)) {
    fs.mkdirSync(tsDir, { recursive: true });
  }

  // Copy all files from packageDir to tsDir
  console.log('Copying extracted files to node_modules/typescript...');
  fs.cpSync(packageDir, tsDir, { recursive: true });

  // Cleanup
  fs.unlinkSync(tempTgz);
  fs.rmSync(tempExtract, { recursive: true, force: true });
  console.log('Successfully set up typescript in node_modules/typescript!');
}

downloadAndExtract().catch(err => {
  console.error('Failed to setup typescript:', err);
  process.exit(1);
});
