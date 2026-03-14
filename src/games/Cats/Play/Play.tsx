import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import Button from '#design/Button'
import Card from '#design/Card'
import GameLeaderboard from '#design/GameLeaderboard'

import { useCat } from '../api'

import CatImage from './CatImage'
import ErrorFallback from './ErrorFallback'
import styles from './Play.module.css'

/**
 * Wrapper component with error boundary and suspense
 */
const Wrapper: React.FC = (): React.JSX.Element => {
  return (
    <div className={styles.container}>
      <ErrorBoundary fallbackRender={ErrorFallback}>
        <Suspense fallback={<LoadingView />}>
          <Play />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}

/**
 * Main play component with data fetching
 */
const Play: React.FC = (): React.JSX.Element => {
  const [cat, { refresh }] = useCat()

  return <PlayView cat={cat} onRefresh={refresh} />
}

/**
 * Presentation component for the Cats game
 */
type PlayViewProps = {
  cat?: {
    id: string
    tags: string[]
    created_at: Date
    url: string
    mimetype: string
  }
  onRefresh?: () => void
}

const PlayView: React.FC<PlayViewProps> = ({
  cat,
  onRefresh,
}): React.JSX.Element => {
  return (
    <Card variant="elevated" className={styles.card}>
      <div className={styles.content}>
        <h1 className={styles.title}>Random Cat Generator</h1>
        <p className={styles.description}>
          Click the button below to generate a random cat image
        </p>

        <CatImage cat={cat} />

        <Button
          variant="primary"
          size="large"
          fullWidth
          onClick={onRefresh}
          disabled={!onRefresh}
          className={styles.button}
        >
          Get New Cat! 🐱
        </Button>

        <GameLeaderboard gameSlug="cats" topN={3} />

        {cat && (
          <div className={styles.metadata}>
            <small>
              Fetched: {cat.created_at.toLocaleDateString()} • ID: {cat.id}
            </small>
          </div>
        )}
      </div>
    </Card>
  )
}

/**
 * Loading view component
 */
const LoadingView: React.FC = (): React.JSX.Element => {
  return (
    <Card variant="elevated" className={styles.card}>
      <div className={styles.content}>
        <h1 className={styles.title}>Random Cat Generator</h1>
        <CatImage isLoading />
        <Button variant="primary" size="large" fullWidth disabled>
          Loading...
        </Button>
      </div>
    </Card>
  )
}

export default Wrapper
