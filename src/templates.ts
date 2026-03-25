import { WelcomeHebrew } from "../emails/WelcomeHebrew.js";
import { Newsletter } from "../emails/Newsletter.js";
import { Announcement } from "../emails/Announcement.js";
import { PlainText } from "../emails/PlainText.js";

interface TemplateEntry {
  component: (props: any) => React.ReactElement;
  defaultSubject: string;
  description: string;
  props: string[];
}

export const templates: Record<string, TemplateEntry> = {
  welcome: {
    component: WelcomeHebrew,
    defaultSubject: "ברוכים הבאים! 🎉",
    description: "Hebrew welcome email for new subscribers",
    props: ["firstName"],
  },
  newsletter: {
    component: Newsletter,
    defaultSubject: "🤖 טיפ AI שבועי",
    description: "Weekly tips newsletter with intro + tip sections",
    props: ["title", "intro", "tip", "linkUrl", "linkText"],
  },
  announcement: {
    component: Announcement,
    defaultSubject: "🎉 הודעה חשובה",
    description: "Course/event announcement with dark background",
    props: ["title", "body", "ctaText", "ctaUrl"],
  },
  plain: {
    component: PlainText,
    defaultSubject: "הודעה מעומרי אירם",
    description: "Simple personal text message",
    props: ["to", "message"],
  },
};

export function listTemplates(): void {
  console.log("\n📧 Available templates:\n");
  for (const [name, entry] of Object.entries(templates)) {
    console.log(`  ${name.padEnd(15)} — ${entry.description}`);
    console.log(`  ${"".padEnd(15)}   Props: ${entry.props.join(", ")}`);
    console.log();
  }
}
