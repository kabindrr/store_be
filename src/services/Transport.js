import nodemailer from "nodemailer";

//create transporter
export const EmailTransporter = () => {
  let transporter = nodemailer.createTransport({
    //get details from .env file to keep it secured
    host: process.env.SMTP_HOST,
    port: +process.env.SMTP_PORT,
    secure: false,

    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASS,
    },
  });
  return transporter;
};
