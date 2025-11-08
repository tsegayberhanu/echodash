import type { Request, Response} from "express";
import { APIResponder } from "../utils/apiResponder.utils.js";
import { NotFoundError } from "../errors/app.error.js";
export const notFoundHandler = (req: Request, res: Response) => {
  const error = new NotFoundError(`Cannot find ${req.originalUrl} with ${req.method} method on this server`);
  return APIResponder.error(res, error);
};
