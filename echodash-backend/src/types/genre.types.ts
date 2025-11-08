export type Genre = {
  genre: string
  songCount: number
  artistCount: number
}

export type GenresResponse = {
  genres: Genre[]
  total: number
}