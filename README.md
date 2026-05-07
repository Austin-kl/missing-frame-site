# Missing Frame Site

React + Vite сайт Missing Frame. В архиве уже подготовлены страницы: главная, услуги, кейсы, процесс, контакты и серверная функция для отправки заявки в Telegram.

## Запуск локально

```bash
npm install
npm run dev
```

## Сборка

```bash
npm run build
npm run preview
```

## Vercel

Настройки проекта:

- Framework Preset: `Vite`
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: оставить пустым или `npm install --no-audit --no-fund --progress=false`
- Root Directory: корень репозитория, где лежит `package.json`

## Переменные окружения

```env
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_IDS=123456789,-1009876543210
VITE_FORM_ENDPOINT=/api/contact
```

## Почему раньше Vercel мог долго висеть на Installing dependencies

В старых архивах `package-lock.json` был создан в среде с внутренним registry и содержал `resolved`-ссылки не на `registry.npmjs.org`. На Vercel такой lockfile может заставлять npm долго пытаться получить недоступные пакеты. В этой версии:

- удалён проблемный `package-lock.json`;
- добавлен `.npmrc` с публичным registry;
- зависимости зафиксированы версиями, а не `latest`;
- убран `framer-motion`, чтобы уменьшить число зависимостей.

После первого успешного деплоя Vercel должен кэшировать зависимости. Если снова будет 7–8 минут, проверьте Project → Settings → Build & Development Settings → Install Command и убедитесь, что используется корень проекта.

## Структура медиафайлов

| Блок | Директория | Файлы | Формат | Рекомендация |
|---|---|---|---|---|
| Hero showreel | `public/assets/hero/` | `mf-backstage-loop.webm`, `mf-backstage-loop.mp4`, `mf-backstage-poster.webp` | `.webm`, `.mp4`, `.webp` | Лучше 4:5 — `1080x1350` или `1440x1800`. Если загрузить 16:9, сайт обрежет края, потому что hero-блок вертикальный. |
| Фото команды | `public/assets/team/` | `lead.png`, `tech.png`, `commercial.png`, `creative.png` | `.png` или `.webp` с прозрачностью | `1200x1600`, прозрачный фон, объект по центру. |
| Обложка кейса | `public/assets/cases/<case>/` | `cover.webp` | `.webp` | `1600x1000` или `1920x1080`, до 900 КБ. |
| Loop кейса | `public/assets/cases/<case>/` | `cover-loop.webp` | animated `.webp` | 2–5 секунд, до 1–2 МБ. Если файла нет, покажется `cover.webp`. |
| Видео кейса | `public/assets/cases/<case>/` | `aftermovie.mp4`, `recap.mp4`, `showreel.mp4`, `fragment.mp4`, `teaser.mp4` | `.mp4`, H.264 | 1920×1080, 30–90 секунд, желательно до 20–40 МБ. |
| Постер видео | `public/assets/cases/<case>/` | `video-poster.webp` | `.webp` | 1920×1080, до 500 КБ. |
| Галерея кейса | `public/assets/cases/<case>/gallery/` | `01.webp` ... `06.webp` | `.webp` | 6 фото минимум. Можно расширить в коде до 12. |

## Папки кейсов

```txt
public/assets/cases/
  glowbyte/
  mediavypusknoy-2025/
  sports-live-events/
  production-system/
  svvfit/
  portal-13/
  short-film-ai/
```

В каждой папке кейса:

```txt
cover.webp
cover-loop.webp
video-poster.webp
<main-video>.mp4
gallery/
  01.webp
  02.webp
  03.webp
  04.webp
  05.webp
  06.webp
```
