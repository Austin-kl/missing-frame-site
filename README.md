# Missing Frame site

Готовый сайт на Vite + React. В архиве уже учтены последние правки:

- мобильное меню сильнее блюрит и затемняет весь фон;
- блок «Команда» реализован как карусель по той же визуальной логике, что и карусель кейсов;
- карточки команды не затемнены сильнее кейсов;
- кейс с музыкальным шоу удален;
- Telegram-ссылка сделана кликабельной;
- текст в каруселях нельзя выделять;
- карточки каруселей уменьшены, чтобы лучше помещались на экране;
- форма отправки заявки подготовлена под Vercel serverless API и Telegram.

## Быстрый запуск локально

```bash
npm install
npm run dev
```

Открыть адрес, который покажет Vite, обычно `http://localhost:5173`.

## Сборка

```bash
npm run build
```

Готовая статическая сборка появится в папке `dist`.

## Деплой на Vercel

1. Создать репозиторий на GitHub.
2. Залить туда все файлы проекта.
3. На Vercel выбрать `Add New Project` → импортировать репозиторий.
4. Framework Preset: `Vite`.
5. Build Command: `npm run build`.
6. Output Directory: `dist`.
7. В `Settings → Environment Variables` добавить:
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_CHAT_IDS`
   - при необходимости `VITE_FORM_ENDPOINT=/api/contact`
8. Перезадеплоить проект.

## Подключение Telegram

1. Создать бота через `@BotFather`.
2. Скопировать токен в `TELEGRAM_BOT_TOKEN`.
3. Узнать chat id личного чата или группы.
4. Указать один или несколько id через запятую в `TELEGRAM_CHAT_IDS`.

Форма отправляет поля:

- название проекта;
- email;
- описание;
- дополнительные контакты.

## Где заменить контакты

Файл: `src/main.jsx`

```js
const SOCIAL = {
  email: 'partner@missingframe.ru',
  telegramLabel: '@missingframe_production',
  telegramUrl: 'https://t.me/missingframe_production',
};
```

Если Telegram другой, заменить `telegramLabel` и `telegramUrl`.

## Логотип

Текущий логотип лежит тут:

```text
public/assets/logo.svg
```

Если нужно использовать финальный логотип из брендбука, заменить этот файл с тем же названием или обновить путь в `src/main.jsx`.
