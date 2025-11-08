import type { Response } from "express";
import type { AppError } from "../errors/app.error.js";

export class APIResponder {
  static ok<T>(
    res: Response,
    data: T,
    code = "SUCCESS",
    message = "Request successful"
  ): Response {
    return res.status(200).json({ status: "success", code, message, data });
  }
  static created<T>(
    res: Response,
    data: T,
    code = "CREATED",
    message = "Resource created successfully"
  ): Response {
    return res.status(201).json({ status: "success", code, message, data });
  }
  static deleted(res: Response): Response {
    return res.status(204).end();
  }
  static paginated<T>(
    res: Response,
    {
      data,
      total,
      page,
      limit,
    }: { data: T[]; total: number; page: number; limit: number }
  ): Response {
    const totalPages = Math.ceil(total / limit);
    return res.status(200).json({
      status: "success",
      code: "PAGINATED_RESULT",
      message: "Paginated data fetched successfully",
      data,
      meta: {
        pagination: {
          currentPage: page,
          itemsPerPage: limit,
          totalItems: total,
          totalPages,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
          nextPage: page < totalPages ? page + 1 : null,
          prevPage: page > 1 ? page - 1 : null,
        },
      },
    });
  }
  static error(res: Response, error: AppError): Response {
    return res.status(error.status || 500).json({
      status: "error",
      code: error.code || "INTERNAL_ERROR",
      message: error.message,
      ...(error.details && { details: error.details }),
    });
  }
}
