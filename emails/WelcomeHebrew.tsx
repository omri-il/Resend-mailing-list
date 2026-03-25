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

interface WelcomeHebrewProps {
  firstName: string;
}

const fontFamily =
  "'Assistant', Arial, Helvetica, Verdana, sans-serif";

export const WelcomeHebrew = ({ firstName = "חבר/ה" }: WelcomeHebrewProps) => (
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
    <Preview>ברוכים הבאים! שמחים שהצטרפת אלינו</Preview>
    <Body style={body}>
      <Container style={container}>
        {/* Header */}
        <Section style={header}>
          <Heading style={logo}>עומרי אירם</Heading>
        </Section>

        {/* Greeting */}
        <Section style={content}>
          <Heading as="h2" style={heading}>
            שלום, {firstName}! 👋
          </Heading>
          <Text style={paragraph}>
            שמחים מאוד שהצטרפת לרשימת התפוצה שלנו. מעכשיו תקבל/י עדכונים,
            טיפים וכלים שיעזרו לך להתקדם בעולם ה-AI והטכנולוגיה.
          </Text>
          <Text style={paragraph}>
            אנחנו מאמינים שטכנולוגיה צריכה להיות נגישה לכולם — ובמיוחד למורים
            ואנשי חינוך שרוצים להביא חדשנות לכיתה.
          </Text>
        </Section>

        {/* CTA Button */}
        <Section style={buttonSection}>
          <Button style={button} href="https://omri-iram.co.il">
            להתחיל עכשיו
          </Button>
        </Section>

        <Hr style={divider} />

        {/* Footer */}
        <Section style={footer}>
          <Text style={footerText}>
            קיבלת את המייל הזה כי נרשמת לרשימת התפוצה של עומרי אירם.
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

WelcomeHebrew.PreviewProps = {
  firstName: "עומרי",
} as WelcomeHebrewProps;

export default WelcomeHebrew;

/* ───── Styles ───── */

const body: React.CSSProperties = {
  backgroundColor: "#f6f9fc",
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
  color: "#1a1a2e",
  fontFamily,
  margin: "0",
};

const content: React.CSSProperties = {
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  padding: "32px",
  marginTop: "16px",
};

const heading: React.CSSProperties = {
  fontSize: "24px",
  fontWeight: 700,
  color: "#1a1a2e",
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
  textAlign: "center",
  padding: "12px 32px",
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
