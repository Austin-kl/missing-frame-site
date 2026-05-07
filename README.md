# Missing Frame Site

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

## Материалы

Команда:

```txt
public/assets/team/lead.png
public/assets/team/tech.png
public/assets/team/commercial.png
public/assets/team/creative.png
```

Кейсы:

```txt
public/assets/cases/<case-folder>/cover.webp
public/assets/cases/<case-folder>/cover-loop.webp
public/assets/cases/<case-folder>/<video>.mp4
public/assets/cases/<case-folder>/gallery/01.webp
```

## Telegram-заявки

В Vercel добавь переменные:

```env
TELEGRAM_BOT_TOKEN=...
TELEGRAM_CHAT_IDS=123456789,-1001234567890
VITE_FORM_ENDPOINT=/api/contact
```

`TELEGRAM_CHAT_IDS` поддерживает несколько ID через запятую.
