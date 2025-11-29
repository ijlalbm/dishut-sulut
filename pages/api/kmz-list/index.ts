import fs from "fs";
import path from "path";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const dir = path.join(process.cwd(), "public/uploads/peta-administrasi");
  let files: string[] = [];
  try {
    files = fs.readdirSync(dir).filter(f => f.endsWith(".kmz"));
  } catch (e) {}
  res.status(200).json({ files });
}