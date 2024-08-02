// src/pages/api/test.js
export default function handler(req, res) {
    if (req.method === "GET") {
      return res.status(200).json({ response: "ok response" });
    } else {
      return res.status(405).json({ message: "Method Not Allowed" });
    }
  }