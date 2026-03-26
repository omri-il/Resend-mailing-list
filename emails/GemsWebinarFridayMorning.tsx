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

interface GemsWebinarFridayMorningProps {
  firstName: string;
  youtubeUrl: string;
}

const fontFamily = "'Assistant', Arial, Helvetica, Verdana, sans-serif";

export const GemsWebinarFridayMorning = ({
  firstName = "חבר/ה",
  youtubeUrl = "https://youtube.com/live/y8xEvEEoVAo",
}: GemsWebinarFridayMorningProps) => (
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
    <Preview>מחר הוובינר! — הכינו את עצמכם ב-2 דקות ✨</Preview>
    <Body style={body}>
      <Container style={container}>
        {/* Header */}
        <Section style={header}>
          <Heading style={logo}>עומרי אירם</Heading>
        </Section>

        {/* Main content */}
        <Section style={content}>
          <Heading as="h2" style={heading}>
            היי, {firstName}! מחר זה קורה 🎓
          </Heading>
          <Text style={paragraph}>
            יובל הוא תלמיד שמתקשה. לא תמיד מגיע לשיעורים. לא תמיד מתעורר בבוקר.
          </Text>
          <Text style={paragraph}>
            לפני כמה חודשים הוא שלח לעומרי הודעה ב-<strong>שתיים בלילה</strong>:{" "}
            "תשמע, סינאפסה לא נתנה לי תשובה טובה."
          </Text>
          <Text style={paragraph}>
            סינאפסה הוא ה-Gem שעומרי בנה לתלמידים שלו בכיתה — עוזר למידה חינוכי שמותאם לביולוגיה.
            יובל לא רק השתמש בו — הוא <strong>הפעיל חשיבה ביקורתית</strong> כלפי תשובת ה-AI ב-2 בלילה.
          </Text>
          <Text style={paragraph}>
            מחר בשידור תראו את סינאפסה 3, ותבנו Gem כזה מאפס — בשידור חי, ביחד.
          </Text>

          {/* Prep tip */}
          <Section style={tipCard}>
            <Text style={tipTitle}>🛠️ הכנה של 2 דקות</Text>
            <Text style={tipText}>
              1. כנסו ל-gemini.google.com
              <br />
              2. לחצו על <strong>Gems</strong> בתפריט הצד שמאל
              <br />
              3. ראיתם? מצוין — מוכנים לשידור!
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
            לשמור ביומן ▶️
          </Button>
        </Section>

        <Section style={noteSection}>
          <Text style={noteText}>
            שבוע טוב — ונתראה מחר בערב! 🌟
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

GemsWebinarFridayMorning.PreviewProps = {
  firstName: "עומרי",
  youtubeUrl: "https://youtube.com/live/y8xEvEEoVAo",
} as GemsWebinarFridayMorningProps;

export default GemsWebinarFridayMorning;

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

const tipCard: React.CSSProperties = {
  backgroundColor: "#fffbea",
  border: "2px solid #f6d860",
  borderRadius: "10px",
  padding: "20px",
  marginBottom: "16px",
};

const tipTitle: React.CSSProperties = {
  fontSize: "15px",
  fontWeight: 700,
  color: "#856404",
  textAlign: "right",
  fontFamily,
  margin: "0 0 8px 0",
};

const tipText: React.CSSProperties = {
  fontSize: "15px",
  lineHeight: "26px",
  color: "#4a4a68",
  textAlign: "right",
  fontFamily,
  margin: "0",
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
