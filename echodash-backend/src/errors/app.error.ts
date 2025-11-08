export class AppError extends Error {
  public readonly status: number;
  public readonly code: string;
  public readonly details?: any;
  public readonly isOperational: boolean;

  constructor(message: string, status = 500, code = "INTERNAL_ERROR", details?: any, isOperational = true) {
    super(message);
    this.status = status;
    this.code = code;
    this.details = details;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}
export class ValidationError extends AppError {
  constructor(message = "Validation failed", details?: any) {
    super(message, 422, "VALIDATION_ERROR", details);
  }
}
export class NotFoundError extends AppError {
  constructor(message = "Resource not found") {
    super(message, 404, "NOT_FOUND");
  }
}
export class ConflictError extends AppError {
  constructor(message = "Conflict: Resource already exists", details?: any) {
    super(message, 409, "CONFLICT", details);
  }
}
export class InternalServerError extends AppError {
  constructor(message = "Internal server error") {
    super(message, 500, "INTERNAL_ERROR");
  }
}
