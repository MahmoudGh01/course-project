import { Suspense, use, useEffect, useState } from "react"
import { ErrorBoundary } from "react-error-boundary"

type Cat = {
  id: string
  tags: string[]
  created_at: string // TODO
  url: string
  mimetype: string
}

async function getCat(success: boolean = true): Promise<Cat> {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const response = await fetch(
    `https://cataas.com/cat${success ? "" : "-error"}?json=true`,
  )

  if (!response.ok) {
    const text = await response.text()
    throw new Error(`Cannot get cat. ${text}`)
  }

  const data = (await response.json()) as Cat

  return data
}

const Play: React.FC = () => {
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
        <Suspense fallback={<Cat />}>
          <Cat />
        </Suspense>
      </ErrorBoundary>
    </>
  )
}

const Cat: React.FC = () => {
  const [promise, setPromise] = useState<Promise<Cat>>()

  useEffect(() => {
    setPromise(getCat())
  }, [])

  const refresh = () => {
    setPromise(getCat(false))
  }

  const cat = promise && use(promise)

  return (
    <>
      <div>
        <button onClick={() => refresh()}>Refresh</button>
      </div>
      {cat && <img src={cat.url} width="512" />}
    </>
  )
}

export default Play

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return `Error: ${error.message}`
  }

  return "Something went wrong."
}
