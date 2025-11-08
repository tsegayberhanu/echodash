import { useState, useEffect, useCallback } from "react"
import { useAppDispatch, useAppSelector } from "../../store/root/hooks.root"
import * as S from "../../styles/CommonTab.styles"
import * as C from "../../styles/Common.styles"

import {
  fetchGenresRequest,
  updateGenreFilters,
  clearGenreFilters,
  clearGenreNotifications,
  genresSelector,
  genresLoadingSelector,
  genresErrorSelector,
  genresPaginationSelector,
  genresFiltersSelector,
} from "../../store/slices/genres.slice"
import type { GenreListParams } from "../../types/genre.types"
import { useNavigate } from "react-router-dom"
import { rowsPerPageOptions } from "../../app/constants"

const GenreTab: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const genres = useAppSelector(genresSelector)
  const loading = useAppSelector(genresLoadingSelector)
  const error = useAppSelector(genresErrorSelector)
  const pagination = useAppSelector(genresPaginationSelector)
  const filters = useAppSelector(genresFiltersSelector)

  const [searchTerm, setSearchTerm] = useState(filters._search ?? "")
  const [songFilter, setSongFilter] = useState<string>("all")
  const [artistFilter, setArtistFilter] = useState<string>("all")

  const buildBackendFilters = useCallback((): GenreListParams => {
    const backendFilters: GenreListParams = {
      _page: filters._page,
      _limit: filters._limit,
      _sort: filters._sort,
      _order: filters._order,
      _search: searchTerm || undefined,
    }

    switch (songFilter) {
      case "1-10":
        backendFilters.minSongs = 1
        backendFilters.maxSongs = 10
        break
      case "11-50":
        backendFilters.minSongs = 11
        backendFilters.maxSongs = 50
        break
      case "51+":
        backendFilters.minSongs = 51
        break
      default:
        break
    }

    switch (artistFilter) {
      case "1-5":
        backendFilters.minArtists = 1
        backendFilters.maxArtists = 5
        break
      case "6-20":
        backendFilters.minArtists = 6
        backendFilters.maxArtists = 20
        break
      case "21+":
        backendFilters.minArtists = 21
        break
      default:
        break
    }

    return backendFilters
  }, [
    searchTerm,
    filters._page,
    filters._limit,
    filters._sort,
    filters._order,
    songFilter,
    artistFilter,
  ])

  useEffect(() => {
    const backendFilters = buildBackendFilters()
    dispatch(fetchGenresRequest(backendFilters))
  }, [
    dispatch,
    searchTerm,
    songFilter,
    artistFilter,
    filters._page,
    filters._limit,
    filters._sort,
    filters._order,
    buildBackendFilters,
  ])

  useEffect(() => {
    return () => {
      dispatch(clearGenreNotifications())
    }
  }, [dispatch])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm !== filters._search) {
        dispatch(
          updateGenreFilters({
            _search: searchTerm,
            _page: 1,
          }),
        )
      }
    }, 500)

    return () => {
      clearTimeout(timer)
    }
  }, [searchTerm, filters._search, dispatch])

  const handleSort = useCallback(
    (column: string) => {
      let sortField: "genre" | "songCount" | "artistCount"

      switch (column) {
        case "name":
          sortField = "genre"
          break
        case "songs":
          sortField = "songCount"
          break
        case "artists":
          sortField = "artistCount"
          break
        default:
          sortField = "songCount"
      }

      const currentSort = filters._sort
      const currentOrder = filters._order
      const newSortOrder: "asc" | "desc" =
        currentSort === sortField
          ? currentOrder === "asc"
            ? "desc"
            : "asc"
          : "desc"

      dispatch(
        updateGenreFilters({
          _sort: sortField,
          _order: newSortOrder,
          _page: 1,
        }),
      )
    },
    [filters._sort, filters._order, dispatch],
  )

  const handlePageChange = useCallback(
    (page: number) => {
      dispatch(
        updateGenreFilters({
          _page: page,
        }),
      )
    },
    [dispatch],
  )

  const handleItemsPerPageChange = useCallback(
    (newLimit: number) => {
      dispatch(
        updateGenreFilters({
          _limit: newLimit,
          _page: 1,
        }),
      )
    },
    [dispatch],
  )

  const handleClearFilters = useCallback(() => {
    setSearchTerm("")
    setSongFilter("all")
    setArtistFilter("all")
    dispatch(clearGenreFilters())
  }, [dispatch])

  const handleSongFilterChange = useCallback(
    (value: string) => {
      setSongFilter(value)
      dispatch(updateGenreFilters({ _page: 1 }))
    },
    [dispatch],
  )

  const handleArtistFilterChange = useCallback(
    (value: string) => {
      setArtistFilter(value)
      dispatch(updateGenreFilters({ _page: 1 }))
    },
    [dispatch],
  )

  const getDisplayRange = () => {
    if (!pagination || pagination.totalItems === 0) {
      return { from: 0, to: 0, total: 0 }
    }

    const from = (pagination.currentPage - 1) * pagination.itemsPerPage + 1
    const to = Math.min(
      from + pagination.itemsPerPage - 1,
      pagination.totalItems,
    )

    return { from, to, total: pagination.totalItems }
  }

  const { from, to, total } = getDisplayRange()

  const generatePageNumbers = (): (number | string)[] => {
    if (!pagination) return []

    const pages: (number | string)[] = []
    const totalPages = pagination.totalPages
    const currentPage = pagination.currentPage
    const maxVisiblePages = 5

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    if (startPage > 1) {
      pages.push(1)
      if (startPage > 2) {
        pages.push("ellipsis-start")
      }
    }

    for (let page = startPage; page <= endPage; page++) {
      pages.push(page)
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push("ellipsis-end")
      }
      pages.push(totalPages)
    }

    return pages
  }

  const pageNumbers = generatePageNumbers()
  const isFilterActive = Boolean(
    (filters._search ?? false) ||
      songFilter !== "all" ||
      artistFilter !== "all",
  )

  const handleKeyDown = (e: React.KeyboardEvent, callback: () => void) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      callback()
    }
  }

  const getGenreColor = (genreName: string): string => {
    const colors = [
      "#FF6B6B",
      "#4ECDC4",
      "#45B7D1",
      "#96CEB4",
      "#FFEAA7",
      "#DDA0DD",
      "#98D8C8",
      "#F7DC6F",
      "#BB8FCE",
      "#85C1E9",
    ]
    const index = genreName
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0)
    return colors[index % colors.length]
  }

  const SortIcon = ({ column }: { column: string }) => {
    const currentSort = filters._sort
    const currentOrder = filters._order

    let sortField: string
    switch (column) {
      case "name":
        sortField = "genre"
        break
      case "songs":
        sortField = "songCount"
        break
      case "artists":
        sortField = "artistCount"
        break
      default:
        sortField = "songCount"
    }

    if (currentSort !== sortField) return <C.SortIcon>↕</C.SortIcon>
    return currentOrder === "asc" ? (
      <C.SortIcon>↑</C.SortIcon>
    ) : (
      <C.SortIcon>↓</C.SortIcon>
    )
  }
  const handleGenreClick = (genreName: string) => {
    void navigate(`/genres/${encodeURIComponent(genreName)}`)
  }

  if (error) {
    return (
      <C.Container>
        <C.ErrorMessage>
          Error loading genres: {error}
          <C.RetryButton
            onClick={() => {
              const backendFilters = buildBackendFilters()
              dispatch(fetchGenresRequest(backendFilters))
            }}
          >
            Retry
          </C.RetryButton>
        </C.ErrorMessage>
      </C.Container>
    )
  }

  return (
    <C.Container>
      <C.Header>
        <C.Title>Genres</C.Title>

        <C.FiltersContainer>
          <C.SearchBox>
            <C.SearchInput
              type="text"
              placeholder="Search genres..."
              value={searchTerm}
              onChange={e => {
                setSearchTerm(e.target.value)
              }}
            />
            <C.SearchIcon>🔍</C.SearchIcon>
          </C.SearchBox>

          <C.FilterGroup>
            <C.FilterSelect
              value={songFilter}
              onChange={e => {
                handleSongFilterChange(e.target.value)
              }}
            >
              <option value="all">All Songs</option>
              <option value="1-10">1-10 Songs</option>
              <option value="11-50">11-50 Songs</option>
              <option value="51+">51+ Songs</option>
            </C.FilterSelect>

            <C.FilterSelect
              value={artistFilter}
              onChange={e => {
                handleArtistFilterChange(e.target.value)
              }}
            >
              <option value="all">All Artists</option>
              <option value="1-5">1-5 Artists</option>
              <option value="6-20">6-20 Artists</option>
              <option value="21+">21+ Artists</option>
            </C.FilterSelect>

            <C.ClearFiltersButton onClick={handleClearFilters}>
              Clear Filters
            </C.ClearFiltersButton>
          </C.FilterGroup>
        </C.FiltersContainer>
      </C.Header>

      <C.TableContainer>
        {loading ? (
          <C.LoadingState>Loading genres...</C.LoadingState>
        ) : (
          <>
            <C.Table>
              <C.TableHeader>
                <C.TableRow>
                  <C.TableHeaderCell
                    onClick={() => {
                      handleSort("name")
                    }}
                    style={{ cursor: "pointer", minWidth: "250px" }}
                  >
                    <C.HeaderCellContent>
                      Genre
                      <SortIcon column="name" />
                    </C.HeaderCellContent>
                  </C.TableHeaderCell>
                  <C.TableHeaderCell
                    onClick={() => {
                      handleSort("songs")
                    }}
                    style={{ cursor: "pointer", width: "120px" }}
                  >
                    <C.HeaderCellContent>
                      Songs
                      <SortIcon column="songs" />
                    </C.HeaderCellContent>
                  </C.TableHeaderCell>
                  <C.TableHeaderCell
                    onClick={() => {
                      handleSort("artists")
                    }}
                    style={{ cursor: "pointer", width: "120px" }}
                  >
                    <C.HeaderCellContent>
                      Artists
                      <SortIcon column="artists" />
                    </C.HeaderCellContent>
                  </C.TableHeaderCell>
                </C.TableRow>
              </C.TableHeader>

              <C.TableBody>
                {genres.map(genre => (
                  <C.TableRow
                    key={genre.genre}
                    onClick={() => {
                      handleGenreClick(genre.genre)
                    }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e: React.KeyboardEvent) => {
                      handleKeyDown(e, () => {
                        handleGenreClick(genre.genre)
                      })
                    }}
                  >
                    <C.TableCell>
                      <S.InfoCell>
                        <S.GenreColorIndicator
                          bgColor={getGenreColor(genre.genre)}
                        />
                        <S.TextInfo>
                          <S.Name>{genre.genre}</S.Name>
                          <S.Description>
                            {genre.genre} music collection
                          </S.Description>
                        </S.TextInfo>
                      </S.InfoCell>
                    </C.TableCell>

                    <C.TableCell>
                      <C.StatValue>{genre.songCount}</C.StatValue>
                    </C.TableCell>

                    <C.TableCell>
                      <C.StatValue>{genre.artistCount}</C.StatValue>
                    </C.TableCell>
                  </C.TableRow>
                ))}
              </C.TableBody>
            </C.Table>

            {genres.length === 0 && (
              <C.EmptyState>
                <C.EmptyIcon>🎵</C.EmptyIcon>
                <C.EmptyText>No genres found</C.EmptyText>
                <C.EmptySubtext>
                  Try adjusting your filters or search terms
                </C.EmptySubtext>
              </C.EmptyState>
            )}
          </>
        )}
      </C.TableContainer>

      {pagination && pagination.totalItems > 0 && (
        <C.PaginationContainer>
          <C.RowsPerPageContainer>
            <C.Label>Rows per page:</C.Label>
            <C.Select
              value={pagination.itemsPerPage}
              onChange={e => {
                handleItemsPerPageChange(Number(e.target.value))
              }}
              style={{ width: "80px", margin: "0 8px" }}
              disabled={loading}
            >
              {rowsPerPageOptions.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </C.Select>
          </C.RowsPerPageContainer>

          <div style={{ fontSize: "14px", color: "#666" }}>
            Showing {from} to {to} of {total} entries
            {isFilterActive && (
              <span style={{ fontStyle: "italic", marginLeft: "8px" }}>
                (filtered)
              </span>
            )}
          </div>

          {pagination.totalPages > 1 && (
            <C.Pagination>
              <C.PaginationButton
                disabled={!pagination.hasPrevPage || loading}
                onClick={() => {
                  handlePageChange(pagination.currentPage - 1)
                }}
              >
                Previous
              </C.PaginationButton>

              {pageNumbers.map((page, index) => {
                if (page === "ellipsis-start" || page === "ellipsis-end") {
                  return (
                    <span
                      key={`ellipsis-${String(index)}`}
                      style={{ padding: "0 8px" }}
                    >
                      ...
                    </span>
                  )
                }

                return (
                  <C.PaginationButton
                    key={page}
                    style={{
                      background:
                        page === pagination.currentPage
                          ? "#4ecdc4"
                          : "transparent",
                      color: page === pagination.currentPage ? "white" : "#333",
                      border: `1px solid ${page === pagination.currentPage ? "#4ecdc4" : "#ddd"}`,
                      minWidth: "32px",
                      height: "32px",
                      padding: "0 8px",
                    }}
                    onClick={() => {
                      handlePageChange(page as number)
                    }}
                  >
                    {page}
                  </C.PaginationButton>
                )
              })}

              <C.PaginationButton
                disabled={!pagination.hasNextPage || loading}
                onClick={() => {
                  handlePageChange(pagination.currentPage + 1)
                }}
              >
                Next
              </C.PaginationButton>
            </C.Pagination>
          )}
        </C.PaginationContainer>
      )}
    </C.Container>
  )
}

export default GenreTab
