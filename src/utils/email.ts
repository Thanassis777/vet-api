import * as process from 'process';
import nodemailer, { Transporter } from 'nodemailer';

interface EmailOptions {
  email: string;
  subject: string;
  message: string;
}

export const sendEmail = async (options: EmailOptions) => {
  // create transporter
  const transporter: Transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT),
    auth: {
      user: process.env.EMAIL_USERNAME, // specific username to each user regarding mailtrap account
      pass: process.env.EMAIL_PASSWORD, // // specific password to each user regarding mailtrap account
    },
  });

  // define options
  const mailOptions = {
    from: 'Test User malakopoulos1@gmail.com',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  // send email
  await transporter.sendMail(mailOptions);
};
