import {
  Html,
  Head,
  Font,
  Preview,
  Heading,
  Section,
  Text,
  Button,
  Container,
  Img,
} from '@react-email/components';
import { CSSProperties } from 'react';

interface VerificationEmailProps {
  username: string;
  otp: string;
  email  :string;
}

export default function VerificationEmailTemplate({ username, otp, email}: VerificationEmailProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Verification Code</title>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Arial"
          webFont={{
            url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
            format: 'woff2',
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>Your verification code: {otp}</Preview>

      {/* Background Section */}
      <Section style={styles.body}>
        <Container style={styles.card}>
          
          {/* Logo Section */}
          <Img
            src="https://via.placeholder.com/150" // Replace with your logo URL
            width="100"
            height="50"
            alt="Company Logo"
            style={styles.logo}
          />

          <Heading as="h2" style={styles.heading}>Verify Your Account</Heading>
          <Heading as="h3" style={styles.username}>Hello <strong >{username}</strong>, <br /></Heading>

          <Text style={styles.text}>
            Use the verification code below for sign-up:
          </Text>

          <Text style={styles.otp}>{otp}</Text>

          <br />

          <Button
            href={`/user/verifyemail/${email}`}
            style={styles.button}
          >
            Verify Now
          </Button>

          <Text style={styles.note}>
            If you didn't request this code, please ignore this email.
          </Text>

          {/* Footer Section */}
          <Text style={styles.footer}>
            Need help? Contact us at <a href="mailto:support@sevasaathi.in" style={styles.link}>support@sevasaathi.in</a>
          </Text>
        </Container>
      </Section>
    </Html>
  );
}

// Define styles with proper CSSProperties typing
const styles: Record<string, CSSProperties> = {
  body: {
    backgroundColor: '#f4f4f4',
    padding: '40px 0',
    textAlign: 'center',
    fontFamily: 'Roboto, sans-serif',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    padding: '30px',
    maxWidth: '450px',
    margin: 'auto',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  logo: {
    marginBottom: '15px',
  },
  heading: {
    color: '#333',
    fontSize: '22px',
    marginBottom: '15px',
  },
  username: {
    color: '#007bff',
    fontSize: '28px',
    marginBottom: '15px',
  },
  text: {
    color: '#555',
    fontSize: '16px',
    lineHeight: '1.5',
    marginBottom: '20px',
  },
  otp: {
    backgroundColor: '#f3f3f3',
    padding: '12px',
    borderRadius: '5px',
    display: 'inline-block',
    fontSize: '22px',
    fontWeight: 'bold',
    color: '#333',
    letterSpacing: '2px',
    marginBottom: '20px',
  },
  button: {
    backgroundColor: '#007bff',
    color: '#ffffff',
    padding: '14px 24px',
    borderRadius: '5px',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  note: {
    color: '#888',
    fontSize: '14px',
    marginBottom: '15px',
  },
  footer: {
    fontSize: '13px',
    color: '#777',
  },
  link: {
    color: '#007bff',
    textDecoration: 'none',
  },
};
