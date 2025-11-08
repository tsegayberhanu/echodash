import { useNavigate } from "react-router-dom"
import { useAppSelector, useAppDispatch } from "../../store/root/hooks.root"
import {
  topGenresSelector,
  topAlbumsSelector,
  topArtistsSelector,
  recentSongsSelector,
  dashboardLoadingSelector,
  dashboardErrorSelector,
  dashboardStatsSelector,
  fetchDashboardDataRequest,
} from "../../store/slices/dashboard.slice"
import { useEffect } from "react"
import type {
  TopGenre,
  TopAlbum,
  TopArtist,
  RecentSong,
} from "../../types/dashboard.types"
import * as S from "../../styles/HomeTab.styles"

const ArtistIcon = () => <span>👤</span>
const AlbumIcon = () => <span>💿</span>
const SongIcon = () => <span>🎶</span>
const GenreIcon = () => <span>🏷️</span>

const HomeTab: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const stats = useAppSelector(dashboardStatsSelector)
  const topGenres = useAppSelector(topGenresSelector)
  const topAlbums = useAppSelector(topAlbumsSelector)
  const topArtists = useAppSelector(topArtistsSelector)
  const recentSongs = useAppSelector(recentSongsSelector)
  const loading = useAppSelector(dashboardLoadingSelector)
  const error = useAppSelector(dashboardErrorSelector)

  useEffect(() => {
    dispatch(fetchDashboardDataRequest())
  }, [dispatch])

  const getGenreColor = (genre: string): string => {
    const key = genre.toLowerCase().replace(/\s+/g, "")
    return S.GenreColorMap[key] || S.GenreColorMap.default
  }

  const getAlbumColor = (album: string): string => {
    const key = album.toLowerCase().replace(/\s+/g, "")
    return S.AlbumColorMap[key] || S.AlbumColorMap.default
  }

  const getArtistInitials = (name: string): string => {
    return name
      .split(" ")
      .map(word => word[0] || "")
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const handleStatsClick = (type: string): void => {
    switch (type) {
      case "songs":
        void navigate("/songs")
        break
      case "artists":
        void navigate("/artists")
        break
      case "albums":
        void navigate("/albums")
        break
      case "genres":
        void navigate("/genres")
        break
    }
  }

  const handleGenreClick = (genre: string): void => {
    void navigate(`/genres/${encodeURIComponent(genre)}`)
  }

  const handleAlbumClick = (album: string): void => {
    void navigate(`/albums/${encodeURIComponent(album)}`)
  }

  const handleArtistClick = (artist: string): void => {
    void navigate(`/artists/${encodeURIComponent(artist)}`)
  }

  const handleSongClick = (songId: string): void => {
    console.log("Song clicked:", songId)
  }

  // Handle keyboard events safely
  const handleKeyDown = (
    event: React.KeyboardEvent,
    callback: () => void,
  ): void => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      callback()
    }
  }

  // Show loading state
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "400px",
          fontSize: "18px",
          color: "#666",
        }}
      >
        Loading dashboard data...
      </div>
    )
  }

  // Show error state
  if (error) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "400px",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <div style={{ fontSize: "18px", color: "#d32f2f" }}>
          Error loading dashboard data
        </div>
        <div style={{ color: "#666" }}>{error}</div>
        <button
          onClick={() => dispatch(fetchDashboardDataRequest())}
          style={{
            padding: "8px 16px",
            backgroundColor: "#1976d2",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          type="button"
        >
          Retry
        </button>
      </div>
    )
  }

  // Show empty state if no data
  const hasData =
    topGenres.length > 0 ||
    topAlbums.length > 0 ||
    topArtists.length > 0 ||
    recentSongs.length > 0

  if (!hasData) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "400px",
          fontSize: "18px",
          color: "#666",
        }}
      >
        No dashboard data available
      </div>
    )
  }

  return (
    <div>
      {/* Summary Cards Section */}
      <S.SummarySection>
        <S.SummaryCard
          onClick={() => {
            handleStatsClick("songs")
          }}
          role="button"
          tabIndex={0}
          onKeyDown={(e: React.KeyboardEvent) => {
            handleKeyDown(e, () => {
              handleStatsClick("songs")
            })
          }}
        >
          <S.SummaryIcon>
            <SongIcon />
          </S.SummaryIcon>
          <S.SummaryContent>
            <S.SummaryNumber>{stats.totalSongs || 0}</S.SummaryNumber>
            <S.SummaryLabel>Songs</S.SummaryLabel>
          </S.SummaryContent>
        </S.SummaryCard>

        <S.SummaryCard
          onClick={() => {
            handleStatsClick("artists")
          }}
          role="button"
          tabIndex={0}
          onKeyDown={(e: React.KeyboardEvent) => {
            handleKeyDown(e, () => {
              handleStatsClick("artists")
            })
          }}
        >
          <S.SummaryIcon>
            <ArtistIcon />
          </S.SummaryIcon>
          <S.SummaryContent>
            <S.SummaryNumber>{stats.totalArtists || 0}</S.SummaryNumber>
            <S.SummaryLabel>Artists</S.SummaryLabel>
          </S.SummaryContent>
        </S.SummaryCard>

        <S.SummaryCard
          onClick={() => {
            handleStatsClick("albums")
          }}
          role="button"
          tabIndex={0}
          onKeyDown={(e: React.KeyboardEvent) => {
            handleKeyDown(e, () => {
              handleStatsClick("albums")
            })
          }}
        >
          <S.SummaryIcon>
            <AlbumIcon />
          </S.SummaryIcon>
          <S.SummaryContent>
            <S.SummaryNumber>{stats.totalAlbums || 0}</S.SummaryNumber>
            <S.SummaryLabel>Albums</S.SummaryLabel>
          </S.SummaryContent>
        </S.SummaryCard>

        <S.SummaryCard
          onClick={() => {
            handleStatsClick("genres")
          }}
          role="button"
          tabIndex={0}
          onKeyDown={(e: React.KeyboardEvent) => {
            handleKeyDown(e, () => {
              handleStatsClick("genres")
            })
          }}
        >
          <S.SummaryIcon>
            <GenreIcon />
          </S.SummaryIcon>
          <S.SummaryContent>
            <S.SummaryNumber>{stats.totalGenres || 0}</S.SummaryNumber>
            <S.SummaryLabel>Genres</S.SummaryLabel>
          </S.SummaryContent>
        </S.SummaryCard>
      </S.SummarySection>

      {/* Top Sections Grid */}
      <S.TopSection>
        {/* Top Genres */}
        <S.TopCard>
          <S.TopCardHeader>
            <S.TopCardTitle>Top Genres</S.TopCardTitle>
          </S.TopCardHeader>

          <S.TopList>
            {topGenres.map((item: TopGenre) => (
              <S.TopItem
                key={item.genre}
                onClick={() => {
                  handleGenreClick(item.genre)
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e: React.KeyboardEvent) => {
                  handleKeyDown(e, () => {
                    handleGenreClick(item.genre)
                  })
                }}
              >
                <S.ItemIcon bgColor={getGenreColor(item.genre)}>
                  <GenreIcon />
                </S.ItemIcon>
                <S.ItemContent>
                  <S.ItemTitle>{item.genre}</S.ItemTitle>
                  <S.ItemStats>
                    <S.StatItem>
                      <S.StatValue>{item.songs}</S.StatValue>
                      <span>tracks</span>
                    </S.StatItem>
                    <S.StatItem>
                      <S.StatValue>{item.artists}</S.StatValue>
                      <span>artists</span>
                    </S.StatItem>
                  </S.ItemStats>
                </S.ItemContent>
              </S.TopItem>
            ))}
          </S.TopList>
        </S.TopCard>

        {/* Top Albums */}
        <S.TopCard>
          <S.TopCardHeader>
            <S.TopCardTitle>Top Albums</S.TopCardTitle>
          </S.TopCardHeader>

          <S.TopList>
            {topAlbums.map((item: TopAlbum) => (
              <S.TopItem
                key={item.album}
                onClick={() => {
                  handleAlbumClick(item.album)
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e: React.KeyboardEvent) => {
                  handleKeyDown(e, () => {
                    handleAlbumClick(item.album)
                  })
                }}
              >
                <S.ItemIcon bgColor={getAlbumColor(item.album)}>
                  <AlbumIcon />
                </S.ItemIcon>
                <S.ItemContent>
                  <S.ItemTitle>{item.album}</S.ItemTitle>
                  <S.AlbumArtist>{item.mainArtist}</S.AlbumArtist>
                  <S.ItemStats>
                    <S.StatItem>
                      <S.StatValue>{item.songs}</S.StatValue>
                      <span>songs</span>
                    </S.StatItem>
                    <S.StatItem>
                      <S.StatValue>{item.genres}</S.StatValue>
                      <span>genres</span>
                    </S.StatItem>
                    <S.StatItem>
                      <S.StatValue>{item.artists}</S.StatValue>
                      <span>artists</span>
                    </S.StatItem>
                  </S.ItemStats>
                </S.ItemContent>
              </S.TopItem>
            ))}
          </S.TopList>
        </S.TopCard>

        {/* Top Artists */}
        <S.TopCard>
          <S.TopCardHeader>
            <S.TopCardTitle>Top Artists</S.TopCardTitle>
          </S.TopCardHeader>

          <S.TopList>
            {topArtists.map((item: TopArtist) => (
              <S.TopItem
                key={item.artist}
                onClick={() => {
                  handleArtistClick(item.artist)
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e: React.KeyboardEvent) => {
                  handleKeyDown(e, () => {
                    handleArtistClick(item.artist)
                  })
                }}
              >
                <S.ItemIcon bgColor="#e3f2fd">
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      backgroundColor: "#f5f5f5",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#666",
                      fontSize: "10px",
                      fontWeight: "bold",
                      border: "1px solid #ddd",
                    }}
                  >
                    {getArtistInitials(item.artist)}
                  </div>
                </S.ItemIcon>
                <S.ItemContent>
                  <S.ItemTitle>{item.artist}</S.ItemTitle>
                  <S.ItemStats>
                    <S.StatItem>
                      <S.StatValue>{item.songs}</S.StatValue>
                      <span>tracks</span>
                    </S.StatItem>
                    <S.StatItem>
                      <S.StatValue>{item.albums}</S.StatValue>
                      <span>albums</span>
                    </S.StatItem>
                    <S.StatItem>
                      <S.StatValue>{item.genres}</S.StatValue>
                      <span>genres</span>
                    </S.StatItem>
                  </S.ItemStats>
                </S.ItemContent>
              </S.TopItem>
            ))}
          </S.TopList>
        </S.TopCard>
      </S.TopSection>

      {/* Recent Songs Section */}
      <S.TopCard>
        <S.TopCardHeader>
          <S.TopCardTitle>Fresh Adds</S.TopCardTitle>
        </S.TopCardHeader>

        <S.TopList>
          {recentSongs.map((song: RecentSong) => (
            <S.TopItem
              key={song.id}
              onClick={() => {
                handleSongClick(song.id)
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e: React.KeyboardEvent) => {
                handleKeyDown(e, () => {
                  handleSongClick(song.id)
                })
              }}
            >
              <S.ItemIcon bgColor={getGenreColor(song.genre || "default")}>
                <SongIcon />
              </S.ItemIcon>
              <S.ItemContent>
                <S.ItemTitle>{song.title}</S.ItemTitle>
                <S.ItemStats>
                  <S.StatItem>
                    <span>{song.artist}</span>
                  </S.StatItem>
                  <S.StatItem>
                    <span>{song.album || "No Album"}</span>
                  </S.StatItem>
                  <S.StatItem>
                    <span>{song.genre || "Unknown"}</span>
                  </S.StatItem>
                </S.ItemStats>
              </S.ItemContent>
            </S.TopItem>
          ))}
        </S.TopList>
      </S.TopCard>
    </div>
  )
}

export default HomeTab
