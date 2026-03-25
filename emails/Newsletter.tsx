import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Button,
  Heading,
  Hr,
  Link,
  Preview,
  Font,
} from "@react-email/components";
import * as React from "react";

interface NewsletterProps {
  title: string;
  intro: string;
  tip: string;
  linkUrl: string;
  linkText: string;
}

const fontFamily = "'Assistant', Arial, Helvetica, Verdana, sans-serif";

export const Newsletter = ({
  title = "🤖 טיפ AI שבועי #12",
  intro = "השבוע גיליתי כלי חדש שיחסוך לכם שעות של עבודה. הנה הסיפור.",
  tip = "השתמשו ב-Claude Code כדי לכתוב סקריפטים אוטומטיים לכל משימה חוזרת. במקום לעשות את זה ידנית — תנו ל-AI לעבוד בשבילכם.",
  linkUrl = "https://omri-iram.co.il",
  linkText = "לקריאה המלאה",
}: NewsletterProps) => (
  <Html dir="rtl" lang="he">
    <Head>
      <Font
        fontFamily="Assistant"
        fallbackFontFamily={["Arial", "Helvetica", "Verdana", "sans-serif"]}
        webFont={{
          url: "https://fonts.googleapis.com/css2?family=Assistant:wght@400;700&display=swap",
          format: "woff2",
        }}
        fontWeight={400}
        fontStyle="normal"
      />
    </Head>
    <Preview>{title}</Preview>
    <Body style={body}>
      <Container style={container}>
        <Section style={header}>
          <Text style={headerLabel}>הניוזלטר של עומרי אירם</Text>
        </Section>

        <Section style={content}>
          <Heading as="h1" style={heading}>{title}</Heading>
          <Text style={paragraph}>{intro}</Text>
          <Hr style={divider} />
          <Heading as="h2" style={subheading}>💡 הטיפ של השבוע</Heading>
          <Text style={paragraph}>{tip}</Text>
          <Section style={buttonSection}>
            <Button style={button} href={linkUrl}>{linkText}</Button>
          </Section>
        </Section>

        <Hr style={divider} />
        <Section style={footer}>
          <Text style={footerText}>
            קיבלת את המייל הזה כי נרשמת לניוזלטר של עומרי אירם.
          </Text>
          <Text style={footerText}>
            <Link href="{{unsubscribe_url}}" style={unsubLink}>להסרה מהרשימה</Link>
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

Newsletter.PreviewProps = {
  title: "🤖 טיפ AI שבועי #12",
  intro: "השבוע גיליתי כלי חדש שיחסוך לכם שעות של עבודה. הנה הסיפור.",
  tip: "השתמשו ב-Claude Code כדי לכתוב סקריפטים אוטומטיים לכל משימה חוזרת. במקום לעשות את זה ידנית — תנו ל-AI לעבוד בשבילכם.",
  linkUrl: "https://omri-iram.co.il",
  linkText: "לקריאה המלאה",
} as NewsletterProps;

export default Newsletter;

const body: React.CSSProperties = {
  backgroundColor: "#f0f0f0",
  fontFamily,
  direction: "rtl",
};

const container: React.CSSProperties = {
  maxWidth: "600px",
  margin: "0 auto",
  padding: "40px 20px",
};

const header: React.CSSProperties = {
  textAlign: "center",
  padding: "16px 0",
};

const headerLabel: React.CSSProperties = {
  fontSize: "14px",
  color: "#888888",
  textTransform: "uppercase",
  letterSpacing: "2px",
  fontFamily,
};

const content: React.CSSProperties = {
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  padding: "32px",
};

const heading: React.CSSProperties = {
  fontSize: "24px",
  fontWeight: 700,
  color: "#1a1a2e",
  textAlign: "right",
  fontFamily,
  margin: "0 0 16px 0",
};

const subheading: React.CSSProperties = {
  fontSize: "20px",
  fontWeight: 700,
  color: "#1a1a2e",
  textAlign: "right",
  fontFamily,
  margin: "16px 0 8px 0",
};

const paragraph: React.CSSProperties = {
  fontSize: "16px",
  lineHeight: "28px",
  color: "#4a4a68",
  textAlign: "right",
  fontFamily,
};

const buttonSection: React.CSSProperties = {
  textAlign: "center",
  padding: "16px 0",
};

const button: React.CSSProperties = {
  backgroundColor: "#5046e5",
  borderRadius: "6px",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: 700,
  fontFamily,
  textDecoration: "none",
  padding: "12px 32px",
};

const divider: React.CSSProperties = {
  borderColor: "#e6e6e6",
  margin: "24px 0",
};

const footer: React.CSSProperties = {
  textAlign: "center",
};

const footerText: React.CSSProperties = {
  fontSize: "12px",
  color: "#8c8c8c",
  textAlign: "center",
  fontFamily,
};

const unsubLink: React.CSSProperties = {
  color: "#8c8c8c",
  textDecoration: "underline",
};
