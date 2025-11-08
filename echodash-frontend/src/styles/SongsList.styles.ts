import styled from "@emotion/styled"

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
`
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
`
export const Title = styled.h1`
  color: #333;
  margin: 0;
  font-size: 24px;
  flex: 1 1 auto;
`
export const Button = styled.button<{ variant?: "primary" | "secondary" }>`
  background: ${props =>
    props.variant === "secondary" ? "#6c757d" : "#007bff"};
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 4px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  white-space: nowrap;

  &:hover {
    background: ${props =>
      props.variant === "secondary" ? "#5a6268" : "#0056b3"};
  }

  &:disabled {
    background: #6c757d;
    cursor: not-allowed;
  }
`
export const FiltersCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`
export const FiltersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
  align-items: end;
`
export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`
export const Label = styled.label`
  font-weight: 500;
  color: #333;
  font-size: 14px;
`
export const Input = styled.input`
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  width: 100%;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`
export const Chip = styled.span<{ color?: "primary" | "secondary" }>`
  background: ${props => (props.color === "primary" ? "#007bff" : "#6c757d")};
  color: white;
  padding: 4px 8px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
`
export const ActionButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap; /* responsive wrap */
`
export const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #f8f9fa;

    &.view {
      color: #007bff;
    }
    &.edit {
      color: #28a745;
    }
    &.delete {
      color: #dc3545;
    }
  }
`
export const Dialog = styled.div<{ open: boolean }>`
  display: ${props => (props.open ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2000;
`
export const DialogContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 24px;
  border-radius: 8px;
  min-width: 200px;
  max-width: 90vw;
  max-height: 90vh;
`
export const Snackbar = styled.div<{
  open: boolean
  severity: "error" | "success"
}>`
  display: ${props => (props.open ? "flex" : "none")};
  position: fixed;
  bottom: 24px;
  right: 24px;
  background: ${props => (props.severity === "error" ? "#dc3545" : "#28a745")};
  color: white;
  padding: 12px 16px;
  border-radius: 4px;
  align-items: center;
  gap: 12px;
  min-width: 300px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  z-index: 1100;
`
