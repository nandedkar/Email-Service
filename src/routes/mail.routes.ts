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
  try {
    const info = await mailService.sendWelcomeEmail({
      to: emailConfig.user,
      name: "Manoj",
      loginUrl: "https://magic.magicsoftwarexpc.co.uk/login",
    });
    res.json({
      success: true,
      info,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
});

export default router;
