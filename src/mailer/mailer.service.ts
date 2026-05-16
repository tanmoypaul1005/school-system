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

    const subject = 'Your OTP Code';
    const text = `Your OTP code is ${otp}. It expires in 5 minutes.`;
    const html = this.buildOtpHtml(otp);

    await this.transporter.sendMail({
      from: this.defaultFrom,
      to,
      subject,
      text,
      html,
    });
  }

  private buildOtpHtml(otp: string) {
    return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>OTP Code</title>
  </head>
  <body style="margin:0; padding:0; background:#f5f7fb; font-family:Segoe UI, Tahoma, Geneva, Verdana, sans-serif; color:#1f2a44;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f7fb; padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px; background:#ffffff; border-radius:14px; overflow:hidden; box-shadow:0 6px 24px rgba(31,42,68,0.12);">
            <tr>
              <td style="background:linear-gradient(135deg,#0f172a,#1e3a8a); padding:24px 28px; color:#ffffff;">
                <div style="font-size:18px; letter-spacing:0.4px; font-weight:600;">School System</div>
                <div style="font-size:14px; opacity:0.85; margin-top:4px;">Verification Code</div>
              </td>
            </tr>
            <tr>
              <td style="padding:28px;">
                <h1 style="margin:0 0 12px; font-size:22px;">Confirm your email</h1>
                <p style="margin:0 0 16px; font-size:14px; line-height:1.6; color:#334155;">
                  Use the one-time password below to finish creating your account. This code expires in <strong>5 minutes</strong>.
                </p>
                <div style="margin:20px 0 8px; text-align:center;">
                  <div style="display:inline-block; padding:14px 24px; font-size:28px; letter-spacing:6px; font-weight:700; background:#eef2ff; color:#1e3a8a; border-radius:10px; border:1px solid #dbeafe;">
                    ${otp}
                  </div>
                </div>
                <p style="margin:8px 0 0; font-size:12px; text-align:center; color:#64748b;">
                  Do not share this code with anyone.
                </p>
                <hr style="border:none; border-top:1px solid #e2e8f0; margin:24px 0;" />
                <p style="margin:0; font-size:13px; line-height:1.6; color:#475569;">
                  If you did not request this code, you can safely ignore this email.
                </p>
              </td>
            </tr>
            <tr>
              <td style="background:#f8fafc; padding:16px 28px; font-size:12px; color:#94a3b8;">
                Need help? Reply to this email or contact support.
              </td>
            </tr>
          </table>
          <div style="font-size:11px; color:#94a3b8; margin-top:16px;">School System, automated message</div>
        </td>
      </tr>
    </table>
  </body>
</html>`;
  }
}
