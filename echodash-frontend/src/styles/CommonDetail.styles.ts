import styled from "@emotion/styled"
export const Container = styled.div`
  padding: 0;
  background: #f8f9fa;
  min-height: 100vh;
`
export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 24px;
  background: white;
  border-bottom: 1px solid #e0e0e0;
  // margin-bottom: 24px;
`
export const InfoHeader = styled.div`
  background: white;
  padding: 24px;
  margin: 24px 0;
  border-radius: 12px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
`
export const InfoCell = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`
export const ColorIndicator = styled.div<{ bgColor?: string }>`
  width: 64px;
  height: 64px;
  border-radius: 12px;
  background: ${({ bgColor }) => bgColor ?? "#ccc"};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
`
export const Icon = styled.span``
export const TextInfo = styled.div`
  flex: 1;
`
export const Name = styled.h2<{ marginBottom?: string }>`
  margin: 0 0 ${({ marginBottom }) => marginBottom ?? "16px"} 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
`
export const Stats = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`
export const StatPill = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f8f9fa;
  padding: 6px 12px;
  border-radius: 20px;
  border: 1px solid #e9ecef;
`
export const StatDot = styled.div<{ color: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => props.color};
`
export const StatText = styled.span`
  font-weight: 500;
  color: #495057;
  font-size: 0.9rem;
`
export const SongTitleCell = styled.div`
  font-weight: 500;
  color: #333;
  font-size: 0.95rem;
`
export const ArtistCell = styled.div`
  color: #666;
  font-size: 0.9rem;
`
export const AlbumCell = styled.div`
  color: #666;
  font-size: 0.9rem;
`
export const GenreCell = styled.div`
  color: #666;
  font-size: 0.9rem;
`
export const BackButton = styled.button`
  padding: 8px 16px;
  border: 1px solid #e0e0e0;
  background: white;
  color: #333;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;

  &:hover {
    background: #f8f9fa;
    border-color: #667eea;
  }
`
export const Description = styled.p`
  margin: 0 0 16px 0;
  color: #666;
  font-size: 1rem;
`
export const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin:24px 0;
  padding: 16px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  flex-wrap: wrap;
  gap: 12px;
`
