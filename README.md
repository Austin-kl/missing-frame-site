# Missing Frame Site

## Быстрый запуск

```bash
npm install --no-audit --no-fund --progress=false
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Vercel

- Framework Preset: `Vite`
- Install Command: `npm install --no-audit --no-fund --progress=false`
- Build Command: `npm run build`
- Output Directory: `dist`
- Root Directory: корень проекта

## Переменные окружения

```env
VITE_FORM_ENDPOINT=/api/contact
TELEGRAM_BOT_TOKEN=...
TELEGRAM_CHAT_IDS=123456789,-1001234567890
```

## Структура медиафайлов

Все материалы кладутся в `public/assets`. На сайте они доступны без слова `public`: `/assets/...`.

```txt
public/
  assets/
    hero/
      mf-backstage-loop.webm
      mf-backstage-loop.mp4
      mf-backstage-poster.webp

    logo/
      missing-frame-logo.svg
      missing-frame-logo.png

    team/
      lead.png
      tech.png
      commercial.png
      creative.png

    cases/
      glowbyte/
        cover.webp
        cover-loop.webp
        cover-loop.webm
        aftermovie.mp4
        video-poster.webp
        gallery/
          01.webp
          02.webp
          03.webp
          04.webp
          05.webp
          06.webp

      mediavypusknoy-2025/
        cover.webp
        cover-loop.webp
        cover-loop.webm
        recap.mp4
        video-poster.webp
        gallery/
          01.webp
          02.webp
          03.webp
          04.webp
          05.webp
          06.webp

      sports-live-events/
        cover.webp
        cover-loop.webp
        cover-loop.webm
        showreel.mp4
        video-poster.webp
        gallery/
          01.webp
          02.webp
          03.webp
          04.webp
          05.webp
          06.webp

      production-system/
        cover.webp
        cover-loop.webp
        cover-loop.webm
        system-demo.mp4
        video-poster.webp
        gallery/
          01.webp
          02.webp
          03.webp
          04.webp
          05.webp
          06.webp

      svvfit/
        cover.webp
        cover-loop.webp
        cover-loop.webm
        vertical-pack.mp4
        video-poster.webp
        gallery/
          01.webp
          02.webp
          03.webp
          04.webp
          05.webp
          06.webp

      portal-13/
        cover.webp
        cover-loop.webp
        cover-loop.webm
        fragment.mp4
        video-poster.webp
        gallery/
          01.webp
          02.webp
          03.webp
          04.webp
          05.webp
          06.webp

      short-film-ai/
        cover.webp
        cover-loop.webp
        cover-loop.webm
        teaser.mp4
        video-poster.webp
        gallery/
          01.webp
          02.webp
          03.webp
          04.webp
          05.webp
          06.webp
```

## Логика обложек кейсов

Компонент автоматически проверяет наличие `cover-loop.webm` / `cover-loop.mp4` через HEAD-запрос.

- Если видео loop есть — показывается видео.
- Если видео loop нет — показывается `cover-loop.webp`.
- Если `cover-loop.webp` не загрузился — используется `cover.webp`.
- Если ничего нет — показывается нейтральный тёмный fallback без красной подсветки.

## Почему hero-видео может обрезаться

Hero-блок вертикальный, примерно 4:5. Лучше экспортировать видео так:

- `1080×1350`
- `1440×1800`
- `2160×2700`

Если положить горизонтальный файл `1920×1080`, он будет обрезаться через `object-cover`. Это нормальное поведение, чтобы видео полностью заполняло карточку.
