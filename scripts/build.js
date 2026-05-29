import { access, mkdir, writeFile } from 'node:fs/promises';
await access('src/index.js');
await mkdir('dist', { recursive: true });
await writeFile('dist/README.txt', 'Build OK - source module verified.\n');
console.log('build ok');
