import styled from "@emotion/styled"

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 24px;
  text-align: center;
  background-color: #fafafa;
`

export const ErrorTitle = styled.h1`
  font-size: 2rem;
  color: #d32f2f;
  margin-bottom: 12px;
`

export const ErrorMessage = styled.p`
  font-size: 1rem;
  color: #555;
  margin-bottom: 20px;
`

export const RetryButton = styled.button`
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #115293;
  }
`
