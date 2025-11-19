// pages/api/protected/hello.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { verifyJwt } from "../../../lib/jwt";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) return res.status(401).json({ error: "Missing token" });

  const token = auth.split(" ")[1];

  try {
    const payload = verifyJwt<{ sub: number; email?: string }>(token);
    return res.status(200).json({ message: `Hello user ${payload.sub}`, payload });
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}