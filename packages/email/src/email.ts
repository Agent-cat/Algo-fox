import nodemailer from 'nodemailer';
import { Resend } from 'resend';
import { env } from '@algofox/env';

export const sendEmail = async ({ to, subject, text }: { to: string, subject: string, text: string }) => {
  try {
    // If a Resend API key is provided, use the Resend SDK
    if (env.RESEND_API_KEY) {
      const resend = new Resend(env.RESEND_API_KEY);
      const fromEmail = env.EMAIL_FROM;
      
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

    if (!env.SMTP_HOST) {
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
        host: env.SMTP_HOST,
        port: Number(env.SMTP_PORT) || 587,
        secure: env.SMTP_SECURE === 'true', // true for 465, false for other ports
        auth: {
          user: env.SMTP_USER,
          pass: env.SMTP_PASSWORD,
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
      from: env.SMTP_FROM || '"Algo-fox Auth" <no-reply@algo-fox.com>',
      to,
      subject,
      text,
    });
    
    console.log(`Email sent successfully to ${to}`);
    
    if (!env.SMTP_HOST) {
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info as any));
      console.log('==============================================');
    }
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
