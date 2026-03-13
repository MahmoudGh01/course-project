import classNames from 'classnames'

import { useWordle } from '../context'
import { getLetterState } from '../logic'

import styles from './Guesses.module.css'

/**
 * Component displaying the guess grid for Wordle
 */
const Guesses: React.FC = (): React.JSX.Element => {
  const wordle = useWordle()

  // Create array of all guesses including current guess and empty rows
  const rows = Array.from({ length: wordle.maxGuesses }, (_, index) => {
    if (index < wordle.guesses.length) {
      return wordle.guesses[index]
    } else if (
      index === wordle.guesses.length &&
      wordle.gameStatus === 'playing'
    ) {
      // Current guess row
      return wordle.guess.padEnd(wordle.word.length, ' ')
    } else {
      // Empty row
      return ' '.repeat(wordle.word.length)
    }
  })

  return (
    <div className={styles.container}>
      {wordle.gameStatus === 'won' && (
        <div className={classNames(styles.status, styles.won)}>
          🎉 You Won! The word was: {wordle.word}
        </div>
      )}
      {wordle.gameStatus === 'lost' && (
        <div className={classNames(styles.status, styles.lost)}>
          Game Over! The word was: {wordle.word}
        </div>
      )}

      <div className={styles.guesses}>
        {rows.map((row, rowIndex) => {
          const isGuessed = rowIndex < wordle.guesses.length
          const isCurrentGuess =
            rowIndex === wordle.guesses.length &&
            wordle.gameStatus === 'playing'

          return (
            <div key={rowIndex} className={styles.row}>
              {row.split('').map((letter, letterIndex) => {
                const backgroundColor = isGuessed
                  ? getLetterState(wordle, letter, letterIndex)
                  : undefined

                return (
                  <div
                    key={letterIndex}
                    className={classNames(styles.letter, {
                      [styles.filled]: letter !== ' ',
                      [styles.guessed]: isGuessed,
                      [styles.current]: isCurrentGuess,
                    })}
                    style={{ backgroundColor }}
                  >
                    {letter !== ' ' ? letter : ''}
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Guesses
