// /api/claude.js
// This runs on Vercel's servers, NOT in the browser.
// The API key here is never exposed to users.

// Simple in-memory rate limiter (resets when function cold-starts;
// for production scale, replace with Redis/Upstash - see notes below)
const rateLimitMap = new Map();
const RATE_LIMIT = 15; // requests
const RATE_WINDOW = 60 * 60 * 1000; // per hour, per IP

function checkRateLimit(ip) {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (!record || now - record.windowStart > RATE_WINDOW) {
    rateLimitMap.set(ip, { count: 1, windowStart: now });
    return true;
  }
  if (record.count >= RATE_LIMIT) return false;
  record.count++;
  return true;
}

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: { message: "Method not allowed" } });
  }

  // Basic CORS for your own frontend (adjust origin in production if needed)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: { message: "Server is not configured with an API key. Contact support." } });
  }

  const ip = req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || req.socket?.remoteAddress || "unknown";
  if (!checkRateLimit(ip)) {
    return res.status(429).json({ error: { message: "Too many requests. Please wait a while before asking the Oracle again." } });
  }

  try {
    const { model, max_tokens, system, messages } = req.body;

    // Basic validation / guardrails
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: { message: "Invalid request: messages array required." } });
    }
    if (messages.length > 40) {
      return res.status(400).json({ error: { message: "Conversation too long. Please start a new chat." } });
    }

    const upstream = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: model || "claude-sonnet-4-6",
        max_tokens: Math.min(max_tokens || 1000, 2000),
        system: system,
        messages: messages
      })
    });

    const data = await upstream.json();

    if (!upstream.ok) {
      return res.status(upstream.status).json({ error: { message: data.error?.message || "Upstream API error" } });
    }

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: { message: "Server error: " + err.message } });
  }
}
