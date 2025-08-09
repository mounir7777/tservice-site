import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import rateLimit from "express-rate-limit";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));

// Rate limit: max 5 Anfragen / Minute pro IP
app.use("/contact", rateLimit({ windowMs: 60_000, max: 5 }));

// Health check
app.get("/", (_, res) => res.json({ ok: true }));

app.post("/contact", async (req, res) => {
  try {
    const { name, email, msg, honey } = req.body || {};
    if (honey) return res.status(200).json({ ok: true }); // Honeypot

    if (!name || !email) return res.status(400).json({ ok: false, error: "missing_fields" });

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: Boolean(process.env.SMTP_SECURE === "true"),
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
    });

    const info = await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to: process.env.TO_EMAIL,
      subject: `Neue Anfrage von ${name}`,
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\n\nNachricht:\n${msg || ""}`
    });

    res.json({ ok: true, id: info.messageId });
  } catch (e) {
    res.status(500).json({ ok: false, error: "send_failed" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("API listening on", port));
