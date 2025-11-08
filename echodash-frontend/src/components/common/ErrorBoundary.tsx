import { Component, type ErrorInfo, type ReactNode } from "react"
import * as S from "../../styles/Error.styles"

type Props = {
  children: ReactNode
}

type State = {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo)
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined })
    window.location.reload()
  }

  public render() {
    if (this.state.hasError) {
      return (
        <S.ErrorContainer>
          <S.ErrorTitle>Something went wrong</S.ErrorTitle>
          <S.ErrorMessage>
            {this.state.error?.message ?? "An unexpected error occurred"}
          </S.ErrorMessage>
          <S.RetryButton onClick={this.handleRetry}>Try Again</S.RetryButton>
        </S.ErrorContainer>
      )
    }

    return this.props.children
  }
}
