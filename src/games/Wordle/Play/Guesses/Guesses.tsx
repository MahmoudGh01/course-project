import cx from "classnames"

import { useWordle } from "../context"
import { getLetterState } from "../logic"

import styles from "./Guesses.module.css"

const NUM_GUESSES = 6

const Guesses: React.FC = () => {
  const wordle = useWordle()

  return (
    <div className={cx("guesses", styles.guesses)}>
      {Array.from<string>({ length: NUM_GUESSES })
        .fill("     ")
        .map((word, index) => (
          <div key={index} className={styles.row}>
            {word.split("").map((letter, index) => (
              <span
                key={index}
                className={styles.letter}
                style={{
                  background: getLetterState(wordle, letter, index),
                }}
              >
                {letter === " " ? "_" : letter}
              </span>
            ))}
          </div>
        ))}
    </div>
  )
}

export default Guesses
