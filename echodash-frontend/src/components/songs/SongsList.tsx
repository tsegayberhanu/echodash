import { useEffect, useState, useCallback } from "react"
import { useAppDispatch, useAppSelector } from "../../store/root/hooks.root"
import {
  songsSelector,
  songsLoadingSelector,
  songsErrorSelector,
  songsSuccessMessageSelector,
  songsPaginationSelector,
  songsFiltersSelector,
  fetchSongsRequest,
  updateFilters,
  updateItemsPerPage,
  deleteSongRequest,
  clearNotifications,
} from "../../store/slices/songs.slice"
import {
  statsFilterOptionsSelector,
  statsLoadingSelector,
  statsErrorSelector,
  fetchFilterOptionsRequest,
  clearStatsError,
} from "../../store/slices/stats.slice"
import type { Song, ListParams } from "../../types/song.types"
import SongForm from "./SongForm"
import * as S from "../../styles/SongsList.styles"
import * as C from "../../styles/Common.styles"

import { ClearFiltersButton } from "../../styles/Common.styles"
import { rowsPerPageOptions } from "../../app/constants"
import { ConfirmDeletionModal } from "./ConfirmDeletionModal"

const SearchIcon = () => <span>🔍</span>
const AddIcon = () => <span>➕</span>
const ViewIcon = () => <span>👁️</span>
const EditIcon = () => <span>✏️</span>
const DeleteIcon = () => <span>🗑️</span>

