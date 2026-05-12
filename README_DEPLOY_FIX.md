# Deploy fix

This version removes the broken package-lock generated from an internal registry and pins Vite/React versions compatible with Node 20.

Before replacing files locally, delete:

```bash
node_modules
package-lock.json
```

Then run:

```bash
npm install
npm run build
git add .
git commit -m "Fix Vercel install"
git push origin main
```

In Vercel, keep these settings:

- Framework: Vite
- Install Command: npm install --no-audit --no-fund --progress=false --prefer-offline
- Build Command: npm run build
- Output Directory: dist
- Node.js: 20.x
