"use server";

import nodemailer from "nodemailer";

export type DemoFormData = {
  name: string;
  company: string;
  email: string;
  phone: string;
};

export async function sendDemoEmail(data: DemoFormData) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: `"SlickShift Demo" <${process.env.GMAIL_USER}>`,
    to: "awojtowicz992@gmail.com",
    subject: `Nowe zapytanie demo — ${data.company}`,
    html: `
      <h2>Nowe zapytanie o demo</h2>
      <table style="border-collapse:collapse;width:100%;max-width:480px">
        <tr><td style="padding:8px 0;color:#50565d;font-size:14px">Imię</td><td style="padding:8px 0;font-size:14px;font-weight:600">${data.name}</td></tr>
        <tr><td style="padding:8px 0;color:#50565d;font-size:14px">Firma</td><td style="padding:8px 0;font-size:14px;font-weight:600">${data.company}</td></tr>
        <tr><td style="padding:8px 0;color:#50565d;font-size:14px">Email</td><td style="padding:8px 0;font-size:14px;font-weight:600">${data.email}</td></tr>
        <tr><td style="padding:8px 0;color:#50565d;font-size:14px">Telefon</td><td style="padding:8px 0;font-size:14px;font-weight:600">${data.phone}</td></tr>
      </table>
    `,
  });
}
