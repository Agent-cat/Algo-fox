import nodemailer from 'nodemailer';
import { Resend } from 'resend';

export const sendEmail = async ({ to, subject, text }: { to: string, subject: string, text: string }) => {
  try {
    // If a Resend API key is provided, use the Resend SDK
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const fromEmail = process.env.EMAIL_FROM || 'Algo-fox Auth <noreply@klusurabhi.in>';
      
      const { data, error } = await resend.emails.send({
        from: fromEmail,
        to: [to],
        subject,
        text,
      });

      if (error) {
        console.error('Error sending email with Resend:', error);
        return;
      }
      
      console.log(`Email sent successfully to ${to} via Resend. ID: ${data?.id}`);
      return;
    }

    let transporter;

    if (!process.env.SMTP_HOST) {
      // Use Ethereal for testing if no SMTP is provided
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
      console.log('================= MOCK EMAIL =================');
      console.log(`Using Ethereal for testing since no SMTP config is present.`);
    } else {
      transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
        tls: {
          // do not fail on invalid certs
          rejectUnauthorized: false
        },
        // force IPv4 to fix ENETUNREACH/ETIMEDOUT issues on some local networks
        family: 4, 
      } as any);
    }

    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || '"Algo-fox Auth" <no-reply@algo-fox.com>',
      to,
      subject,
      text,
    });
    
    console.log(`Email sent successfully to ${to}`);
    
    if (!process.env.SMTP_HOST) {
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info as any));
      console.log('==============================================');
    }
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
