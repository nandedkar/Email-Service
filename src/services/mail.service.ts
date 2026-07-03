import nodemailer from "nodemailer";
import { emailConfig } from "../config/email";
import { compileTemplate, loadTemplate } from "../utils/templates";
import { WelcomeEmailData } from "../types/mail.types";
import path from "path/win32";

export enum EmailTemplate {
  Welcome = "welcome",
}

class MailService {
  private transporter = nodemailer.createTransport({
    host: emailConfig.host,
    port: emailConfig.port,
    secure: false, // true for 465, false for other ports
    auth: {
      user: emailConfig.user,
      pass: emailConfig.pass,
    },
  });

  async verify() {
    return this.transporter.verify();
  }

  async sendMail(options: nodemailer.SendMailOptions) {
    return this.transporter.sendMail(options);
  }

  async sendWelcomeEmail(data: WelcomeEmailData) {
    const { to, name, loginUrl } = data;
    const html = await loadTemplate(EmailTemplate.Welcome);
    const compiledHtml = compileTemplate(html, { name, loginUrl });
    const invoicePath = path.join(
      process.cwd(),
      "files",
      "sample.pdf",
    );
    const logoPath = path.join(process.cwd(), "files", "logo.png");
    return this.sendMail({
      from: `Workspace Team <${emailConfig.user}>`,
      to: to,
      subject: "Welcome to Workspace!",
      text: `Hello ${name},\n\nWelcome to Workspace!`,
      html: compiledHtml,
      attachments: [
        {
          filename: "sample.pdf",
          path: invoicePath,
          contentType: "application/pdf",
        },
        {
          filename: "logo.png",
          path: logoPath,
          contentType: "image/png",
          cid: "company-logo", // same cid value as in the html img src},
        },
      ],
    });
  }
}

export default new MailService();
