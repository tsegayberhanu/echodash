import { useState, useEffect, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../store/root/hooks.root"
import * as S from "../../styles/CommonTab.styles"
import * as C from "../../styles/Common.styles"

import {
  fetchArtistsRequest,
  updateArtistFilters,
  clearArtistFilters,
  clearArtistNotifications,
  artistsSelector,
  artistsLoadingSelector,
  artistsErrorSelector,
  artistsPaginationSelector,
  artistsFiltersSelector,
} from "../../store/slices/artists.slice"
import type { ArtistListParams } from "../../types/artist.types"
import { rowsPerPageOptions } from "../../app/constants"

const ArtistsTab: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const artists = useAppSelector(artistsSelector)
  const loading = useAppSelector(artistsLoadingSelector)
  const error = useAppSelector(artistsErrorSelector)
  const pagination = useAppSelector(artistsPaginationSelector)
  const filters = useAppSelector(artistsFiltersSelector)

  const [searchTerm, setSearchTerm] = useState(filters._search ?? "")
  const [songFilter, setSongFilter] = useState<string>("all")
  const [albumFilter, setAlbumFilter] = useState<string>("all")
  const [genreFilter, setGenreFilter] = useState<string>("all")

  const getBackendFilters = useCallback(() => {
    const backendFilters: ArtistListParams = {
      _search: searchTerm || undefined,
      _page: filters._page,
      _limit: filters._limit,
      _sort: filters._sort,
      _order: filters._order,
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

    switch (albumFilter) {
      case "1-5":
        backendFilters.minAlbums = 1
        backendFilters.maxAlbums = 5
        break
      case "6-10":
        backendFilters.minAlbums = 6
        backendFilters.maxAlbums = 10
        break
      case "11+":
        backendFilters.minAlbums = 11
        break
      default:
        break
    }

    switch (genreFilter) {
      case "1-3":
        backendFilters.minGenres = 1
        backendFilters.maxGenres = 3
        break
      case "4-6":
        backendFilters.minGenres = 4
        backendFilters.maxGenres = 6
        break
      case "7+":
        backendFilters.minGenres = 7
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
    albumFilter,
    genreFilter,
  ])

  useEffect(() => {
    const backendFilters = getBackendFilters()
    dispatch(fetchArtistsRequest(backendFilters))
  }, [
    dispatch,
    searchTerm,
    songFilter,
    getBackendFilters,
    albumFilter,
    genreFilter,
    filters._page,
    filters._limit,
  ])

  useEffect(() => {
    return () => {
      dispatch(clearArtistNotifications())
    }
  }, [dispatch])

  const handleSort = useCallback(
    (column: string) => {
      let sortField: "artist" | "songCount" | "albumCount" | "genreCount"

      switch (column) {
        case "name":
          sortField = "artist"
          break
        case "songs":
          sortField = "songCount"
          break
        case "albums":
          sortField = "albumCount"
          break
        case "genres":
          sortField = "genreCount"
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

      const backendFilters = {
        ...getBackendFilters(),
        _sort: sortField,
        _order: newSortOrder,
        _page: 1,
      }

      dispatch(updateArtistFilters(backendFilters))
    },
    [filters._sort, filters._order, getBackendFilters, dispatch],
  )

  const handlePageChange = useCallback(
    (page: number) => {
      const backendFilters = {
        ...getBackendFilters(),
        _page: page,
      }
      dispatch(updateArtistFilters(backendFilters))
    },
    [getBackendFilters, dispatch],
  )

  const handleItemsPerPageChange = useCallback(
    (newLimit: number) => {
      const backendFilters = {
        ...getBackendFilters(),
        _limit: newLimit,
        _page: 1,
      }
      dispatch(updateArtistFilters(backendFilters))
    },
    [getBackendFilters, dispatch],
  )

  const handleClearFilters = useCallback(() => {
    setSearchTerm("")
    setSongFilter("all")
    setAlbumFilter("all")
    setGenreFilter("all")
    dispatch(clearArtistFilters())
  }, [dispatch])

  const handleSongFilterChange = useCallback((value: string) => {
    setSongFilter(value)
  }, [])

  const handleAlbumFilterChange = useCallback((value: string) => {
    setAlbumFilter(value)
  }, [])

  const handleGenreFilterChange = useCallback((value: string) => {
    setGenreFilter(value)
  }, [])

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
      albumFilter !== "all" ||
      genreFilter !== "all",
  )

  const handleKeyDown = (e: React.KeyboardEvent, callback: () => void) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      callback()
    }
  }

  const getArtistColor = (artistName: string): string => {
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
    const index = artistName
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
        sortField = "artist"
        break
      case "songs":
        sortField = "songCount"
        break
      case "albums":
        sortField = "albumCount"
        break
      case "genres":
        sortField = "genreCount"
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

  const handleArtistClick = (artistName: string) => {
    void navigate(`/artists/${encodeURIComponent(artistName)}`)
  }

  if (error) {
    return (
      <C.Container>
        <C.ErrorMessage>
          Error loading artists: {error}
          <C.RetryButton
            onClick={() => {
              const backendFilters = getBackendFilters()
              dispatch(fetchArtistsRequest(backendFilters))
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
        <C.Title>Artists</C.Title>

        <C.FiltersContainer>
          <C.SearchBox>
            <C.SearchInput
              type="text"
              placeholder="Search artists..."
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
              value={albumFilter}
              onChange={e => {
                handleAlbumFilterChange(e.target.value)
              }}
            >
              <option value="all">All Albums</option>
              <option value="1-5">1-5 Albums</option>
              <option value="6-10">6-10 Albums</option>
              <option value="11+">11+ Albums</option>
            </C.FilterSelect>

            <C.FilterSelect
              value={genreFilter}
              onChange={e => {
                handleGenreFilterChange(e.target.value)
              }}
            >
              <option value="all">All Genres</option>
              <option value="1-3">1-3 Genres</option>
              <option value="4-6">4-6 Genres</option>
              <option value="7+">7+ Genres</option>
            </C.FilterSelect>

            <C.ClearFiltersButton onClick={handleClearFilters}>
              Clear Filters
            </C.ClearFiltersButton>
          </C.FilterGroup>
        </C.FiltersContainer>
      </C.Header>

      <C.TableContainer>
        {loading ? (
          <C.LoadingState>Loading artists...</C.LoadingState>
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
                      Artist
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
                      handleSort("albums")
                    }}
                    style={{ cursor: "pointer", width: "120px" }}
                  >
                    <C.HeaderCellContent>
                      Albums
                      <SortIcon column="albums" />
                    </C.HeaderCellContent>
                  </C.TableHeaderCell>
                  <C.TableHeaderCell
                    onClick={() => {
                      handleSort("genres")
                    }}
                    style={{ cursor: "pointer", width: "120px" }}
                  >
                    <C.HeaderCellContent>
                      Genres
                      <SortIcon column="genres" />
                    </C.HeaderCellContent>
                  </C.TableHeaderCell>
                </C.TableRow>
              </C.TableHeader>

              <C.TableBody>
                {artists.map(artist => (
                  <C.TableRow
                    key={artist.artist}
                    onClick={() => {
                      handleArtistClick(artist.artist)
                    }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e: React.KeyboardEvent) => {
                      handleKeyDown(e, () => {
                        handleArtistClick(artist.artist)
                      })
                    }}
                  >
                    <C.TableCell>
                      <S.InfoCell>
                        <S.ArtistColorIndicator
                          bgColor={getArtistColor(artist.artist)}
                        >
                          <S.Icon>👤</S.Icon>
                        </S.ArtistColorIndicator>
                        <S.TextInfo>
                          <S.Name>{artist.artist}</S.Name>
                        </S.TextInfo>
                      </S.InfoCell>
                    </C.TableCell>

                    <C.TableCell>
                      <C.StatValue>{artist.songCount}</C.StatValue>
                    </C.TableCell>

                    <C.TableCell>
                      <C.StatValue>{artist.albumCount}</C.StatValue>
                    </C.TableCell>

                    <C.TableCell>
                      <C.StatValue>{artist.genreCount}</C.StatValue>
                    </C.TableCell>
                  </C.TableRow>
                ))}
              </C.TableBody>
            </C.Table>

            {artists.length === 0 && (
              <C.EmptyState>
                <C.EmptyIcon>👤</C.EmptyIcon>
                <C.EmptyText>No artists found</C.EmptyText>
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

          <C.DisplayInfo>
            Showing {from} to {to} of {total} entries
            {isFilterActive && (
              <span style={{ fontStyle: "italic", marginLeft: "8px" }}>
                (filtered)
              </span>
            )}
          </C.DisplayInfo>

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

export default ArtistsTab
