# Missing Frame — deploy fix

## Что исправлено
- В проекте больше не используется `framer-motion`, поэтому ошибка Rollup `failed to resolve import framer-motion` пропадает.
- `package.json` очищен от лишних зависимостей.
- `.npmrc` принудительно указывает публичный npm registry.
- Для кейса `production-system` добавлена папка `public/assets/cases/production-system/process/`.
- Красный fallback в блоках изображений производственной системы не используется.

## Что удалить у себя перед установкой нового архива
Удалить из корня проекта:

```txt
node_modules/
package-lock.json
```

Удалить старый пустой файл, если он есть:

```txt
public/assets/cases/production-system/gallery/.gitkeep
```

## Что положить для изображений кейса «Производственная система»

```txt
public/assets/cases/production-system/process/project-passport.webp
public/assets/cases/production-system/process/shot-list.webp
public/assets/cases/production-system/process/competency-matrix.webp
public/assets/cases/production-system/process/roadmap.webp
public/assets/cases/production-system/process/archive.webp
public/assets/cases/production-system/process/pca-review.webp
```

## Команды после замены архива

```bash
npm install
npm run build
git add .
git commit -m "Fix deploy and production system images"
git push origin main
```
