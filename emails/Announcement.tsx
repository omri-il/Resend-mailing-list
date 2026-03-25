import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Button,
  Heading,
  Preview,
  Font,
} from "@react-email/components";
import * as React from "react";

interface AnnouncementProps {
  title: string;
  body: string;
  ctaText: string;
  ctaUrl: string;
}

const fontFamily = "'Assistant', Arial, Helvetica, Verdana, sans-serif";

export const Announcement = ({
  title = "🎉 קורס חדש נפתח להרשמה!",
  body = "שמחים לבשר שהקורס 'AI למורים — מאפס לגיבור' נפתח להרשמה. 10 מפגשים מעשיים, קהילה תומכת, וכלים שתוכלו להשתמש בהם כבר מחר בכיתה.",
  ctaText = "לפרטים והרשמה",
  ctaUrl = "https://omri-iram.co.il",
}: AnnouncementProps) => (
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
    <Body style={bodyStyle}>
      <Container style={container}>
        <Section style={card}>
          <Heading as="h1" style={heading}>{title}</Heading>
          <Text style={paragraph}>{body}</Text>
          <Section style={buttonSection}>
            <Button style={button} href={ctaUrl}>{ctaText}</Button>
          </Section>
        </Section>
        <Text style={footer}>עומרי אירם • hello@omri-iram.co.il</Text>
      </Container>
    </Body>
  </Html>
);

Announcement.PreviewProps = {
  title: "🎉 קורס חדש נפתח להרשמה!",
  body: "שמחים לבשר שהקורס 'AI למורים — מאפס לגיבור' נפתח להרשמה. 10 מפגשים מעשיים, קהילה תומכת, וכלים שתוכלו להשתמש בהם כבר מחר בכיתה.",
  ctaText: "לפרטים והרשמה",
  ctaUrl: "https://omri-iram.co.il",
} as AnnouncementProps;

export default Announcement;

const bodyStyle: React.CSSProperties = {
  backgroundColor: "#1a1a2e",
  fontFamily,
  direction: "rtl",
  padding: "40px 0",
};

const container: React.CSSProperties = {
  maxWidth: "600px",
  margin: "0 auto",
  padding: "20px",
};

const card: React.CSSProperties = {
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  padding: "40px 32px",
  textAlign: "center",
};

const heading: React.CSSProperties = {
  fontSize: "28px",
  fontWeight: 700,
  color: "#1a1a2e",
  fontFamily,
  margin: "0 0 20px 0",
};

const paragraph: React.CSSProperties = {
  fontSize: "16px",
  lineHeight: "28px",
  color: "#4a4a68",
  textAlign: "right",
  fontFamily,
  margin: "0 0 24px 0",
};

const buttonSection: React.CSSProperties = {
  textAlign: "center",
};

const button: React.CSSProperties = {
  backgroundColor: "#e74c3c",
  borderRadius: "6px",
  color: "#ffffff",
  fontSize: "18px",
  fontWeight: 700,
  fontFamily,
  textDecoration: "none",
  padding: "14px 40px",
};

const footer: React.CSSProperties = {
  fontSize: "12px",
  color: "#888888",
  textAlign: "center",
  fontFamily,
  marginTop: "24px",
};
