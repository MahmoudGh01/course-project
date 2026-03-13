/**
 * Letter state in the Wordle game
 */
export type LetterState = 'correct' | 'present' | 'absent' | 'unknown'

/**
 * Wordle game state
 */
export type State = {
  word: string
  guess: string
  guesses: string[]
  maxGuesses: number
  gameStatus: 'playing' | 'won' | 'lost'
}

/**
 * Color mapping for letter states
 */
const stateColors: Record<LetterState, string> = {
  correct: '#6aaa64',
  present: '#c9b458',
  absent: '#787c7e',
  unknown: '#d3d6da',
}

/**
 * Creates initial Wordle game state
 * @param word - The target word (defaults to 'DIZZY')
 * @returns Initial game state
 */
export function createState(word: string = 'DIZZY'): State {
  return {
    word: word.toUpperCase(),
    guess: '',
    guesses: [],
    maxGuesses: 6,
    gameStatus: 'playing',
  }
}

/**
 * Gets the state of a letter at a specific position or globally
 * @param state - Current game state
 * @param letter - The letter to check
 * @param position - Optional position in the word (0-based)
 * @returns Color code representing the letter state
 */
export function getLetterState(
  state: State,
  letter: string,
  position?: number,
): string {
  const upperLetter = letter.toUpperCase()

  // If position is specified, check for exact match
  if (position !== undefined) {
    if (state.word[position] === upperLetter) {
      return stateColors.correct
    }

    // Check if letter exists in word but wrong position
    if (state.word.includes(upperLetter)) {
      return stateColors.present
    }

    return stateColors.absent
  }

  // Global letter state check across all guesses
  let bestState: LetterState = 'unknown'

  for (const guess of state.guesses) {
    for (let i = 0; i < guess.length; i++) {
      if (guess[i] === upperLetter) {
        if (state.word[i] === upperLetter) {
          return stateColors.correct // Best possible state
        } else if (state.word.includes(upperLetter)) {
          bestState = 'present'
        } else if (bestState === 'unknown') {
          bestState = 'absent'
        }
      }
    }
  }

  return stateColors[bestState]
}

/**
 * Checks if a guess is correct
 * @param state - Current game state
 * @param guess - The guess to check
 * @returns true if the guess matches the word
 */
export function checkGuess(state: State, guess: string): boolean {
  return guess.toUpperCase() === state.word
}

/**
 * Updates game state with a new guess
 * @param state - Current game state
 * @param guess - The submitted guess
 * @returns Updated game state
 */
export function submitGuess(state: State, guess: string): State {
  if (state.gameStatus !== 'playing') {
    return state
  }

  const upperGuess = guess.toUpperCase()
  const newGuesses = [...state.guesses, upperGuess]

  let gameStatus: State['gameStatus'] = 'playing'

  if (checkGuess(state, guess)) {
    gameStatus = 'won'
  } else if (newGuesses.length >= state.maxGuesses) {
    gameStatus = 'lost'
  }

  return {
    ...state,
    guess: '',
    guesses: newGuesses,
    gameStatus,
  }
}
