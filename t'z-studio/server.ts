import express from "express";
import { createServer as createViteServer } from "vite";
import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes
  app.post("/api/contact", async (req, res) => {
    const { name, email, message, subject: customSubject } = req.body;

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.warn("RESEND_API_KEY not provided.");
      return res.status(400).json({ 
        status: "error", 
        message: "RESEND_API_KEY is missing. Please set it in environment variables." 
      });
    }

    const resend = new Resend(apiKey);
    const subject = customSubject || `【T'Z Studio】お問い合わせ: ${name}様`;
    const body = `お名前: ${name}\nメールアドレス: ${email}\n\nメッセージ:\n${message}`;

    console.log("Attempting to send email via Resend...");
    
    try {
      const htmlBody = body.replace(/\n/g, "<br>");
      const { data, error } = await resend.emails.send({
        from: "T'Z Studio <contact@t-z-studio.com>",
        to: "info@t-z-studio.com",
        subject: subject,
        text: body,
        html: `<div>${htmlBody}</div>`,
        replyTo: email,
      });

      if (error) {
        console.error("Resend API Error Details:", JSON.stringify(error, null, 2));
        return res.status(400).json({ 
          status: "error", 
          message: "Resend API Error", 
          details: error.message,
          code: error.name
        });
      }

      console.log("Resend Success Response:", JSON.stringify(data, null, 2));
      return res.json({ status: "ok", message: "Email sent successfully.", data });
    } catch (error: any) {
      console.error("Unexpected Error sending email via Resend:", error);
      return res.status(500).json({ 
        status: "error", 
        message: "Unexpected Server Error",
        details: error?.message || "Unknown error"
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
