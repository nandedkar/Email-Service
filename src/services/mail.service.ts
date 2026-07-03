import nodemailer from "nodemailer";
import { emailConfig } from "../config/email";

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
}

export default new MailService();
