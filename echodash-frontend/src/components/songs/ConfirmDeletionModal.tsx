import * as S from "../../styles/ConfirmDeletionModal.styles"

type ConfirmDeletionModalProps = {
  title?: string
  message?: string
  onConfirm: () => void
  onCancel: () => void
}

export const ConfirmDeletionModal: React.FC<ConfirmDeletionModalProps> = ({
  title = "Confirm Delete",
  message = "Are you sure you want to delete this resource?",
  onConfirm,
  onCancel,
}) => {
  return (
    <S.Wrapper>
      <S.Card>
        <S.ScrollArea>
          <S.Title>{title}</S.Title>
          <S.Message>{message}</S.Message>
        </S.ScrollArea>
        <S.ButtonRow>
          <S.CancelButton onClick={onCancel}>Cancel</S.CancelButton>
          <S.DeleteButton onClick={onConfirm}>Delete</S.DeleteButton>
        </S.ButtonRow>
      </S.Card>
    </S.Wrapper>
  )
}
