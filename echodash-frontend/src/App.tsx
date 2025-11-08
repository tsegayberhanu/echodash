import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ThemeProvider, Global, css } from "@emotion/react"
import styled from "@emotion/styled"
import Dashboard from "./components/dashboard/Dashboard"
import ArtistDetail from "./components/artists/ArtistDetail"
import AlbumDetail from "./components/albums/AlbumDetail"
import GenreDetail from "./components/genres/GenreDetail"

const theme = {
  colors: {
    primary: "#667eea",
    secondary: "#764ba2",
    background: "#f7fafc",
    text: "#1a202c",
  },
  shape: {
    borderRadius: "12px",
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
}
const AppContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  min-height: 100vh;
  font-family: ${({ theme }) => theme.typography.fontFamily};
`
export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Global
        styles={css`
          *,
          *::before,
          *::after {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }

          body {
            background-color: ${theme.colors.background};
            font-family: ${theme.typography.fontFamily};
            color: ${theme.colors.text};
            line-height: 1.5;
            -webkit-font-smoothing: antialiased;
          }

          a {
            text-decoration: none;
            color: inherit;
          }

          button {
            font-family: inherit;
            cursor: pointer;
          }
        `}
      />

      <AppContainer>
        <Router>
          <Routes>
            <Route path="/artists/:artistName" element={<ArtistDetail />} />
            <Route path="/albums/:albumName" element={<AlbumDetail />} />
            <Route path="/genres/:genreName" element={<GenreDetail />} />
            <Route path="/*" element={<Dashboard />} />
          </Routes>
        </Router>
      </AppContainer>
    </ThemeProvider>
  )
}
export default App
