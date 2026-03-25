import {
  Html,
  Head,
  Body,
  Container,
  Text,
  Preview,
} from "@react-email/components";
import * as React from "react";

interface PlainTextProps {
  to: string;
  message: string;
}

const fontFamily = "'Assistant', Arial, Helvetica, sans-serif";

export const PlainText = ({
  to = "חבר/ה",
  message = "רציתי לשלוח לך הודעה קצרה. נשמח לדבר בקרוב!",
}: PlainTextProps) => (
  <Html dir="rtl" lang="he">
    <Head />
    <Preview>{message.slice(0, 50)}</Preview>
    <Body style={body}>
      <Container style={container}>
        <Text style={text}>היי {to},</Text>
        <Text style={text}>{message}</Text>
        <Text style={text}>
          בברכה,
          <br />
          עומרי אירם
        </Text>
      </Container>
    </Body>
  </Html>
);

PlainText.PreviewProps = {
  to: "דנה",
  message: "רציתי לשלוח לך הודעה קצרה. נשמח לדבר בקרוב!",
} as PlainTextProps;

export default PlainText;

const body: React.CSSProperties = {
  backgroundColor: "#ffffff",
  fontFamily,
  direction: "rtl",
};

const container: React.CSSProperties = {
  maxWidth: "600px",
  margin: "0 auto",
  padding: "40px 20px",
};

const text: React.CSSProperties = {
  fontSize: "16px",
  lineHeight: "26px",
  color: "#333333",
  textAlign: "right",
  fontFamily,
};
