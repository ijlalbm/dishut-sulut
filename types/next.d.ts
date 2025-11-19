// types/next.d.ts (optional)
import { NextApiRequest } from "next";

declare module "next" {
  interface NextApiRequest {
    // you may add fields that middleware injects, e.g. userId
    userId?: number;
  }
}