import { Outlet, useNavigate, useLocation } from "react-router-dom"
import * as S from "../../styles/Dashboard.styles"
import { useState } from "react"

const HomeIcon = () => <span>🏠</span>
const MusicIcon = () => <span>🎵</span>
const ArtistIcon = () => <span>👤</span>
const AlbumIcon = () => <span>💿</span>
const GenreIcon = () => <span>🏷️</span>
const MenuIcon = () => <span>☰</span>
const CloseIcon = () => <span>✕</span>

type TabType = "home" | "songs" | "artists" | "albums" | "genres"

const Dashboard: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const getActiveTab = (): TabType => {
    const path = location.pathname
    if (path === "/" || path === "/home") return "home"
    if (path.startsWith("/songs")) return "songs"
    if (path.startsWith("/artists")) return "artists"
    if (path.startsWith("/albums")) return "albums"
    if (path.startsWith("/genres")) return "genres"
    return "home"
  }

  const activeTab = getActiveTab()

  const handleTabClick = (tab: TabType): void => {
    if (tab === "home") {
      void navigate("/")
    } else {
      void navigate(`/${tab}`)
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <S.DashboardContainer>
      <S.MobileMenuButton
        onClick={() => {
          setIsMobileMenuOpen(!isMobileMenuOpen)
        }}
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
      </S.MobileMenuButton>

      <S.Sidebar isOpen={isMobileMenuOpen}>
        <S.SidebarHeader>
          <S.SidebarTitle>echodash</S.SidebarTitle>
        </S.SidebarHeader>

        <S.NavList>
          <S.NavItem active={activeTab === "home"}>
            <a
              href="#home"
              onClick={e => {
                e.preventDefault()
                handleTabClick("home")
              }}
            >
              <HomeIcon /> Dashboard
            </a>
          </S.NavItem>
          <S.NavItem active={activeTab === "songs"}>
            <a
              href="#songs"
              onClick={e => {
                e.preventDefault()
                handleTabClick("songs")
              }}
            >
              <MusicIcon /> All Songs
            </a>
          </S.NavItem>
          <S.NavItem active={activeTab === "artists"}>
            <a
              href="#artists"
              onClick={e => {
                e.preventDefault()
                handleTabClick("artists")
              }}
            >
              <ArtistIcon /> Artists
            </a>
          </S.NavItem>
          <S.NavItem active={activeTab === "albums"}>
            <a
              href="#albums"
              onClick={e => {
                e.preventDefault()
                handleTabClick("albums")
              }}
            >
              <AlbumIcon /> Albums
            </a>
          </S.NavItem>
          <S.NavItem active={activeTab === "genres"}>
            <a
              href="#genres"
              onClick={e => {
                e.preventDefault()
                handleTabClick("genres")
              }}
            >
              <GenreIcon /> Genres
            </a>
          </S.NavItem>
        </S.NavList>
      </S.Sidebar>

      <S.MainContent>
        <S.MobileHeader>
          <S.MobileTitle>
            {activeTab === "home" && "Dashboard"}
            {activeTab === "songs" && "All Songs"}
            {activeTab === "artists" && "Artists"}
            {activeTab === "albums" && "Albums"}
            {activeTab === "genres" && "Genres"}
          </S.MobileTitle>
        </S.MobileHeader>

        <Outlet />
      </S.MainContent>

      {isMobileMenuOpen && (
        <S.MobileOverlay
          onClick={() => {
            setIsMobileMenuOpen(false)
          }}
        />
      )}
    </S.DashboardContainer>
  )
}

export default Dashboard
