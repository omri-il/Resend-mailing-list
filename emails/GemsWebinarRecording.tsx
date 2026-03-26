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

interface GemsWebinarRecordingProps {
  firstName: string;
  youtubeUrl: string;
}

const fontFamily = "'Assistant', Arial, Helvetica, Verdana, sans-serif";

export const GemsWebinarRecording = ({
  firstName = "חבר/ה",
  youtubeUrl = "https://youtube.com/live/y8xEvEEoVAo",
}: GemsWebinarRecordingProps) => (
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
    <Preview>ההקלטה מוכנה — Gemini Gems בחינוך 🎬</Preview>
    <Body style={body}>
      <Container style={container}>
        {/* Header */}
        <Section style={header}>
          <Heading style={logo}>עומרי אירם</Heading>
        </Section>

        {/* Main content */}
        <Section style={content}>
          <Heading as="h2" style={heading}>
            היי, {firstName}! ההקלטה מוכנה 🎬
          </Heading>
          <Text style={paragraph}>
            תודה לכל מי שהצטרף לשידור החי — הייתם מדהימים!
          </Text>
          <Text style={paragraph}>
            למי שלא הצליח להגיע — אין בעיה. ההקלטה של הוובינר{" "}
            <strong>Gemini Gems בחינוך</strong> מחכה לכם עכשיו ביוטיוב.
          </Text>

          {/* What you'll learn recap */}
          <Section style={recapCard}>
            <Text style={recapTitle}>📚 מה תמצאו בהקלטה</Text>
            <Text style={recapText}>
              ✅ מה זה Gemini Gems ואיך הוא עובד
              <br />
              ✅ איך לבנות Gem חינוכי צעד אחר צעד
              <br />
              ✅ דוגמאות מעשיות לשימוש עם תלמידים
              <br />
              ✅ טיפים לפרומפטינג אפקטיבי
            </Text>
          </Section>
        </Section>

        {/* CTA */}
        <Section style={buttonSection}>
          <Button style={button} href={youtubeUrl}>
            לצפייה בהקלטה ▶️
          </Button>
        </Section>

        <Section style={noteSection}>
          <Text style={noteText}>
            אם הוובינר היה שימושי — שתפו עמית/ה מורה שגם יוכל להרוויח מזה 🙏
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

GemsWebinarRecording.PreviewProps = {
  firstName: "עומרי",
  youtubeUrl: "https://youtube.com/live/y8xEvEEoVAo",
} as GemsWebinarRecordingProps;

export default GemsWebinarRecording;

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

const recapCard: React.CSSProperties = {
  backgroundColor: "#f0fafa",
  border: "2px solid #d0eded",
  borderRadius: "10px",
  padding: "20px",
  marginTop: "8px",
};

const recapTitle: React.CSSProperties = {
  fontSize: "15px",
  fontWeight: 700,
  color: "#0D7377",
  textAlign: "right",
  fontFamily,
  margin: "0 0 10px 0",
};

const recapText: React.CSSProperties = {
  fontSize: "15px",
  lineHeight: "28px",
  color: "#4a4a68",
  textAlign: "right",
  fontFamily,
  margin: "0",
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
