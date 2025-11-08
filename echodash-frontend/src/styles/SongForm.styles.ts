import styled from "@emotion/styled"
export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`
export const Card = styled.div`
  background: #fff;
  border-radius: 10px;
  padding: 24px 28px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  width: 90vw;
  max-width: 460px;
  height: auto;
  max-height: 85vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media (max-width: 1024px) {
    width: 95vw;
  }

  @media (max-width: 600px) {
    width: 100%;
    padding: 16px;
    max-height: 90vh;
  }
`
export const ScrollArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-right: 6px;
  margin-bottom: 12px;
  scrollbar-width: thin;
  scrollbar-color: #ccc transparent;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }
`
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`
export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
`
export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`
export const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #333;
`
export const Input = styled.input<{ disabled?: boolean }>`
  padding: 12px 14px;
  border-radius: 8px;
  border: 1.6px solid #ccc;
  font-size: 15px;
  transition: all 0.2s ease;
  background: ${({ disabled }) => (disabled ? "#f5f5f5" : "#fff")};
  color: ${({ disabled }) => (disabled ? "#777" : "#111")};
  width: 100%;

  &:focus {
    outline: none;
    border-color: #3f51b5;
    box-shadow: 0 0 0 3px rgba(63, 81, 181, 0.12);
  }
`
export const Divider = styled.div`
  border-top: 1px solid #e0e0e0;
  margin: 0;
`
export const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 16px;
  flex-shrink: 0;
  background: #fff;
  position: sticky;
  bottom: 0;
`
export const Button = styled.button<{ variant?: "primary" | "secondary" }>`
  padding: 10px 20px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  background-color: ${({ variant }) =>
    variant === "primary" ? "#3f51b5" : "#f1f1f1"};
  color: ${({ variant }) => (variant === "primary" ? "#fff" : "#333")};
  transition:
    background-color 0.2s ease,
    transform 0.1s ease;

  &:hover {
    background-color: ${({ variant }) =>
      variant === "primary" ? "#32408f" : "#e0e0e0"};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`
