import { Injectable } from '@nestjs/common';
import nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private readonly transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: String(process.env.SMTP_SECURE ?? '') === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  private readonly defaultFrom =
    process.env.SMTP_FROM ?? 'School System <no-reply@localhost>';

  async sendOtpEmail(to: string, otp: string) {
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      throw new Error('SMTP configuration is missing');
    }

    await this.transporter.sendMail({
      from: this.defaultFrom,
      to,
      subject: 'Your OTP Code',
      text: `Your OTP code is ${otp}. It expires in 5 minutes.`,
    });
  }
}
