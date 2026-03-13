import classNames from 'classnames'
import { useCallback } from 'react'

import { useWordle, useWordleGuess } from '../context'
import { getLetterState } from '../logic'

import styles from './Keyboard.module.css'

const keyboard = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACK'],
]

/**
 * Virtual keyboard component for Wordle game
 */
const Keyboard: React.FC = (): React.JSX.Element => {
  const wordle = useWordle()
  const { guess, updateGuess, submitGuess } = useWordleGuess()

  const handleKeyClick = useCallback(
    (key: string) => {
      if (wordle.gameStatus !== 'playing') return

      if (key === 'ENTER') {
        submitGuess()
      } else if (key === 'BACK') {
        updateGuess(guess.slice(0, -1))
      } else {
        updateGuess(guess + key)
      }
    },
    [wordle.gameStatus, guess, updateGuess, submitGuess],
  )

  return (
    <div className={styles.keyboard}>
      {keyboard.map((row, rowIndex) => (
        <div key={rowIndex} className={styles.row}>
          {row.map((key) => {
            const isSpecial = key === 'ENTER' || key === 'BACK'
            const backgroundColor = isSpecial
              ? undefined
              : getLetterState(wordle, key)

            return (
              <button
                key={key}
                className={classNames(styles.key, {
                  [styles.specialKey]: isSpecial,
                  [styles.disabled]: wordle.gameStatus !== 'playing',
                })}
                style={{ backgroundColor }}
                onClick={() => handleKeyClick(key)}
                disabled={wordle.gameStatus !== 'playing'}
                aria-label={key}
              >
                {key}
              </button>
            )
          })}
        </div>
      ))}
    </div>
  )
}

export default Keyboard
