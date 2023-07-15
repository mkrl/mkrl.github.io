A home page to house things of mine. Perhaps, great ideas or other things?

The terminal functionality is covered by [ttty](https://github.com/mkrl/ttty) - pure JS lightweight terminal "emulator".

Bundling handled by Vite

#### Build

```
npm i
npm start
```
Modify source @ `/source/`

Files and directories put in `/source/fs/` will appear in the virtual filesystem and available for traversing.
To regenerate the filesystem, run `npm run fs`.

Build with `npm run build` (assembled in /dist, ready to deploy).


