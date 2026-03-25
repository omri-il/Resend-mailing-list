import "dotenv/config";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const { data, error } = await resend.emails.send({
  from: "onboarding@resend.dev",
  to: "hello@omri-iram.co.il",
  subject: "היי, זה עובד!",
  html: `<div dir="rtl" style="font-family: Arial, sans-serif; text-align: right;">
    <p>זה מייל פשוט שנשלח מהטרמינל. מגניב, לא?</p>
    <p><a href="https://omri-iram.co.il">לחצו כאן לאתר שלי</a></p>
  </div>`,
});

if (error) {
  console.error("Error:", error);
} else {
  console.log("Sent! ID:", data?.id);
}
