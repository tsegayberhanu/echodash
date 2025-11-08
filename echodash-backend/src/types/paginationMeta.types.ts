export interface PaginationInfo {
  page: number
  limit: number
  total: number
  totalPages: number
}
export interface PaginationMeta extends PaginationInfo {
  currentPage: number
  itemsPerPage: number
  totalItems: number
  hasNext: boolean
  hasPrev: boolean
  nextPage: number | null
  prevPage: number | null
}