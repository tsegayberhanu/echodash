export type BaseApiResponse = {
  status: "success" | "error"
  code: string
  message: string
}

export type ApiResponse<T> = BaseApiResponse & {
  status: "success"
  data: T
}

export type PaginationMeta = {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export type PaginatedApiResponse<T> = BaseApiResponse & {
  status: "success"
  data: T[]
  meta: {
    pagination: PaginationMeta
  }
}

export type ErrorApiResponse = BaseApiResponse & {
  status: "error"
  details?: unknown
}

export type SuccessResponse<T> = ApiResponse<T> | PaginatedApiResponse<T>

export type AnyApiResponse<T> =
  | ApiResponse<T>
  | PaginatedApiResponse<T>
  | ErrorApiResponse
