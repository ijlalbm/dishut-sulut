// lib/getUserFromReq.ts
import { NextApiRequest } from "next";
import { verifyJwt } from "./jwt";

export function getUserFromReq(req: NextApiRequest) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) return null;
  const token = auth.split(" ")[1];
  try {
    return verifyJwt<{ sub: number; email?: string }>(token);
  } catch {
    return null;
  }
}