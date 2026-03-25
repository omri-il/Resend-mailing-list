import "dotenv/config";
import express from "express";
import { Resend } from "resend";

const app = express();
const PORT = 3001;
const resend = new Resend(process.env.RESEND_API_KEY);

// In-memory log of clicks
const clicks: { email: string; timestamp: string }[] = [];

// When someone clicks the button in the email, they land here
app.get("/click", async (req, res) => {
  const email = req.query.email as string;
  const redirect = (req.query.redirect as string) || "https://omri-iram.co.il";
  const timestamp = new Date().toLocaleString("he-IL");

  // 1. Log the click
  clicks.push({ email, timestamp });
  console.log(`\n🔔 CLICK from ${email} at ${timestamp}`);
  console.log(`   Total clicks: ${clicks.length}`);

  // 2. Send the second email
  const { data, error } = await resend.emails.send({
    from: "omri@hello.omri-iram.co.il",
    to: email,
    subject: "שמחים שלחצת! הנה המשך 🎁",
    html: `<div dir="rtl" style="font-family: Arial, sans-serif; text-align: right; max-width: 500px; margin: 0 auto; padding: 32px;">
      <h2 style="color: #1a1a2e;">תודה שלחצת! 🎉</h2>
      <p style="font-size: 16px; line-height: 1.7; color: #444;">
        קיבלנו את הלחיצה שלך ושמחים שאת/ה מתעניין/ת.
        הנה קישור בונוס בשבילך:
      </p>
      <p style="text-align: center; margin: 24px 0;">
        <a href="https://omri-iram.co.il" style="background: #5046e5; color: white; padding: 12px 28px; border-radius: 6px; text-decoration: none; font-weight: bold;">לאתר שלי</a>
      </p>
      <p style="font-size: 13px; color: #999; text-align: center;">זה מייל אוטומטי שנשלח כי לחצת על הכפתור.</p>
    </div>`,
  });

  if (error) {
    console.error("   Failed to send follow-up:", error);
  } else {
    console.log(`   ✅ Follow-up email sent! ID: ${data?.id}`);
  }

  // 3. Redirect the user to the destination
  res.redirect(redirect);
});

// View all clicks
app.get("/clicks", (_req, res) => {
  res.json({ total: clicks.length, clicks });
});

app.listen(PORT, () => {
  console.log(`\n🚀 Automation server running on http://localhost:${PORT}`);
  console.log(`\nHow it works:`);
  console.log(`1. Run: npm run send:auto   (sends the first email)`);
  console.log(`2. Open the email and click the button`);
  console.log(`3. Watch here — you'll see the click + follow-up email sent`);
  console.log(`4. Check clicks: http://localhost:${PORT}/clicks\n`);
});
