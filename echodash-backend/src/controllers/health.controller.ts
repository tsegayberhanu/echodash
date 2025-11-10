import { APIResponder } from "../utils/apiResponder.utils.js";
import type { Request, Response } from "express";

export const healthController = async (_req: Request, res: Response) => {
  APIResponder.ok(
    res,
    { timestamp: new Date().toISOString() },
    "HEALTHY",
    "server is live"
  );
};