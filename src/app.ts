import express from "express";
import transporter from "./services/mail.service";
import mailRoutes from "./routes/mail.routes";

const app = express();

app.use(express.json());
app.use("/mail", mailRoutes);

app.get("/", (_req, res) => {
  res.json({
    message: "Email Service API",
  });
});

app.get("/verify", async (_req, res) => {
  try {
    await transporter.verify();
    res.json({ success: true, message: "SMTP configuration is valid." });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "SMTP configuration is invalid.",
      error,
    });
  }
});

export default app;
