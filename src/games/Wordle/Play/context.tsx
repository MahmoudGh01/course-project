import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

import { createState, submitGuess, type State } from './logic'

/**
 * Context value type for Wordle game
 */
type ContextValue = {
  state: State
  setState: React.Dispatch<React.SetStateAction<State>>
}

/**
 * Props for WordleProvider
 */
export type WordleProviderProps = {
  children: ReactNode
}

/**
 * Return type for useWordleGuess hook
 */
export type WordleGuessActions = {
  guess: string
  updateGuess: (guess: string) => void
  submitGuess: () => void
}

const WordleContext = createContext<ContextValue | undefined>(undefined)

/**
 * Provider component for Wordle game state
 */
export const WordleProvider: React.FC<WordleProviderProps> = ({
  children,
}): React.JSX.Element => {
  const [state, setState] = useState<State>(() => createState())

  const context = useMemo(() => ({ state, setState }), [state])

  return <WordleContext value={context}>{children}</WordleContext>
}

/**
 * Hook to access Wordle game state
 * @throws Error if used outside WordleProvider
 * @returns Current game state
 */
export function useWordle(): State {
  const context = useContext(WordleContext)
  if (!context) {
    throw new Error('useWordle must be used within WordleProvider')
  }

  return context.state
}

/**
 * Hook to access Wordle guess actions
 * @throws Error if used outside WordleProvider
 * @returns Object with guess, updateGuess, and submitGuess functions
 */
export function useWordleGuess(): WordleGuessActions {
  const context = useContext(WordleContext)
  if (!context) {
    throw new Error('useWordleGuess must be used within WordleProvider')
  }

  const updateGuess = useCallback(
    (newGuess: string) => {
      // Only allow letters and limit to word length
      const sanitized = newGuess.toUpperCase().replace(/[^A-Z]/g, '')
      const limited = sanitized.slice(0, context.state.word.length)

      context.setState((state) => ({ ...state, guess: limited }))
    },
    [context],
  )

  const handleSubmitGuess = useCallback(() => {
    const { state } = context

    // Validate guess length
    if (state.guess.length !== state.word.length) {
      return
    }

    // Submit the guess and update state
    const newState = submitGuess(state, state.guess)
    context.setState(newState)
  }, [context])

  return {
    guess: context.state.guess,
    updateGuess,
    submitGuess: handleSubmitGuess,
  }
}
