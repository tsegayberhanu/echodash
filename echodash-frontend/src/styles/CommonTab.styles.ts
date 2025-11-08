import styled from "@emotion/styled"

export const InfoCell = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`
export const GenreColorIndicator = styled.div<{ bgColor: string }>`
  width: 16px;
  height: 16px;
  border-radius: 4px;
  background: ${props => props.bgColor};
  flex-shrink: 0;
`
export const ArtistColorIndicator = styled.div<{ bgColor: string }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.bgColor};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`
export const AlbumColorIndicator = styled.div<{ bgColor: string }>`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: ${props => props.bgColor};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`
export const TextInfo = styled.div`
  flex: 1;
`
export const Name = styled.div`
  font-weight: 500;
  color: #333;
  margin-bottom: 2px;
`
export const Description = styled.div`
  font-size: 0.8rem;
  color: #666;
`
export const Icon = styled.span`
  font-size: 16px;
`
