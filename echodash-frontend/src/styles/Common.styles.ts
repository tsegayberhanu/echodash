import styled from "@emotion/styled"

export const Container = styled.div`
  padding-top: 0px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 16px;
  }

  @media (max-width: 480px) {
    padding: 12px;
  }
`
export const Header = styled.div``
export const DetailContainer = styled.div`
  padding: 0;
  background: #f8f9fa;
  min-height: 100vh;
`
export const DetailHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 24px;
  background: white;
  border-bottom: 1px solid #e0e0e0;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    padding: 16px;
  }
`
export const Title = styled.h1`
  font-size: 28px;
  font-weight: 600;
  color: #1a1a1a;
  @media (max-width: 768px) {
    font-size: 22px;
  }

  @media (max-width: 480px) {
    font-size: 20px;
    margin-bottom: 16px;
  }
`
export const FiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  width: 100%;
  align-items: center;
  margin-bottom: 16px;
`
export const SearchBox = styled.div`
  position: relative;
  flex: 1;
  min-width: 250px;

  @media (max-width: 480px) {
    min-width: 100%;
  }
`
export const SearchInput = styled.input`
  width: 100%;
  padding: 12px 16px 12px 40px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  background: white;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.1);
  }

  @media (max-width: 480px) {
    padding: 10px 14px 10px 36px;
    font-size: 13px;
  }
`
export const SearchIcon = styled.span`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
`
export const FilterGroup = styled.div`
  display: flex;
  gap: 12px;
  flex: 1 1 auto; 
  flex-wrap: nowrap;
  @media (max-width: 900px) {
    width: 100%;
    flex-wrap: wrap;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: stretch;
  }
    & > * {
      flex: 1 1 auto; /* grow/shrink normally */
      min-width: 0;   /* fill width */
    }
  }

  & > * {
    flex: 1 1 120px;
    min-width: 120px;
  }
`
export const FilterSelect = styled.select`
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: white;
  font-size: 14px;
  cursor: pointer;
  &:focus {
    outline: none;
    border-color: #007bff;
  }

  @media (max-width: 480px) {
    width: 100%;
    padding: 10px 14px;
    font-size: 13px;
  }
`
export const TableContainer = styled.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #e0e0e0;
  overflow-x: auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
`
export const DetailTableContainer = styled.div`
  background: white;
  // margin: 0 24px;
  border-radius: 12px;
  border: 1px solid #e0e0e0;
  overflow-x: auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  min-height: 200px;
  // margin-bottom: 24px;
`
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 700px;
`
export const TableHeader = styled.thead`
  background: #f8f9fa;
  border-bottom: 2px solid #e9ecef;
`
export const TableBody = styled.tbody`
  background: white;
`
export const TableRow = styled.tr`
  border-bottom: 1px solid #f0f0f0;
  transition: all 0.2s ease;
  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: #f8f9fa;
  }

  &:focus {
    outline: none;
    background: #e9ecef;
  }
`
export const TableHeaderCell = styled.th`
  padding: 16px 20px;
  text-align: left;
  font-weight: 600;
  color: #495057;
  font-size: 0.9rem;
  border-right: 1px solid #e9ecef;

  &:last-child {
    border-right: none;
  }

  @media (max-width: 480px) {
    padding: 12px;
    font-size: 0.8rem;
  }
`
export const TableCell = styled.td`
  padding: 16px 20px;
  border-right: 1px solid #f8f9fa;

  &:last-child {
    border-right: none;
  }

  @media (max-width: 480px) {
    padding: 12px;
    font-size: 0.85rem;
  }
`
export const HeaderCellContent = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`
export const SortIcon = styled.span`
  font-size: 12px;
  color: #6c757d;
`
export const LoadingState = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  color: #666;
`
export const PaginationButton = styled.button<{ disabled?: boolean }>`
  padding: 0.5rem 1rem;
  background: ${props => (props.disabled ? "#ccc" : "#4ecdc4")};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};

  &:hover:not(:disabled) {
    background: #45b7d1;
  }

  @media (max-width: 480px) {
    padding: 0.4rem 0.8rem;
  }
`
export const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding: 16px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  flex-wrap: wrap;
  gap: 12px;
`
export const RowsPerPageContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`
export const DisplayInfo = styled.div`
  color: #666;
  font-size: 14px;
  flex: 1 1 auto;
  text-align: center;
`
export const Pagination = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
`
export const Label = styled.label`
  font-weight: 500;
  color: #333;
  font-size: 14px;
`
export const Select = styled.select`
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  width: 100%;
  background: white;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`
export const ClearFiltersButton = styled.button`
  padding: 12px 16px;
  border: 1px solid #f0a2a2ff;
  background: white;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background: #f51d1dff;
  }

  @media (max-width: 480px) {
    width: 100%;
    padding: 10px 14px;
    font-size: 13px;
  }
`
export const StatValue = styled.div`
  font-weight: 600;
  color: #333;
  font-size: 0.95rem;

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`
export const ErrorMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: #ff6b6b;
  text-align: center;
`
export const RetryButton = styled.button`
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: #4ecdc4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #45b7d1;
  }
`
export const EmptyState = styled.div`
  text-align: center;
  padding: 60px 24px;
  background: white;
  border-radius: 12px;
  border: 1px solid #e0e0e0;
`
export const EmptyIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
`
export const EmptyText = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: #333;
  margin-bottom: 8px;
`
export const EmptySubtext = styled.div`
  color: #666;
  font-size: 14px;
`
export const SearchSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`
export const BottomSpacer = styled.div`
  height: 60px;
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

  @media (max-width: 480px) {
    width: 100%;
  }
`
export const StatText = styled.span`
  font-weight: 500;
  color: #495057;
  font-size: 0.9rem;

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`
export const Ellipsis = styled.span`
  padding: 0 8px;
  color: #6c757d;
`
