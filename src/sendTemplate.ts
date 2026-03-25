import "dotenv/config";
import { Resend } from "resend";
import { render } from "@react-email/render";
import { templates, listTemplates } from "./templates.js";

const resend = new Resend(process.env.RESEND_API_KEY);

function parseArgs(args: string[]) {
  const result: Record<string, string> = {};

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg.startsWith("--") && i + 1 < args.length) {
      result[arg.slice(2)] = args[i + 1];
      i++;
    }
  }

  return result;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  // Show help / list templates
  if (!args.template || args.template === "list") {
    listTemplates();
    console.log("Usage:");
    console.log('  npm run send:template -- --template welcome --to "email@example.com"');
    console.log('  npm run send:template -- --template newsletter --subject "נושא מותאם" --title "כותרת"');
    console.log("\nFlags:");
    console.log("  --template    Template name (required)");
    console.log("  --to          Recipient email (default: hello@omri-iram.co.il)");
    console.log("  --subject     Override default subject");
    console.log("  --from        Sender address (default: onboarding@resend.dev)");
    console.log("  Any other --key value pairs are passed as template props.\n");
    return;
  }

  const templateName = args.template;
  const entry = templates[templateName];

  if (!entry) {
    console.error(`❌ Unknown template: "${templateName}"`);
    listTemplates();
    process.exit(1);
  }

  const to = args.to || "hello@omri-iram.co.il";
  const from = args.from || "omri@hello.omri-iram.co.il";
  const subject = args.subject || entry.defaultSubject;

  // Everything except meta flags becomes a template prop
  const metaKeys = new Set(["template", "to", "from", "subject"]);
  const props: Record<string, string> = {};
  for (const [key, value] of Object.entries(args)) {
    if (!metaKeys.has(key)) {
      props[key] = value;
    }
  }

  console.log(`📧 Template: ${templateName}`);
  console.log(`📬 To: ${to}`);
  console.log(`📝 Subject: ${subject}`);
  if (Object.keys(props).length > 0) {
    console.log(`⚙️  Props: ${JSON.stringify(props)}`);
  }

  const html = await render(entry.component(props));

  const { data, error } = await resend.emails.send({
    from,
    to,
    subject,
    html,
  });

  if (error) {
    console.error("❌ Failed to send:", error);
    process.exit(1);
  }

  console.log("✅ Email sent successfully!");
  console.log("🆔 Email ID:", data?.id);
}

main();
