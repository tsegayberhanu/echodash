import styled from "@emotion/styled"

export const TopSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`
export const TopCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  border: 1px solid #e0e0e0;
  min-height: 0;

  @media (max-width: 768px) {
    padding: 12px;
  }
`
export const TopCardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #f0f0f0;
`
export const TopCardTitle = styled.h3`
  margin: 0;
  color: #333;
  font-size: 1rem;
  font-weight: 600;
`
export const TopList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`
export const TopItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent;

  &:hover {
    background: #f8f9fa;
    border-color: #e0e0e0;
    transform: translateX(2px);
  }

  @media (max-width: 768px) {
    padding: 10px;
    gap: 10px;
  }
`
export const ItemIcon = styled.div<{ bgColor?: string }>`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: ${props => props.bgColor ?? "#e3f2fd"};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => (props.bgColor ? "white" : "#1976d2")};
  font-size: 14px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 28px;
    height: 28px;
    font-size: 12px;
  }
`
export const ItemContent = styled.div`
  flex: 1;
  min-width: 0;
`
export const ItemTitle = styled.div`
  font-weight: 600;
  color: #333;
  margin-bottom: 2px;
  font-size: 0.875rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
export const ItemStats = styled.div`
  display: flex;
  gap: 12px;

  @media (max-width: 768px) {
    gap: 8px;
  }
`
export const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.75rem;
  color: #666;
`
export const StatValue = styled.span`
  font-weight: 600;
  color: #333;
  font-size: 0.75rem;
`
export const GenreColorMap: Record<string, string> = {
  pop: "#ff6b6b",
  hiphop: "#4ecdc4",
  rap: "#45b7d1",
  rock: "#96ceb4",
  jazz: "#feca57",
  classical: "#ff9ff3",
  electronic: "#54a0ff",
  rnb: "#5f27cd",
  country: "#ff9f43",
  metal: "#2d3436",
  folk: "#00d2d3",
  blues: "#341f97",
  reggae: "#10ac84",
  default: "#a4b0be",
}
export const AlbumColorMap: Record<string, string> = {
  divide: "#ff6b6b",
  thriller: "#4ecdc4",
  "21": "#45b7d1",
  "back in black": "#96ceb4",
  "the dark side of the moon": "#feca57",
  default: "#a4b0be",
}
export const SummarySection = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 32px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`
export const SummaryCard = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #1976d2;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  &:focus {
    outline: 2px solid #1976d2;
    outline-offset: 2px;
  }

  @media (max-width: 768px) {
    padding: 12px;
  }
`
export const SummaryIcon = styled.div`
  font-size: 20px;
  margin-right: 12px;

  @media (max-width: 768px) {
    font-size: 18px;
    margin-right: 10px;
  }
`
export const SummaryContent = styled.div`
  display: flex;
  flex-direction: column;
`
export const SummaryNumber = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #333;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`
export const SummaryLabel = styled.div`
  font-size: 13px;
  color: #666;
  margin-top: 2px;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`
export const AlbumArtist = styled.div`
  font-size: 0.75rem;
  color: #666;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
