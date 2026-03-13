import ErrorMessage from '#design/ErrorMessage'

export type ErrorFallbackProps = {
  error: unknown
  resetErrorBoundary: () => void
}

/**
 * Error fallback component for the Cats game
 */
export default function ErrorFallback({
  error,
  resetErrorBoundary,
}: ErrorFallbackProps): React.JSX.Element {
  return (
    <ErrorMessage
      title="Failed to Load Cat"
      message={getErrorMessage(error)}
      onRetry={resetErrorBoundary}
    />
  )
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }

  return 'An unexpected error occurred while fetching cat data.'
}