const SongsList: React.FC = () => {
  const dispatch = useAppDispatch()

  const songs = useAppSelector(songsSelector)
  const loading = useAppSelector(songsLoadingSelector)
  const error = useAppSelector(songsErrorSelector)
  const successMessage = useAppSelector(songsSuccessMessageSelector)
  const pagination = useAppSelector(songsPaginationSelector)
  const filters = useAppSelector(songsFiltersSelector)

  const filterOptions = useAppSelector(statsFilterOptionsSelector)
  const loadingFilters = useAppSelector(statsLoadingSelector)
  const filterError = useAppSelector(statsErrorSelector)

  const [openDialog, setOpenDialog] = useState(false)
  const [selectedSong, setSelectedSong] = useState<Song | null>(null)
  const [viewMode, setViewMode] = useState<"view" | "edit" | "create">("view")
  const [searchInput, setSearchInput] = useState(filters._search ?? "")

  const [confirmOpen, setConfirmOpen] = useState(false)
  const [targetSong, setTargetSong] = useState<string | null>(null)

  useEffect(() => {
    dispatch(fetchFilterOptionsRequest())
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchSongsRequest(filters))
  }, [dispatch, filters])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchInput !== filters._search) {
        dispatch(
          updateFilters({
            _search: searchInput,
            _page: 1,
          }),
        )
      }
    }, 500)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [searchInput, dispatch, filters._search])
  const handleCloseSnackbar = useCallback(() => {
    dispatch(clearNotifications())
  }, [dispatch])
  useEffect(() => {
    if (error || successMessage) {
      const timeoutId = setTimeout(() => {
        handleCloseSnackbar()
      }, 5000)

      return () => {
        clearTimeout(timeoutId)
      }
    }
  }, [error, successMessage, handleCloseSnackbar])

  const handleFilterChange = useCallback(
    (key: keyof ListParams, value: string) => {
      dispatch(
        updateFilters({
          [key]: value,
          _page: 1,
        }),
      )
    },
    [dispatch],
  )

  const handleItemsPerPageChange = useCallback(
    (newLimit: number) => {
      dispatch(updateItemsPerPage(newLimit))
    },
    [dispatch],
  )

  const handlePageChange = useCallback(
    (page: number) => {
      dispatch(updateFilters({ _page: page }))
    },
    [dispatch],
  )

  const handleViewSong = useCallback((song: Song) => {
    setSelectedSong(song)
    setViewMode("view")
    setOpenDialog(true)
  }, [])

  const handleEditSong = useCallback((song: Song) => {
    setSelectedSong(song)
    setViewMode("edit")
    setOpenDialog(true)
  }, [])

  const handleCreateSong = useCallback(() => {
    setSelectedSong(null)
    setViewMode("create")
    setOpenDialog(true)
  }, [])

  const handleDeleteClick = (songId: string) => {
    setTargetSong(songId)
    setConfirmOpen(true)
  }

  const handleConfirmDelete = useCallback(() => {
    if (targetSong) {
      dispatch(deleteSongRequest(targetSong))
    }
    setConfirmOpen(false)
    setTargetSong(null)
  }, [dispatch, targetSong])

  const handleCloseDialog = useCallback(() => {
    setOpenDialog(false)
    setSelectedSong(null)
  }, [])

  const handleRetryFilters = useCallback(() => {
    dispatch(fetchFilterOptionsRequest())
  }, [dispatch])

  const handleClearFilterError = useCallback(() => {
    dispatch(clearStatsError())
  }, [dispatch])

  const clearAllFilters = useCallback(() => {
    setSearchInput("")
    dispatch(
      updateFilters({
        _search: "",
        artist: "",
        genre: "",
        _page: 1,
      }),
    )
  }, [dispatch])

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
  const isFilterActive = !!(filters._search ?? filters.artist ?? filters.genre)

  return (
    <S.Container>
      <S.Header>
        <S.Title>Songs</S.Title>
        <S.Button onClick={handleCreateSong}>
          <AddIcon />
          Add New Song
        </S.Button>
      </S.Header>

      {filterError && (
        <div
          style={{
            background: "#fee",
            border: "1px solid #fcc",
            borderRadius: "4px",
            padding: "12px",
            marginBottom: "16px",
            color: "#c33",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>Failed to load filter options: {filterError}</span>
          <div>
            <button
              onClick={handleRetryFilters}
              style={{
                background: "#dc3545",
                color: "white",
                border: "none",
                padding: "6px 12px",
                borderRadius: "4px",
                cursor: "pointer",
                marginRight: "8px",
              }}
            >
              Retry
            </button>
            <button
              onClick={handleClearFilterError}
              style={{
                background: "#6c757d",
                color: "white",
                border: "none",
                padding: "6px 12px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      <S.FiltersCard>
        <S.FiltersGrid>
          <S.InputGroup>
            <div style={{ position: "relative" }}>
              <S.Input
                type="text"
                value={searchInput}
                onChange={e => {
                  setSearchInput(e.target.value)
                }}
                placeholder="Search by title, artist, album..."
              />
              <span
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#999",
                }}
              >
                <SearchIcon />
              </span>
            </div>
          </S.InputGroup>

          <S.InputGroup>
            <S.Label>
              {loadingFilters && (
                <span
                  style={{ marginLeft: "8px", fontSize: "12px", color: "#666" }}
                >
                  (loading...)
                </span>
              )}
            </S.Label>
            <C.Select
              value={filters.artist ?? ""}
              onChange={e => {
                handleFilterChange("artist", e.target.value)
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
            </C.Select>
          </S.InputGroup>

          <S.InputGroup>
            <S.Label>
              {loadingFilters && (
                <span
                  style={{ marginLeft: "8px", fontSize: "12px", color: "#666" }}
                >
                  (loading...)
                </span>
              )}
            </S.Label>
            <C.Select
              value={filters.genre ?? ""}
              onChange={e => {
                handleFilterChange("genre", e.target.value)
              }}
              disabled={loadingFilters}
            >
              <option value="">
                All Genres ({filterOptions.genres.length})
              </option>
              {filterOptions.genres.map(genre => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </C.Select>
          </S.InputGroup>

          <ClearFiltersButton onClick={clearAllFilters}>
            Clear Filters
          </ClearFiltersButton>
        </S.FiltersGrid>
      </S.FiltersCard>

      {loading ? (
        <C.LoadingState>Loading songs...</C.LoadingState>
      ) : (
        <>
          <C.TableContainer>
            <C.Table>
              <C.TableHeader>
                <C.TableRow>
                  <C.TableHeaderCell>Title</C.TableHeaderCell>
                  <C.TableHeaderCell>Artist</C.TableHeaderCell>
                  <C.TableHeaderCell>Album</C.TableHeaderCell>
                  <C.TableHeaderCell>Genre</C.TableHeaderCell>
                  <C.TableHeaderCell style={{ textAlign: "center" }}>
                    Actions
                  </C.TableHeaderCell>
                </C.TableRow>
              </C.TableHeader>
              <C.TableBody>
                {songs.map(song => (
                  <C.TableRow key={song.id}>
                    <C.TableCell>{song.title}</C.TableCell>
                    <C.TableCell>{song.artist}</C.TableCell>
                    <C.TableCell>{song.album || "N/A"}</C.TableCell>
                    <C.TableCell>
                      {song.genre ? (
                        <S.Chip color="primary">{song.genre}</S.Chip>
                      ) : (
                        "N/A"
                      )}
                    </C.TableCell>
                    <C.TableCell>
                      <S.ActionButtons>
                        <S.IconButton
                          className="view"
                          onClick={() => {
                            handleViewSong(song)
                          }}
                          title="View details"
                        >
                          <ViewIcon />
                        </S.IconButton>
                        <S.IconButton
                          className="edit"
                          onClick={() => {
                            handleEditSong(song)
                          }}
                          title="Edit song"
                        >
                          <EditIcon />
                        </S.IconButton>
                        <S.IconButton
                          className="delete"
                          onClick={() => {
                            handleDeleteClick(song.id)
                          }}
                          title="Delete song"
                        >
                          <DeleteIcon />
                        </S.IconButton>
                      </S.ActionButtons>
                    </C.TableCell>
                  </C.TableRow>
                ))}
              </C.TableBody>
            </C.Table>
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
                    disabled={!pagination.hasPrevPage}
                    onClick={() => {
                      handlePageChange(pagination.currentPage - 1)
                    }}
                  >
                    Previous
                  </C.PaginationButton>

                  {pageNumbers.map((page, index) => {
                    if (page === "ellipsis-start" || page === "ellipsis-end") {
                      return (
                        <C.Ellipsis key={`ellipsis-${String(index)}`}>
                          ...
                        </C.Ellipsis>
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
                          color:
                            page === pagination.currentPage ? "white" : "#333",
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
                    disabled={!pagination.hasNextPage}
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

          {songs.length === 0 && (
            <C.EmptyState>
              <h3>No songs found</h3>
              <p>
                {isFilterActive
                  ? "No songs match your current filters. Try adjusting your search criteria."
                  : "Get started by adding your first song to the library."}
              </p>
              {!isFilterActive && (
                <S.Button
                  onClick={handleCreateSong}
                  style={{ marginTop: "16px" }}
                >
                  <AddIcon />
                  Add Your First Song
                </S.Button>
              )}
            </C.EmptyState>
          )}
        </>
      )}

      <S.Dialog open={confirmOpen}>
        <S.DialogContent>
          <ConfirmDeletionModal
            title="Delete Song"
            message={`Are you sure you want to delete this song? This action cannot be undone.`}
            onConfirm={handleConfirmDelete}
            onCancel={() => {
              setConfirmOpen(false)
            }}
          />
        </S.DialogContent>
      </S.Dialog>

      <S.Dialog open={openDialog}>
        <S.DialogContent>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            <h2 style={{ margin: 0 }}>
              {viewMode === "create"
                ? "Add New Song"
                : viewMode === "edit"
                  ? "Edit Song"
                  : "Song Details"}
            </h2>
            <button
              onClick={handleCloseDialog}
              style={{
                background: "none",
                border: "none",
                fontSize: "18px",
                cursor: "pointer",
              }}
            >
              ×
            </button>
          </div>
          <SongForm
            song={selectedSong}
            mode={viewMode}
            onSuccess={handleCloseDialog}
            onCancel={handleCloseDialog}
          />
        </S.DialogContent>
      </S.Dialog>

      <S.Snackbar open={!!error} severity="error">
        <span>{error}</span>
        <button
          onClick={handleCloseSnackbar}
          style={{
            background: "none",
            border: "none",
            color: "white",
            cursor: "pointer",
          }}
        >
          ×
        </button>
      </S.Snackbar>

      <S.Snackbar open={!!successMessage} severity="success">
        <span>{successMessage}</span>
        <button
          onClick={handleCloseSnackbar}
          style={{
            background: "none",
            border: "none",
            color: "white",
            cursor: "pointer",
          }}
        >
          ×
        </button>
      </S.Snackbar>
    </S.Container>
  )
}

export default SongsList
