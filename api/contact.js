export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatIdsRaw = process.env.TELEGRAM_CHAT_IDS || process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatIdsRaw) {
    return res.status(500).json({ ok: false, error: 'Telegram env variables are not configured' });
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
  const project = String(body.project || '').trim();
  const email = String(body.email || '').trim();
  const description = String(body.description || '').trim();
  const contacts = String(body.contacts || '').trim();

  if (!project || !email || !description) {
    return res.status(400).json({ ok: false, error: 'Required fields are missing' });
  }

  const text = [
    'Новая заявка с сайта Missing Frame',
    '',
    `Проект: ${project}`,
    `Email: ${email}`,
    contacts ? `Контакты: ${contacts}` : null,
    '',
    `Описание:\n${description}`,
  ].filter(Boolean).join('\n');

  const chatIds = chatIdsRaw.split(',').map(id => id.trim()).filter(Boolean);

  try {
    const results = await Promise.all(chatIds.map(chat_id => fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id, text, disable_web_page_preview: true }),
    })));

    const failed = results.find(response => !response.ok);
    if (failed) {
      const errorText = await failed.text();
      return res.status(502).json({ ok: false, error: errorText });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    return res.status(500).json({ ok: false, error: error.message });
  }
}
