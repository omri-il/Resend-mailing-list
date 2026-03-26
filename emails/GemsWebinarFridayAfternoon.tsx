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

interface GemsWebinarFridayAfternoonProps {
  firstName: string;
  youtubeUrl: string;
}

const fontFamily = "'Assistant', Arial, Helvetica, Verdana, sans-serif";

export const GemsWebinarFridayAfternoon = ({
  firstName = "חבר/ה",
  youtubeUrl = "https://youtube.com/live/y8xEvEEoVAo",
}: GemsWebinarFridayAfternoonProps) => (
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
    <Preview>מחר ב-20:00 — שידור חי על Gemini Gems! 🚀</Preview>
    <Body style={body}>
      <Container style={container}>
        {/* Header */}
        <Section style={header}>
          <Heading style={logo}>עומרי אירם</Heading>
        </Section>

        {/* Main content */}
        <Section style={content}>
          <Heading as="h2" style={heading}>
            {firstName}, מחר זה קורה! 🚀
          </Heading>
          <Text style={paragraph}>
            מחר בערב, <strong>ראשון 29 במרץ ב-20:00</strong>, השידור החי על{" "}
            <strong>Gemini Gems בחינוך</strong> מתחיל.
          </Text>
          <Text style={paragraph}>
            אני מחכה לכם שם — נבנה ביחד צ'אטבוט חינוכי שלם, צעד אחר צעד,
            בשידור חי.
          </Text>

          {/* Urgency box */}
          <Section style={urgencyCard}>
            <Text style={urgencyText}>
              ⏰ <strong>מחר ב-20:00</strong> — שמרו את הלינק הזה
            </Text>
          </Section>

          {/* Event details */}
          <Section style={eventCard}>
            <Text style={eventRow}>📅 מחר — ראשון, 29 במרץ 2026</Text>
            <Text style={eventRow}>🕗 20:00 — 21:00</Text>
            <Text style={eventRow}>▶️ שידור חי ביוטיוב</Text>
          </Section>
        </Section>

        {/* CTA */}
        <Section style={buttonSection}>
          <Button style={button} href={youtubeUrl}>
            לשידור החי מחר ▶️
          </Button>
        </Section>

        <Section style={noteSection}>
          <Text style={noteText}>
            שבת שלום — ונתראה מחר בערב! 🌙
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

GemsWebinarFridayAfternoon.PreviewProps = {
  firstName: "עומרי",
  youtubeUrl: "https://youtube.com/live/y8xEvEEoVAo",
} as GemsWebinarFridayAfternoonProps;

export default GemsWebinarFridayAfternoon;

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

const urgencyCard: React.CSSProperties = {
  backgroundColor: "#fff3f0",
  border: "2px solid #E8734A",
  borderRadius: "10px",
  padding: "16px 20px",
  marginBottom: "16px",
};

const urgencyText: React.CSSProperties = {
  fontSize: "16px",
  color: "#c0392b",
  textAlign: "right",
  fontFamily,
  margin: "0",
};

const eventCard: React.CSSProperties = {
  backgroundColor: "#f0fafa",
  border: "2px solid #d0eded",
  borderRadius: "10px",
  padding: "20px",
  marginTop: "8px",
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
  backgroundColor: "#E8734A",
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
  fontSize: "15px",
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
