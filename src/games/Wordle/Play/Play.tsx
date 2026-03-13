import Card from '#design/Card'

import { WordleProvider } from './context'
import Guesses from './Guesses'
import Keyboard from './Keyboard'
import styles from './Play.module.css'

/**
 * Main Wordle game component
 */
const Play: React.FC = (): React.JSX.Element => {
  return (
    <WordleProvider>
      <div className={styles.container}>
        <Card variant="elevated" className={styles.card}>
          <div className={styles.content}>
            <h1 className={styles.title}>Wordle</h1>
            <p className={styles.description}>
              Guess the 5-letter word in 6 tries
            </p>

            <Guesses />
            <Keyboard />
          </div>
        </Card>
      </div>
    </WordleProvider>
  )
}

export default Play
