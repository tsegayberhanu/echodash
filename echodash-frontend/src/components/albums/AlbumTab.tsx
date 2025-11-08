import { useState, useEffect, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../store/root/hooks.root"
import * as S from "../../styles/CommonTab.styles"
import * as C from "../../styles/Common.styles"
import {
  fetchAlbumsRequest,
  updateAlbumFilters,
  clearAlbumFilters,
  clearAlbumNotifications,
  albumsSelector,
  albumsLoadingSelector,
  albumsErrorSelector,
  albumsPaginationSelector,
  albumsFiltersSelector,
} from "../../store/slices/albums.slice"
import type { AlbumListParams } from "../../types/album.types"
import {
  statsFilterOptionsSelector,
  statsLoadingSelector,
} from "../../store/slices/stats.slice"
import { rowsPerPageOptions } from "../../app/constants"

const AlbumsTab: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const albums = useAppSelector(albumsSelector)
  const loading = useAppSelector(albumsLoadingSelector)
  const error = useAppSelector(albumsErrorSelector)
  const pagination = useAppSelector(albumsPaginationSelector)
  const filters = useAppSelector(albumsFiltersSelector)

  const filterOptions = useAppSelector(statsFilterOptionsSelector)
  const loadingFilters = useAppSelector(statsLoadingSelector)

  const [searchTerm, setSearchTerm] = useState(filters._search ?? "")
  const [songFilter, setSongFilter] = useState<string>("all")
  const [artistFilter, setArtistFilter] = useState<string>("all")

  const buildBackendFilters = useCallback((): AlbumListParams => {
    const backendFilters: AlbumListParams = {
      _page: filters._page,
      _limit: filters._limit,
      _sort: filters._sort,
      _order: filters._order,
      _search: searchTerm || undefined,
    }

    switch (songFilter) {
      case "1-5":
        backendFilters.minSongs = 1
        backendFilters.maxSongs = 5
        break
      case "6-10":
        backendFilters.minSongs = 6
        backendFilters.maxSongs = 10
        break
      case "11+":
        backendFilters.minSongs = 11
        break
      default:
        break
    }

    if (artistFilter !== "all") {
      backendFilters.artist = artistFilter
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
    dispatch(fetchAlbumsRequest(backendFilters))
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
      dispatch(clearAlbumNotifications())
    }
  }, [dispatch])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm !== filters._search) {
        dispatch(
          updateAlbumFilters({
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
      let sortField: "album" | "songCount" | "genreCount" | "artistCount"

      switch (column) {
        case "name":
          sortField = "album"
          break
        case "songs":
          sortField = "songCount"
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

      dispatch(
        updateAlbumFilters({
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
        updateAlbumFilters({
          _page: page,
        }),
      )
    },
    [dispatch],
  )

  const handleItemsPerPageChange = useCallback(
    (newLimit: number) => {
      dispatch(
        updateAlbumFilters({
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
    dispatch(clearAlbumFilters())
  }, [dispatch])

  const handleSongFilterChange = useCallback(
    (value: string) => {
      setSongFilter(value)
      dispatch(updateAlbumFilters({ _page: 1 }))
    },
    [dispatch],
  )

  const handleArtistFilterChange = useCallback(
    (value: string) => {
      setArtistFilter(value)
      dispatch(updateAlbumFilters({ _page: 1 }))
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

  const getAlbumColor = (albumName: string): string => {
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
    const index = albumName
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
        sortField = "album"
        break
      case "songs":
        sortField = "songCount"
        break
      case "genres":
        sortField = "genreCount"
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

  const handleAlbumClick = (albumName: string) => {
    void navigate(`/albums/${encodeURIComponent(albumName)}`)
  }

  if (error) {
    return (
      <C.Container>
        <C.ErrorMessage>
          Error loading albums: {error}
          <C.RetryButton
            onClick={() => {
              const backendFilters = buildBackendFilters()
              dispatch(fetchAlbumsRequest(backendFilters))
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
        <C.Title>Albums</C.Title>

        <C.FiltersContainer>
          <C.SearchBox>
            <C.SearchInput
              type="text"
              placeholder="Search albums or artistC..."
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
              <option value="1-5">1-5 Songs</option>
              <option value="6-10">6-10 Songs</option>
              <option value="11+">11+ Songs</option>
            </C.FilterSelect>

            <C.FilterSelect
              value={artistFilter}
              onChange={e => {
                handleArtistFilterChange(e.target.value)
              }}
              disabled={loadingFilters}
            >
              <option value="">
                All Artists ({filterOptions.artists.length})
              </option>
              {filterOptions.artists.map(artist => (
                <option key={artist} value={artist}>
                  {artist}
                </option>
              ))}
            </C.FilterSelect>

            <C.ClearFiltersButton onClick={handleClearFilters}>
              Clear Filters
            </C.ClearFiltersButton>
          </C.FilterGroup>
        </C.FiltersContainer>
      </C.Header>

      <C.TableContainer>
        {loading ? (
          <C.LoadingState>Loading albums...</C.LoadingState>
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
                      Album
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
                {albums.map(album => (
                  <C.TableRow
                    key={album.album}
                    onClick={() => {
                      handleAlbumClick(album.album)
                    }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e: React.KeyboardEvent) => {
                      handleKeyDown(e, () => {
                        handleAlbumClick(album.album)
                      })
                    }}
                  >
                    <C.TableCell>
                      <S.InfoCell>
                        <S.AlbumColorIndicator
                          bgColor={getAlbumColor(album.album)}
                        >
                          <S.Icon>💿</S.Icon>
                        </S.AlbumColorIndicator>
                        <S.TextInfo>
                          <S.Name>{album.album}</S.Name>
                          <S.Description>by {album.artist}</S.Description>
                        </S.TextInfo>
                      </S.InfoCell>
                    </C.TableCell>

                    <C.TableCell>
                      <C.StatValue>{album.songCount}</C.StatValue>
                    </C.TableCell>

                    <C.TableCell>
                      <C.StatValue>{album.genreCount}</C.StatValue>
                    </C.TableCell>
                  </C.TableRow>
                ))}
              </C.TableBody>
            </C.Table>

            {albums.length === 0 && (
              <C.EmptyState>
                <C.EmptyIcon>💿</C.EmptyIcon>
                <C.EmptyText>No albums found</C.EmptyText>
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

export default AlbumsTab
