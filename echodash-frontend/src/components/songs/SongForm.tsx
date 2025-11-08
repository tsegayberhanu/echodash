import { useState, useEffect } from "react"
import { useAppDispatch } from "../../store/root/hooks.root"
import {
  createSongRequest,
  updateSongRequest,
} from "../../store/slices/songs.slice"
import type { Song } from "../../types/song.types"
import * as S from "../../styles/SongForm.styles"
type SongFormProps = {
  song?: Song | null
  mode: "view" | "edit" | "create"
  onSuccess: () => void
  onCancel: () => void
}

const SongForm: React.FC<SongFormProps> = ({
  song,
  mode,
  onSuccess,
  onCancel,
}) => {
  const dispatch = useAppDispatch()
  const [formData, setFormData] = useState<Partial<Song>>({
    title: "",
    artist: "",
    album: "",
    genre: "",
  })

  const isViewMode = mode === "view"
  const isEditMode = mode === "edit"
  const isCreateMode = mode === "create"

  useEffect(() => {
    if (song) setFormData(song)
  }, [song])

  const handleChange =
    (field: keyof Song) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData(prev => ({ ...prev, [field]: e.target.value }))
    }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (isCreateMode) {
      dispatch(createSongRequest(formData))
    } else if (isEditMode && song) {
      dispatch(updateSongRequest({ id: song.id, data: formData }))
    }

    onSuccess()
  }

  return (
    <S.Wrapper>
      <S.Card>
        <S.ScrollArea>
          <S.Form onSubmit={handleSubmit}>
            <S.Grid>
              <S.Field>
                <S.Label>Title</S.Label>
                <S.Input
                  type="text"
                  value={formData.title ?? ""}
                  onChange={handleChange("title")}
                  required
                  disabled={isViewMode}
                />
              </S.Field>

              <S.Field>
                <S.Label>Artist</S.Label>
                <S.Input
                  type="text"
                  value={formData.artist ?? ""}
                  onChange={handleChange("artist")}
                  required
                  disabled={isViewMode}
                />
              </S.Field>

              <S.Field>
                <S.Label>Album</S.Label>
                <S.Input
                  type="text"
                  value={formData.album ?? ""}
                  onChange={handleChange("album")}
                  disabled={isViewMode}
                />
              </S.Field>

              <S.Field>
                <S.Label>Genre</S.Label>
                <S.Input
                  type="text"
                  value={formData.genre ?? ""}
                  onChange={handleChange("genre")}
                  disabled={isViewMode}
                />
              </S.Field>
            </S.Grid>
          </S.Form>
        </S.ScrollArea>

        {!isViewMode && (
          <>
            <S.Divider />
            <S.ButtonRow>
              <S.Button variant="secondary" onClick={onCancel} type="button">
                Cancel
              </S.Button>
              <S.Button variant="primary" type="submit" onClick={handleSubmit}>
                {isCreateMode ? "Create Song" : "Update Song"}
              </S.Button>
            </S.ButtonRow>
          </>
        )}
      </S.Card>
    </S.Wrapper>
  )
}

export default SongForm
