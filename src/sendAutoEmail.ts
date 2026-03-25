import "dotenv/config";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// The button link points to your automation server, which tracks the click and sends email #2
const TRACKING_URL = `http://localhost:3001/click?email=hello@omri-iram.co.il&redirect=https://omri-iram.co.il`;

const { data, error } = await resend.emails.send({
  from: "omri@mail.omri-iram.co.il",
  to: "hello@omri-iram.co.il",
  subject: "🎯 לחצ/י על הכפתור וקבל/י הפתעה",
  html: `<div dir="rtl" style="font-family: Arial, sans-serif; text-align: right; max-width: 500px; margin: 0 auto; padding: 32px;">
    <h2 style="color: #1a1a2e;">היי עומרי! 👋</h2>
    <p style="font-size: 16px; line-height: 1.7; color: #444;">
      יש לנו משהו מיוחד בשבילך. לחצ/י על הכפתור למטה וקבל/י מייל בונוס אוטומטית!
    </p>
    <p style="text-align: center; margin: 28px 0;">
      <a href="${TRACKING_URL}" style="background: #5046e5; color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 18px;">לחצ/י כאן לקבלת ההפתעה →</a>
    </p>
    <p style="font-size: 13px; color: #999; text-align: center;">כשתלחצ/י, תקבל/י מייל נוסף אוטומטית + הלחיצה תירשם.</p>
  </div>`,
});

if (error) {
  console.error("Error:", error);
} else {
  console.log("✅ First email sent! ID:", data?.id);
  console.log("\nNext: make sure the automation server is running (npm run auto)");
  console.log("Then click the button in the email you just received.");
}
