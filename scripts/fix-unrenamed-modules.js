import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const nmDir = path.resolve(__dirname, '../node_modules');

const entries = fs.readdirSync(nmDir);

for (const entry of entries) {
  // Matches patterns like .firebase-lyOmeIEy or .lucide-react-A9f0tox8
  if (entry.startsWith('.') && entry.includes('-') && !entry.startsWith('.bin') && !entry.startsWith('.package-lock')) {
    const pkgName = entry.substring(1).replace(/-[A-Za-z0-9_]{6,10}$/, '');
    const currentPath = path.join(nmDir, entry);
    const targetPath = path.join(nmDir, pkgName);

    if (!fs.existsSync(targetPath)) {
      try {
        fs.renameSync(currentPath, targetPath);
        console.log(`Restored: ${entry} -> ${pkgName}`);
      } catch (err) {
        console.error(`Failed to rename ${entry}:`, err);
      }
    } else {
      console.log(`Target ${pkgName} already exists. Cleaning up temp ${entry}`);
      try {
        fs.rmSync(currentPath, { recursive: true, force: true });
      } catch (e) {
        // ignore
      }
    }
  }
}

console.log('Finished module restoration.');
