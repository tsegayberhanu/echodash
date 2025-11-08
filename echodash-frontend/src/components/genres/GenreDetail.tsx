import { useState, useEffect, useMemo, useCallback } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../store/root/hooks.root"
import * as S from "../../styles/CommonDetail.styles"
import * as C from "../../styles/Common.styles"

import {
  fetchGenreDetailRequest,
  updateGenreDetailFilters,
  clearGenreDetailNotifications,
  genreDetailSelector,
  genreDetailLoadingSelector,
  genreDetailErrorSelector,
  genreDetailFiltersSelector,
  genreSongsPaginationSelector,
} from "../../store/slices/genreDetail.slice"

import type { GenreDetailParams } from "../../types/genre.types"
import { rowsPerPageOptions } from "../../app/constants"

const GenreDetail = () => {
  const { genreName } = useParams<{ genreName: string }>()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const genreDetail = useAppSelector(genreDetailSelector)
  const loading = useAppSelector(genreDetailLoadingSelector)
  const genreSongsPagination = useAppSelector(genreSongsPaginationSelector)
  const error = useAppSelector(genreDetailErrorSelector)
  const filters = useAppSelector(genreDetailFiltersSelector)

  const [searchTerm, setSearchTerm] = useState(filters._search ?? "")

  const backendFilters = useMemo<GenreDetailParams>(
    () => ({
      _page: filters._page,
      _limit: filters._limit,
      _sort: filters._sort,
      _order: filters._order,
      _search: searchTerm || undefined,
    }),
    [filters, searchTerm],
  )

  useEffect(() => {
    if (!genreName) return
    const decoded = decodeURIComponent(genreName)

    dispatch(
      fetchGenreDetailRequest({ genreName: decoded, params: backendFilters }),
    )
  }, [dispatch, genreName, backendFilters])

  useEffect(() => {
    return () => {
      dispatch(clearGenreDetailNotifications())
    }
  }, [dispatch])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm !== filters._search) {
        dispatch(updateGenreDetailFilters({ _search: searchTerm, _page: 1 }))
      }
    }, 500)

    return () => {
      clearTimeout(timer)
    }
  }, [searchTerm, filters._search, dispatch])

  const handleSort = useCallback(
    (column: "title" | "artist" | "album") => {
      const isSameField = filters._sort === column
      const nextOrder = isSameField && filters._order === "asc" ? "desc" : "asc"

      dispatch(
        updateGenreDetailFilters({
          _sort: column,
          _order: nextOrder,
          _page: 1,
        }),
      )
    },
    [filters._sort, filters._order, dispatch],
  )

  const handlePageChange = useCallback(
    (p: number) => {
      dispatch(updateGenreDetailFilters({ _page: p }))
    },
    [dispatch],
  )

  const handleItemsPerPageChange = useCallback(
    (lim: number) => {
      dispatch(updateGenreDetailFilters({ _limit: lim, _page: 1 }))
    },
    [dispatch],
  )

  const handleKey = (e: React.KeyboardEvent, cb: () => void) => {
    if (["Enter", " "].includes(e.key)) {
      e.preventDefault()
      cb()
    }
  }

  const getGenreColor = (name: string) => {
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
    // eslint-disable-next-line @typescript-eslint/no-misused-spread
    const idx = [...name].reduce((a, c) => a + c.charCodeAt(0), 0)
    return colors[idx % colors.length]
  }

  const SortIcon = ({ column }: { column: string }) => {
    if (filters._sort !== column) return <C.SortIcon>↕</C.SortIcon>
    return filters._order === "asc" ? (
      <C.SortIcon>↑</C.SortIcon>
    ) : (
      <C.SortIcon>↓</C.SortIcon>
    )
  }

  if (loading && !genreDetail) {
    return (
      <S.Container>
        <C.LoadingState>Loading genre details...</C.LoadingState>
      </S.Container>
    )
  }

  if (error && !genreDetail) {
    return (
      <S.Container>
        <C.ErrorMessage>
          Error loading: {error}
          <C.RetryButton
            onClick={() =>
              genreName &&
              dispatch(
                fetchGenreDetailRequest({
                  genreName: decodeURIComponent(genreName),
                  params: backendFilters,
                }),
              )
            }
          >
            Retry
          </C.RetryButton>
        </C.ErrorMessage>
      </S.Container>
    )
  }

  if (!genreDetail) {
    return (
      <S.Container>
        <C.EmptyState>
          <C.EmptyIcon>🎵</C.EmptyIcon>
          <C.EmptyText>Genre not found</C.EmptyText>
          <C.EmptySubtext>This genre doesn't exist</C.EmptySubtext>
        </C.EmptyState>
      </S.Container>
    )
  }

  return (
    <S.Container>
      <S.Header>
        <C.BackButton
          onClick={() => {
            void navigate(-1)
          }}
        >
          ← Back
        </C.BackButton>
        <C.Title>Genre Details</C.Title>
      </S.Header>

      <S.InfoHeader>
        <S.InfoCell>
          <S.ColorIndicator bgColor={getGenreColor(genreDetail.genre)} />
          <S.TextInfo>
            <S.Name>{genreDetail.genre}</S.Name>
            <S.Stats>
              <S.StatPill>
                <S.StatDot color="#667eea" />
                <S.StatText>{genreDetail.songCount} Songs</S.StatText>
              </S.StatPill>
              <S.StatPill>
                <S.StatDot color="#4ecdc4" />
                <S.StatText>{genreDetail.artistCount} Artists</S.StatText>
              </S.StatPill>
            </S.Stats>
          </S.TextInfo>
        </S.InfoCell>
      </S.InfoHeader>

      <C.SearchSection>
        <C.SearchBox>
          <C.SearchInput
            placeholder="Search songs, artists, albums..."
            value={searchTerm}
            onChange={e => {
              setSearchTerm(e.target.value)
            }}
          />
          <C.SearchIcon>🔍</C.SearchIcon>
        </C.SearchBox>
      </C.SearchSection>
      <C.DetailTableContainer>
        {loading ? (
          <C.LoadingState>Loading songs...</C.LoadingState>
        ) : (
          <C.Table>
            <C.TableHeader>
              <C.TableRow>
                {(["title", "artist", "album"] as const).map(col => (
                  <C.TableHeaderCell
                    key={col}
                    onClick={() => {
                      handleSort(col)
                    }}
                    style={{
                      cursor: "pointer",
                      minWidth: col === "title" ? 250 : 200,
                    }}
                  >
                    <C.HeaderCellContent>
                      {col.charAt(0).toUpperCase() + col.slice(1)}
                      <SortIcon column={col} />
                    </C.HeaderCellContent>
                  </C.TableHeaderCell>
                ))}
              </C.TableRow>
            </C.TableHeader>

            <C.TableBody>
              {genreDetail.songs.map((song, i) => (
                <C.TableRow
                  key={song.id || i}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => {
                    handleKey(e, () => {
                      /* empty */
                    })
                  }}
                >
                  <C.TableCell>
                    <S.SongTitleCell>{song.title || "N/A"}</S.SongTitleCell>
                  </C.TableCell>
                  <C.TableCell>
                    <S.ArtistCell>{song.artist || "N/A"}</S.ArtistCell>
                  </C.TableCell>
                  <C.TableCell>
                    <S.AlbumCell>{song.album || "N/A"}</S.AlbumCell>
                  </C.TableCell>
                </C.TableRow>
              ))}
            </C.TableBody>
          </C.Table>
        )}

        {!loading && genreDetail.songs.length === 0 && (
          <C.EmptyState>
            <C.EmptyIcon>🎵</C.EmptyIcon>
            <C.EmptyText>No songs found</C.EmptyText>
            <C.EmptySubtext>Try changing search filters</C.EmptySubtext>
          </C.EmptyState>
        )}
      </C.DetailTableContainer>

      {genreSongsPagination && genreSongsPagination.totalItems > 0 && (
        <C.PaginationContainer>
          <C.RowsPerPageContainer>
            <C.Label>Rows per page:</C.Label>
            <C.Select
              value={genreSongsPagination.itemsPerPage}
              onChange={e => {
                handleItemsPerPageChange(Number(e.target.value))
              }}
              style={{ width: "80px", margin: "0 8px" }}
            >
              {rowsPerPageOptions.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </C.Select>
          </C.RowsPerPageContainer>

          <C.DisplayInfo>
            Showing{" "}
            {(genreSongsPagination.currentPage - 1) *
              genreSongsPagination.itemsPerPage +
              1}
            –
            {Math.min(
              genreSongsPagination.currentPage *
                genreSongsPagination.itemsPerPage,
              genreSongsPagination.totalItems,
            )}{" "}
            of {genreSongsPagination.totalItems}
          </C.DisplayInfo>

          {genreSongsPagination.totalPages > 1 && (
            <C.Pagination>
              <C.PaginationButton
                disabled={!genreSongsPagination.hasPrevPage || loading}
                onClick={() => {
                  handlePageChange(genreSongsPagination.currentPage - 1)
                }}
              >
                Previous
              </C.PaginationButton>

              {Array.from(
                { length: Math.min(5, genreSongsPagination.totalPages) },
                (_, i) => {
                  const page =
                    genreSongsPagination.totalPages <= 5
                      ? i + 1
                      : genreSongsPagination.currentPage <= 3
                        ? i + 1
                        : genreSongsPagination.currentPage >=
                            genreSongsPagination.totalPages - 2
                          ? genreSongsPagination.totalPages - 4 + i
                          : genreSongsPagination.currentPage - 2 + i

                  return (
                    <C.PaginationButton
                      key={page}
                      style={{
                        background:
                          page === genreSongsPagination.currentPage
                            ? "#4ecdc4"
                            : "transparent",
                        color:
                          page === genreSongsPagination.currentPage
                            ? "white"
                            : "#333",
                        border: `1px solid ${page === genreSongsPagination.currentPage ? "#4ecdc4" : "#ddd"}`,
                        minWidth: "32px",
                        height: "32px",
                        padding: "0 8px",
                      }}
                      onClick={() => {
                        handlePageChange(page)
                      }}
                    >
                      {page}
                    </C.PaginationButton>
                  )
                },
              )}

              <C.PaginationButton
                disabled={!genreSongsPagination.hasNextPage || loading}
                onClick={() => {
                  handlePageChange(genreSongsPagination.currentPage + 1)
                }}
              >
                Next
              </C.PaginationButton>
            </C.Pagination>
          )}
        </C.PaginationContainer>
      )}

      <C.BottomSpacer />
    </S.Container>
  )
}

export default GenreDetail
