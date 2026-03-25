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

interface GemsWebinarConfirmationProps {
  firstName: string;
  youtubeUrl: string;
}

const fontFamily =
  "'Assistant', Arial, Helvetica, Verdana, sans-serif";

export const GemsWebinarConfirmation = ({
  firstName = "חבר/ה",
  youtubeUrl = "https://youtube.com/live/y8xEvEEoVAo",
}: GemsWebinarConfirmationProps) => (
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
    <Preview>נרשמת בהצלחה לוובינר Gemini Gems בחינוך!</Preview>
    <Body style={body}>
      <Container style={container}>
        {/* Header */}
        <Section style={header}>
          <Heading style={logo}>עומרי אירם</Heading>
        </Section>

        {/* Main content */}
        <Section style={content}>
          <Heading as="h2" style={heading}>
            שלום, {firstName}! 🎉
          </Heading>
          <Text style={paragraph}>
            נרשמת בהצלחה לוובינר <strong>Gemini Gems בחינוך</strong>!
          </Text>
          <Text style={paragraph}>
            בשידור החי נלמד איך לבנות צ'אטבוטים חינוכיים חכמים לתלמידים
            בעזרת Gemini Gems — בצורה פשוטה ומהירה.
          </Text>

          {/* Event details card */}
          <Section style={eventCard}>
            <Text style={eventRow}>📅 שבת, 28 במרץ 2026</Text>
            <Text style={eventRow}>🕗 20:30 — 21:30</Text>
            <Text style={eventRow}>▶️ שידור חי ביוטיוב</Text>
          </Section>
        </Section>

        {/* CTA Button */}
        <Section style={buttonSection}>
          <Button style={button} href={youtubeUrl}>
            לצפייה בשידור החי ▶️
          </Button>
        </Section>

        <Section style={noteSection}>
          <Text style={noteText}>
            💡 לא תוכלו להגיע? אין בעיה! השיעור יוקלט ויישלח לכל הנרשמים אחרי השידור.
          </Text>
        </Section>

        <Hr style={divider} />

        {/* Footer */}
        <Section style={footer}>
          <Text style={footerText}>
            קיבלת את המייל הזה כי נרשמת לוובינר Gemini Gems בחינוך של עומרי אירם.
          </Text>
          <Text style={footerText}>
            <Link href="{{unsubscribe_url}}" style={unsubscribeLink}>
              להסרה מרשימת התפוצה
            </Link>
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

GemsWebinarConfirmation.PreviewProps = {
  firstName: "עומרי",
  youtubeUrl: "https://youtube.com/live/example",
} as GemsWebinarConfirmationProps;

export default GemsWebinarConfirmation;

/* ───── Styles ───── */

const body: React.CSSProperties = {
  backgroundColor: "#f0fafa",
  fontFamily,
  direction: "rtl",
};

const container: React.CSSProperties = {
  maxWidth: "600px",
  margin: "0 auto",
  padding: "40px 20px",
  direction: "rtl",
};

const header: React.CSSProperties = {
  textAlign: "center",
  padding: "20px 0",
};

const logo: React.CSSProperties = {
  fontSize: "28px",
  fontWeight: 700,
  color: "#0D7377",
  fontFamily,
  margin: "0",
};

const content: React.CSSProperties = {
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  padding: "32px",
  marginTop: "16px",
};

const heading: React.CSSProperties = {
  fontSize: "24px",
  fontWeight: 700,
  color: "#0D7377",
  textAlign: "right",
  fontFamily,
  margin: "0 0 16px 0",
};

const paragraph: React.CSSProperties = {
  fontSize: "16px",
  lineHeight: "26px",
  color: "#4a4a68",
  textAlign: "right",
  fontFamily,
  margin: "0 0 16px 0",
};

const eventCard: React.CSSProperties = {
  backgroundColor: "#f0fafa",
  border: "2px solid #d0eded",
  borderRadius: "10px",
  padding: "20px",
  marginTop: "16px",
};

const eventRow: React.CSSProperties = {
  fontSize: "15px",
  fontWeight: 700,
  color: "#2d3436",
  textAlign: "right",
  fontFamily,
  margin: "0 0 6px 0",
  lineHeight: "24px",
};

const buttonSection: React.CSSProperties = {
  textAlign: "center",
  padding: "20px 0",
};

const button: React.CSSProperties = {
  backgroundColor: "#0D7377",
  borderRadius: "10px",
  color: "#ffffff",
  fontSize: "18px",
  fontWeight: 700,
  fontFamily,
  textDecoration: "none",
  textAlign: "center",
  padding: "14px 36px",
};

const noteSection: React.CSSProperties = {
  padding: "0 20px",
};

const noteText: React.CSSProperties = {
  fontSize: "14px",
  lineHeight: "22px",
  color: "#636e72",
  textAlign: "center",
  fontFamily,
  margin: "0",
};

const divider: React.CSSProperties = {
  borderColor: "#e6e6e6",
  margin: "24px 0",
};

const footer: React.CSSProperties = {
  textAlign: "center",
  padding: "0 20px",
};

const footerText: React.CSSProperties = {
  fontSize: "12px",
  lineHeight: "20px",
  color: "#8c8c8c",
  textAlign: "center",
  fontFamily,
  margin: "0 0 8px 0",
};

const unsubscribeLink: React.CSSProperties = {
  color: "#8c8c8c",
  textDecoration: "underline",
};
