// App.tsx
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Dashboard from "./components/dashboard/Dashboard"
import ArtistDetail from "./components/artists/ArtistDetail"
import AlbumDetail from "./components/albums/AlbumDetail"
import GenreDetail from "./components/genres/GenreDetail"

const theme = createTheme({
  palette: {
    primary: {
      main: "#667eea",
    },
    secondary: {
      main: "#764ba2",
    },
    background: {
      default: "#f7fafc",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  shape: {
    borderRadius: 12,
  },
})

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/artists/:artistName" element={<ArtistDetail />} />
          <Route path="/albums/:albumName" element={<AlbumDetail />} />
          <Route path="/genres/:genreName" element={<GenreDetail />} />
          <Route path="/*" element={<Dashboard />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
