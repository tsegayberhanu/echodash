import type { Request, Response, NextFunction } from "express";
import { APIResponder } from "../utils/apiResponder.utils.js";
import { AppError } from "../errors/app.error.js";

export const globalErrorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof AppError) {
    return APIResponder.error(res, err);
  }

  const internalError = new AppError(
    "An unexpected error occurred. Please try again later.",
    500,
    "INTERNAL_SERVER_ERROR"
  );

  return APIResponder.error(res, internalError);
};
