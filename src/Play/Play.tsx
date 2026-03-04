import { useState } from "react"

import Guesses from "./Guesses"
import Keyboard from "./Keyboard"
import { type State, createState, getLetterState } from "./logic"

const Play: React.FC = () => {
  const [state, setState] = useState<State>(() => createState())

  return (
    <>
      <Guesses
        getState={(letter: string, position: number) =>
          getLetterState(state, letter, position)
        }
      />
      <Keyboard
        getState={(letter: string) => getLetterState(state, letter)}
        onChange={(guess) => setState(state)}
        onSubmit={(guess) => false}
      />
    </>
  )
}

export default Play
