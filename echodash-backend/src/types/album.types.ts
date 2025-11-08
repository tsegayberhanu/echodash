export type Albums = {
  album: string
  songCount: number
  genreCount: number
  artistCount: number
  artist: string
}

export type AlbumsResponse = {
  albums: Albums[]
  total: number
}