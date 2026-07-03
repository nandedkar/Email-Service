import "dotenv/config";

const host = process.env.SMTP_HOST;
const port = Number(process.env.SMTP_PORT);
const user = process.env.EMAIL_USER;
const pass = process.env.EMAIL_PASS;

if (!host || !Number.isFinite(port) || !user || !pass) {
  throw new Error(
    "Missing or invalid SMTP environment variables. Required: SMTP_HOST, SMTP_PORT, EMAIL_USER, EMAIL_PASS."
  );
}

export const emailConfig = {
  host,
  port,
  user,
  pass,
};
