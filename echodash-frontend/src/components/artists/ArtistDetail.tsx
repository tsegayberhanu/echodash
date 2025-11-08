import { useState, useEffect, useMemo } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../store/root/hooks.root"
import * as S from "../../styles/CommonDetail.styles"
import * as C from "../../styles/Common.styles"

import {
  fetchArtistDetailRequest,
  clearArtistDetailNotifications,
  artistDetailSelector,
  artistDetailLoadingSelector,
  artistDetailErrorSelector,
} from "../../store/slices/artistDetail.slice"
import type { Song } from "../../types/song.types"

const ArtistDetail: React.FC = () => {
  const { artistName } = useParams<{ artistName: string }>()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const artistDetail = useAppSelector(artistDetailSelector)
  const loading = useAppSelector(artistDetailLoadingSelector)
  const error = useAppSelector(artistDetailErrorSelector)

  const [songSortBy, setSongSortBy] = useState<string>("title")
  const [songSortOrder, setSongSortOrder] = useState<"asc" | "desc">("asc")
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    if (artistName) {
      const decodedArtistName = decodeURIComponent(artistName)
      dispatch(fetchArtistDetailRequest(decodedArtistName))
    }
  }, [artistName, dispatch])

  useEffect(() => {
    return () => {
      dispatch(clearArtistDetailNotifications())
    }
  }, [dispatch])

  const sortedAndFilteredSongs = useMemo(() => {
    if (!artistDetail?.songs) return []

    const filtered = artistDetail.songs.filter(song => {
      const matchesSearch =
        (song.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (song.album || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (song.genre || "").toLowerCase().includes(searchTerm.toLowerCase())
      return matchesSearch
    })

    const sortFunctions = {
      title: (a: Song, b: Song) => (a.title || "").localeCompare(b.title || ""),
      album: (a: Song, b: Song) => (a.album || "").localeCompare(b.album || ""),
      genre: (a: Song, b: Song) => (a.genre || "").localeCompare(b.genre || ""),
    }

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    const sortedArray = filtered.sort(  sortFunctions[songSortBy as keyof typeof sortFunctions] ||
        sortFunctions.title,
    )

    return songSortOrder === "asc" ? sortedArray : sortedArray.reverse()
  }, [artistDetail?.songs, songSortBy, songSortOrder, searchTerm])

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

  const getArtistColor = (artistName: string): string => {
    const colors = [
      "#667eea",
      "#764ba2",
      "#f093fb",
      "#f5576c",
      "#4facfe",
      "#00f2fe",
      "#43e97b",
      "#38f9d7",
      "#ffecd2",
      "#fcb69f",
    ]
    const index = artistName
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
        <C.LoadingState>Loading artist details...</C.LoadingState>
      </C.Container>
    )
  }

  if (error) {
    return (
      <C.Container>
        <C.ErrorMessage>
          Error loading artist: {error}
          <C.RetryButton
            onClick={() => {
              if (artistName) {
                const decodedArtistName = decodeURIComponent(artistName)
                dispatch(fetchArtistDetailRequest(decodedArtistName))
              }
            }}
          >
            Retry
          </C.RetryButton>
        </C.ErrorMessage>
      </C.Container>
    )
  }

  if (!artistDetail) {
    return (
      <C.Container>
        <C.EmptyState>
          <C.EmptyIcon>🎤</C.EmptyIcon>
          <C.EmptyText>Artist not found</C.EmptyText>
          <C.EmptySubtext>
            The artist you're looking for doesn't exist
          </C.EmptySubtext>
        </C.EmptyState>
      </C.Container>
    )
  }

  return (
    <S.Container>
      <S.Header>
        <C.BackButton onClick={() => void navigate(-1)}>
          ← Back to Artists
        </C.BackButton>
        <C.Title>Artist Details</C.Title>
      </S.Header>

      <S.InfoHeader>
        <S.InfoCell>
          <S.ColorIndicator bgColor={getArtistColor(artistDetail.artist)}>
            <S.Icon>🎤</S.Icon>
          </S.ColorIndicator>
          <S.TextInfo>
            <S.Name>{artistDetail.artist}</S.Name>
            <S.Stats>
              <S.StatPill>
                <S.StatDot color="#667eea" />
                <S.StatText>
                  {artistDetail.songCount}{" "}
                  {artistDetail.songCount === 1 ? "Song" : "Songs"}
                </S.StatText>
              </S.StatPill>
              <S.StatPill>
                <S.StatDot color="#4ecdc4" />
                <S.StatText>
                  {artistDetail.albumCount}{" "}
                  {artistDetail.albumCount === 1 ? "Album" : "Albums"}
                </S.StatText>
              </S.StatPill>
              <S.StatPill>
                <S.StatDot color="#ff6b6b" />
                <S.StatText>
                  {artistDetail.genreCount}{" "}
                  {artistDetail.genreCount === 1 ? "Genre" : "Genres"}
                </S.StatText>
              </S.StatPill>
            </S.Stats>
          </S.TextInfo>
        </S.InfoCell>
      </S.InfoHeader>

      <C.SearchSection>
        <C.SearchBox>
          <C.SearchInput
            type="text"
            placeholder="Search songs, albums, or genreC..."
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
                    handleSongSort("album")
                  }}
                  style={{ cursor: "pointer", minWidth: "200px" }}
                >
                  <C.HeaderCellContent>
                    Album
                    <SongSortIcon column="album" />
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
                    <S.AlbumCell>{song.album || "N/A"}</S.AlbumCell>
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

export default ArtistDetail
