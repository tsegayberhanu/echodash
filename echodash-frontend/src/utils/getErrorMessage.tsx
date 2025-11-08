import { AxiosError } from "axios"
import type { ErrorApiResponse } from "../types/api.types"

export function getErrorMessage(
  error: unknown,
  fallback = "An unexpected error occurred",
): string {
  if (error instanceof AxiosError) {
    const responseData = error.response?.data as ErrorApiResponse | undefined
    if (responseData?.status === "error" && responseData.message) {
      return responseData.message
    }
    return fallback
  }

  if (error instanceof Error) {
    return error.message
  }

  return fallback
}
