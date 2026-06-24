const token = process.env.TELEGRAM_BOT_TOKEN || process.env.TG_BOT_TOKEN;

if (!token) {
  console.error("missing TELEGRAM_BOT_TOKEN or TG_BOT_TOKEN");
  process.exit(2);
}

const chatId = process.env.TELEGRAM_CHAT_ID || process.env.TG_CHAT_ID;

if (!chatId) {
  console.error("missing TELEGRAM_CHAT_ID or TG_CHAT_ID");
  process.exit(2);
}

const args = process.argv.slice(2);
const summaryParts = [];

for (let index = 0; index < args.length; index += 1) {
  const arg = args[index];
  summaryParts.push(arg);
}

const summary = summaryParts.join(" ").trim();

if (!summary) {
  console.error("missing notification summary");
  process.exit(2);
}

const session = process.env.CODEX_THREAD_ID
  ? process.env.CODEX_THREAD_ID.slice(0, 8)
  : "未提供";
const cwd = process.cwd().split(/[\\/]/).filter(Boolean).pop() || process.cwd();
const timestamp = new Intl.DateTimeFormat("zh-CN", {
  dateStyle: "medium",
  timeStyle: "medium",
}).format(new Date());

const message = [
  "Codex 通知",
  "----------------",
  `SESSION  ${session}`,
  `SPACE    ${cwd}`,
  `TIME     ${timestamp}`,
  "",
  summary,
].join("\n");

const body = new URLSearchParams({
  chat_id: chatId,
  text: message,
  disable_web_page_preview: "true",
});

const response = await fetch(
  `https://api.telegram.org/bot${token}/sendMessage`,
  {
    method: "POST",
    body,
  },
);

if (!response.ok) {
  console.error(`telegram send failed: HTTP ${response.status}`);
  process.exit(1);
}

const result = await response.json();

if (!result.ok) {
  console.error("telegram send failed");
  process.exit(1);
}

console.log("sent");
