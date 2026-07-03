import nodemailer from "nodemailer";
import { emailConfig } from "../config/email";

const transporter = nodemailer.createTransport({
  host: emailConfig.host,
  port: emailConfig.port,
  secure: false, // true for 465, false for other ports
  auth: {
    user: emailConfig.user,
    pass: emailConfig.pass,
  },
});

export default transporter;
