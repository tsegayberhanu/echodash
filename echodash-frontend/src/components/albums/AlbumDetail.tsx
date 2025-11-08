import { useState, useEffect, useMemo } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../store/root/hooks.root"
import * as S from "../../styles/CommonDetail.styles"
import * as C from "../../styles/Common.styles"

import {
  fetchAlbumDetailRequest,
  clearAlbumDetailNotifications,
  albumDetailSelector,
  albumDetailLoadingSelector,
  albumDetailErrorSelector,
} from "../../store/slices/albumDetail.slice"
import type { Song } from "../../types/song.types"

const AlbumDetail: React.FC = () => {
  const { albumName } = useParams<{ albumName: string }>()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const albumDetail = useAppSelector(albumDetailSelector)
  const loading = useAppSelector(albumDetailLoadingSelector)
  const error = useAppSelector(albumDetailErrorSelector)

  const [songSortBy, setSongSortBy] = useState<string>("title")
  const [songSortOrder, setSongSortOrder] = useState<"asc" | "desc">("asc")
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    if (albumName) {
      const decodedAlbumName = decodeURIComponent(albumName)
      dispatch(fetchAlbumDetailRequest(decodedAlbumName))
    }
  }, [albumName, dispatch])

  useEffect(() => {
    return () => {
      dispatch(clearAlbumDetailNotifications())
    }
  }, [dispatch])

  const sortedAndFilteredSongs = useMemo(() => {
    if (!albumDetail?.songs) return []

    const filtered = albumDetail.songs.filter(song => {
      const matchesSearch =
        (song.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (song.artist || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (song.genre || "").toLowerCase().includes(searchTerm.toLowerCase())
      return matchesSearch
    })

    const sortFunctions = {
      title: (a: Song, b: Song) => (a.title || "").localeCompare(b.title || ""),
      artist: (a: Song, b: Song) =>
        (a.artist || "").localeCompare(b.artist || ""),
      genre: (a: Song, b: Song) => (a.genre || "").localeCompare(b.genre || ""),
    }

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    const sortedArray = filtered.sort(  sortFunctions[songSortBy as keyof typeof sortFunctions] ||
        sortFunctions.title,
    )

    return songSortOrder === "asc" ? sortedArray : sortedArray.reverse()
  }, [albumDetail?.songs, songSortBy, songSortOrder, searchTerm])

  const handleSongSort = (column: string) => {
    if (songSortBy === column) {
      setSongSortOrder(songSortOrder === "asc" ? "desc" : "asc")
    } else {
      setSongSortBy(column)
      setSongSortOrder("asc")
    }
  }

  const SongSortIcon = ({ column }: { column: string }) => {
    if (songSortBy !== column) return <C.SortIcon>↕</C.SortIcon>
    return songSortOrder === "asc" ? (
      <C.SortIcon>↑</C.SortIcon>
    ) : (
      <C.SortIcon>↓</C.SortIcon>
    )
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

  const handleKeyDown = (e: React.KeyboardEvent, callback: () => void) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      callback()
    }
  }

  if (loading) {
    return (
      <C.Container>
        <C.LoadingState>Loading album details...</C.LoadingState>
      </C.Container>
    )
  }

  if (error) {
    return (
      <C.Container>
        <C.ErrorMessage>
          Error loading album: {error}
          <C.RetryButton
            onClick={() => {
              if (albumName) {
                const decodedAlbumName = decodeURIComponent(albumName)
                dispatch(fetchAlbumDetailRequest(decodedAlbumName))
              }
            }}
          >
            Retry
          </C.RetryButton>
        </C.ErrorMessage>
      </C.Container>
    )
  }

  if (!albumDetail) {
    return (
      <S.Container>
        <C.EmptyState>
          <C.EmptyIcon>💿</C.EmptyIcon>
          <C.EmptyText>Album not found</C.EmptyText>
          <C.EmptySubtext>
            The album you're looking for doesn't exist
          </C.EmptySubtext>
        </C.EmptyState>
      </S.Container>
    )
  }

  return (
    <S.Container>
      <S.Header>
        <C.BackButton onClick={() => void navigate(-1)}>
          ← Back to Albums
        </C.BackButton>
        <C.Title>Album Details</C.Title>
      </S.Header>

      <S.InfoHeader>
        <S.InfoCell>
          <S.ColorIndicator bgColor={getAlbumColor(albumDetail.album)}>
            <S.Icon>💿</S.Icon>
          </S.ColorIndicator>
          <S.TextInfo>
            <S.Name>{albumDetail.album}</S.Name>
            <S.Description>by {albumDetail.artist}</S.Description>
            <S.Stats>
              <S.StatPill>
                <S.StatDot color="#667eea" />
                <C.StatText>
                  {albumDetail.songCount}{" "}
                  {albumDetail.songCount === 1 ? "Song" : "Songs"}
                </C.StatText>
              </S.StatPill>
              <S.StatPill>
                <S.StatDot color="#4ecdc4" />
                <C.StatText>
                  {albumDetail.genreCount}{" "}
                  {albumDetail.genreCount === 1 ? "Genre" : "Genres"}
                </C.StatText>
              </S.StatPill>
            </S.Stats>
          </S.TextInfo>
        </S.InfoCell>
      </S.InfoHeader>

      <C.SearchSection>
        <C.SearchBox>
          <C.SearchInput
            type="text"
            placeholder="Search songs, artists, or genres..."
            value={searchTerm}
            onChange={e => {
              setSearchTerm(e.target.value)
            }}
          />
          <C.SearchIcon>🔍</C.SearchIcon>
        </C.SearchBox>
      </C.SearchSection>

      <C.DetailTableContainer>
        {sortedAndFilteredSongs.length === 0 ? (
          <C.EmptyState>
            <C.EmptyIcon>🎵</C.EmptyIcon>
            <C.EmptyText>No songs found</C.EmptyText>
            <C.EmptySubtext>Try adjusting your search terms</C.EmptySubtext>
          </C.EmptyState>
        ) : (
          <C.Table>
            <C.TableHeader>
              <C.TableRow>
                <C.TableHeaderCell
                  onClick={() => {
                    handleSongSort("title")
                  }}
                  style={{ cursor: "pointer", minWidth: "250px" }}
                >
                  <C.HeaderCellContent>
                    Title
                    <SongSortIcon column="title" />
                  </C.HeaderCellContent>
                </C.TableHeaderCell>
                <C.TableHeaderCell
                  onClick={() => {
                    handleSongSort("artist")
                  }}
                  style={{ cursor: "pointer", minWidth: "200px" }}
                >
                  <C.HeaderCellContent>
                    Artist
                    <SongSortIcon column="artist" />
                  </C.HeaderCellContent>
                </C.TableHeaderCell>
                <C.TableHeaderCell
                  onClick={() => {
                    handleSongSort("genre")
                  }}
                  style={{ cursor: "pointer", minWidth: "150px" }}
                >
                  <C.HeaderCellContent>
                    Genre
                    <SongSortIcon column="genre" />
                  </C.HeaderCellContent>
                </C.TableHeaderCell>
              </C.TableRow>
            </C.TableHeader>

            <C.TableBody>
              {sortedAndFilteredSongs.map((song, index) => (
                <C.TableRow
                  key={song.id || `${song.title}-${String(index)}`}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e: React.KeyboardEvent) => {
                    handleKeyDown(e, () => {
                      /* Handle song click if needed */
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
                    <S.GenreCell>{song.genre || "N/A"}</S.GenreCell>
                  </C.TableCell>
                </C.TableRow>
              ))}
            </C.TableBody>
          </C.Table>
        )}
      </C.DetailTableContainer>

      <C.BottomSpacer />
    </S.Container>
  )
}

export default AlbumDetail
