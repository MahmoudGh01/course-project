import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react"

import { checkGuess, createState, type State } from "./logic"

type ContextValue = {
  state: State
  setState: React.Dispatch<React.SetStateAction<State>>
}

const WordleContext = createContext<ContextValue | undefined>(undefined)

export const WordleProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<State>(() => createState())

  const context = useMemo(() => ({ state, setState }), [state])

  return <WordleContext value={context}>{children}</WordleContext>
}

export function useWordle(): State {
  const context = useContext(WordleContext)
  if (!context) throw new Error("Requires WordleContext.")

  return context.state
}

export function useWordleGuess(): {
  guess: string
  updateGuess: (guess: string) => void
  submitGuess: () => void
} {
  const context = useContext(WordleContext)
  if (!context) throw new Error("Requires WordleContext.")

  const updateGuess = useCallback(
    (guess: string) => {
      context.setState((state) => ({ ...state, guess }))
    },
    [context],
  )

  const submitGuess = useCallback(() => {
    if (checkGuess(context.state, context.state.guess)) {
      //
    } else {
      //
    }

    context.setState((state) => ({ ...state, guess: "" }))
  }, [context])

  return {
    guess: context.state.guess,
    updateGuess,
    submitGuess,
  }
}
