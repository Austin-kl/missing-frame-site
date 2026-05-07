function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function getChatIds() {
  const raw = process.env.TELEGRAM_CHAT_IDS || process.env.TELEGRAM_CHAT_ID || "";
  return raw
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);
}

async function sendTelegramMessage({ token, chatId, message }) {
  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Telegram failed for chat ${chatId}: ${errorText}`);
  }

  return response.json();
}

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatIds = getChatIds();

  if (!token || chatIds.length === 0) {
    return res.status(500).json({
      ok: false,
      error: "Telegram env variables are not configured",
    });
  }

  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ ok: false, error: "Invalid JSON" });
    }
  }

  const projectName = escapeHtml(body?.projectName);
  const description = escapeHtml(body?.description);
  const email = escapeHtml(body?.email);
  const contact = escapeHtml(body?.contact);
  const page = escapeHtml(body?.page);

  if (!projectName || !description || !email) {
    return res.status(400).json({ ok: false, error: "Required fields are missing" });
  }

  const message = [
    "<b>Новая заявка с сайта Missing Frame</b>",
    "",
    `<b>Проект:</b> ${projectName}`,
    `<b>Описание:</b> ${description}`,
    `<b>Email:</b> ${email}`,
    `<b>Контакт:</b> ${contact || "не указан"}`,
    "",
    `<b>Страница:</b> ${page}`,
  ].join("\n");

  const results = await Promise.allSettled(
    chatIds.map((chatId) => sendTelegramMessage({ token, chatId, message }))
  );

  const failed = results
    .map((result, index) => ({ result, chatId: chatIds[index] }))
    .filter((item) => item.result.status === "rejected");

  if (failed.length === chatIds.length) {
    return res.status(500).json({
      ok: false,
      error: "Telegram request failed for all chat IDs",
      failedChatIds: failed.map((item) => item.chatId),
    });
  }

  return res.status(200).json({
    ok: true,
    sentTo: chatIds.length - failed.length,
    failedChatIds: failed.map((item) => item.chatId),
  });
}
