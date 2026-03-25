import "dotenv/config";
import express from "express";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.post("/api/webhooks/resend", (req, res) => {
  const { type, data } = req.body;
  const timestamp = new Date().toISOString();

  switch (type) {
    case "email.sent":
      console.log(`[${timestamp}] ✉️  Email sent — ID: ${data.email_id}`);
      break;
    case "email.delivered":
      console.log(`[${timestamp}] ✅ Email delivered — ID: ${data.email_id}`);
      break;
    case "email.opened":
      console.log(`[${timestamp}] 👀 Email opened — ID: ${data.email_id}`);
      break;
    case "email.clicked":
      console.log(`[${timestamp}] 🔗 Link clicked — ID: ${data.email_id}`);
      break;
    case "email.bounced":
      console.log(`[${timestamp}] ❌ Email bounced — ID: ${data.email_id}`);
      break;
    case "email.complained":
      console.log(`[${timestamp}] ⚠️  Spam complaint — ID: ${data.email_id}`);
      break;
    default:
      console.log(`[${timestamp}] Unknown event: ${type}`, data);
  }

  res.status(200).json({ received: true });
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Webhook server running on http://localhost:${PORT}`);
  console.log(`Endpoint: POST http://localhost:${PORT}/api/webhooks/resend`);
});
