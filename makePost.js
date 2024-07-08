import fs from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'url';

const currentDirectory = dirname(fileURLToPath(import.meta.url));

const date = Math.floor((new Date()).getTime() / 1000);

await fs.mkdir(join(currentDirectory, `src/routes/miniblog/${date}`), { recursive: true });
await fs.writeFile(join(currentDirectory, `src/routes/miniblog/${date}/+page.md`), '');
