import { Suspense, use, useEffect, useState } from "react"
import { ErrorBoundary } from "react-error-boundary"

import { type Cat, getCat } from "../api"

const Wrapper: React.FC = () => {
  return (
    <>
      <ErrorBoundary
        fallbackRender={({ error, resetErrorBoundary }) => (
          <>
            <div>{getErrorMessage(error)}</div>
            <button onClick={() => resetErrorBoundary()}>Retry</button>
          </>
        )}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <Play />
        </Suspense>
      </ErrorBoundary>
    </>
  )
}

const Play: React.FC = () => {
  const [promise, setPromise] = useState<Promise<Cat>>()

  useEffect(() => {
    setPromise(getCat())
  }, [])

  const refresh = () => {
    setPromise(getCat(false))
  }

  const cat = promise && use(promise)
  if (!cat) return null

  return (
    <>
      <div>
        <button onClick={() => refresh()}>Get new Cat!</button>
      </div>

      <img src={cat.url} width="512" />
    </>
  )
}

export default Wrapper

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return `Error: ${error.message}`
  }

  return "Something went wrong."
}
