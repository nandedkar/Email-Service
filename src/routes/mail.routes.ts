import { Router } from "express";
import { emailConfig } from "../config/email";
import mailService from "../services/mail.service";
import { compileTemplate, loadTemplate } from "../utils/templates";

const router = Router();

router.get("/send", async (_req, res) => {
  try {
    const info = await mailService.sendMail({
      from: emailConfig.user,
      to: emailConfig.user,
      subject: "Test Email",
      html: `
<h1>Hello Manoj</h1>

<p>Welcome to our application.</p>

<button>Login</button>
`,
      text: "This is a test email from the Email Service API.",
    });
    res.json({
      success: true,
      message: "Test email sent successfully.",
      info,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to send email.",
      error,
    });
  }
});

router.get("/welcome", async (_req, res) => {
  const html = await loadTemplate("welcome");
  const compiledHtml = compileTemplate(html, {
    name: "Manoj",
    loginUrl: "https://example.com/login",
  });
  const info = await mailService.sendMail({
    from: emailConfig.user,
    to: emailConfig.user,
    subject: "Welcome Email",
    html: compiledHtml,
  });
  res.json({
    success: true,
    message: "Welcome email sent successfully.",
    info,
  });
});

export default router;
