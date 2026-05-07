# Missing Frame Site

## Быстрый запуск

```bash
npm install
npm run dev
```

## Сборка

```bash
npm run build
npm run preview
```

## Переменные окружения

Создай `.env.local`:

```env
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHAT_IDS=123456789,-1009876543210
VITE_FORM_ENDPOINT=/api/contact
```

## Материалы

Команда:

```txt
public/assets/team/lead.png
public/assets/team/tech.png
public/assets/team/commercial.png
public/assets/team/creative.png
```

Главный фон:

```txt
public/assets/hero/mf-backstage-loop.webm
public/assets/hero/mf-backstage-loop.mp4
public/assets/hero/mf-backstage-poster.webp
```

Кейсы:

```txt
public/assets/cases/<case-folder>/cover.webp
public/assets/cases/<case-folder>/cover-loop.webp
public/assets/cases/<case-folder>/<video>.mp4
public/assets/cases/<case-folder>/gallery/01.webp
public/assets/cases/<case-folder>/gallery/02.webp
```

## Что исправлено в мобильной версии

- Мобильное меню теперь fullscreen, по центру экрана, с сильным blur-фоном.
- Карусель кейсов на мобиле показывает одну карточку без наложений.
- Текст кейсов на мобиле вынесен под изображение.
- Убраны декоративные линии, которые могли создавать визуальный мусор.
- Исправлена фраза в контактах: «за 15–20 минут».
