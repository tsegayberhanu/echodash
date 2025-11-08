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
export const Title = styled.h3`
  margin: 0 0 16px 0;
  font-size: 1.2rem;
  font-weight: 600;
  color: #111;
`
export const Message = styled.p`
  margin: 0;
  font-size: 0.95rem;
  color: #444;
  line-height: 1.4;
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
export const CancelButton = styled.button`
  padding: 10px 20px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  background-color: #f1f1f1;
  color: #333;
  transition:
    background-color 0.2s ease,
    transform 0.1s ease;

  &:hover {
    background-color: #e0e0e0;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`
export const DeleteButton = styled.button`
  padding: 10px 20px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  background-color: #dc2626;
  color: #fff;
  transition:
    background-color 0.2s ease,
    transform 0.1s ease;

  &:hover {
    background-color: #b91c1c;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`
