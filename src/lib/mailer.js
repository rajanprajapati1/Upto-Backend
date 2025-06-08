import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export const getEmailTemplate = (name, email, message) => `
  <div style="font-family: 'Segoe UI', sans-serif; padding: 20px; background-color: #f9fafb; color: #333;">
    <div style="max-width: 600px; margin: auto; background: white; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); overflow: hidden;">
      <div style="background-color: #3b82f6; padding: 20px; color: white;">
        <h2>📬 New Contact Form Submission</h2>
      </div>
      <div style="padding: 24px;">
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p style="background: #f3f4f6; padding: 12px; border-radius: 6px; white-space: pre-line;">${message}</p>
      </div>
      <div style="padding: 16px; text-align: center; font-size: 12px; color: #9ca3af;">
        Sent from your website contact form
      </div>
    </div>
  </div>
`;

export const sendMail = async ({
    from,
    to,
    subject,
    html,
}) => {
    await transporter.sendMail({ from, to, subject, html });
};
