import "dotenv/config";
import { Resend } from "resend";
import { render } from "@react-email/render";
import { WelcomeHebrew } from "../emails/WelcomeHebrew.js";

const resend = new Resend(process.env.RESEND_API_KEY);

async function main() {
  const firstName = process.argv[2] || "עומרי";

  console.log(`Rendering email for: ${firstName}...`);
  const html = await render(WelcomeHebrew({ firstName }));

  console.log("Sending email...");
  const { data, error } = await resend.emails.send({
    from: "omri@mail.omri-iram.co.il",
    to: "hello@omri-iram.co.il",
    subject: "ברוכים הבאים! 🎉",
    html,
  });

  if (error) {
    console.error("Failed to send:", error);
    process.exit(1);
  }

  console.log("Email sent successfully!");
  console.log("Email ID:", data?.id);
}

main();
