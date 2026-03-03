import express from "express";
import { createServer as createViteServer } from "vite";
import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes
  app.post("/api/contact", async (req, res) => {
    const { name, email, message, subject: customSubject } = req.body;

    const subject = customSubject || `【T'Z Studio】お問い合わせ: ${name}様`;
    const body = `お名前: ${name}\nメールアドレス: ${email}\n\nメッセージ:\n${message}`;

    console.log("Sending email to info@t-z-studio.com via Resend...");
    
    if (resend) {
      try {
        const { data, error } = await resend.emails.send({
          from: "T'Z Studio <onboarding@resend.dev>", // Replace with your verified domain in production
          to: ["info@t-z-studio.com"],
          subject: subject,
          text: body,
          replyTo: email,
        });

        if (error) {
          console.error("Resend error:", error);
          return res.status(500).json({ status: "error", message: error.message });
        }

        console.log("Email sent successfully via Resend:", data);
        return res.json({ status: "ok", message: "Email sent successfully." });
      } catch (error) {
        console.error("Error sending email via Resend:", error);
        return res.status(500).json({ status: "error", message: "Failed to send email." });
      }
    } else {
      // If no API key, log to console and simulate success
      console.warn("RESEND_API_KEY not provided. Email logged to console.");
      console.log("Subject:", subject);
      console.log("Body:", body);
      return res.json({ 
        status: "ok", 
        message: "Email logged to console (Resend not configured).",
        debug: { subject, body }
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static("dist"));
    app.get("*", (req, res) => {
      res.sendFile("dist/index.html", { root: "." });
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
