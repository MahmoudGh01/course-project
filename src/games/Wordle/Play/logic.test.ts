import { describe, it, expect } from 'vitest'

import {
  createState,
  getLetterState,
  checkGuess,
  submitGuess,
  type State,
} from './logic'

describe('Wordle Logic', () => {
  describe('createState', () => {
    it('should create initial state with default word', () => {
      const state = createState()

      expect(state.word).toBe('DIZZY')
      expect(state.guess).toBe('')
      expect(state.guesses).toEqual([])
      expect(state.maxGuesses).toBe(6)
      expect(state.gameStatus).toBe('playing')
    })

    it('should create initial state with custom word', () => {
      const state = createState('HELLO')

      expect(state.word).toBe('HELLO')
      expect(state.guess).toBe('')
      expect(state.guesses).toEqual([])
      expect(state.maxGuesses).toBe(6)
      expect(state.gameStatus).toBe('playing')
    })

    it('should uppercase the word', () => {
      const state = createState('hello')

      expect(state.word).toBe('HELLO')
    })
  })

  describe('getLetterState', () => {
    let state: State

    beforeEach(() => {
      state = createState('HELLO')
      state.guesses = ['WORLD']
    })

    it('should return correct color for correct letter position', () => {
      const color = getLetterState(state, 'L', 2)

      expect(color).toBe('#6aaa64') // correct
    })

    it('should return present color for letter in wrong position', () => {
      const color = getLetterState(state, 'O', 1)

      expect(color).toBe('#c9b458') // present
    })

    it('should return absent color for letter not in word', () => {
      const color = getLetterState(state, 'W', 0)

      expect(color).toBe('#787c7e') // absent
    })

    it('should return unknown color for unguessed letter', () => {
      state.guesses = []
      const color = getLetterState(state, 'H')

      expect(color).toBe('#d3d6da') // unknown
    })

    it('should return correct color globally when letter was guessed correctly', () => {
      const color = getLetterState(state, 'L')

      expect(color).toBe('#6aaa64') // correct
    })
  })

  describe('checkGuess', () => {
    it('should return true for correct guess', () => {
      const state = createState('HELLO')
      const result = checkGuess(state, 'HELLO')

      expect(result).toBe(true)
    })

    it('should return false for incorrect guess', () => {
      const state = createState('HELLO')
      const result = checkGuess(state, 'WORLD')

      expect(result).toBe(false)
    })

    it('should be case insensitive', () => {
      const state = createState('HELLO')
      const result = checkGuess(state, 'hello')

      expect(result).toBe(true)
    })
  })

  describe('submitGuess', () => {
    it('should add guess to guesses array', () => {
      const state = createState('HELLO')
      const newState = submitGuess(state, 'WORLD')

      expect(newState.guesses).toEqual(['WORLD'])
      expect(newState.guess).toBe('')
    })

    it('should set gameStatus to won when guess is correct', () => {
      const state = createState('HELLO')
      const newState = submitGuess(state, 'HELLO')

      expect(newState.gameStatus).toBe('won')
    })

    it('should set gameStatus to lost when max guesses reached', () => {
      let state = createState('HELLO')

      // Make 6 incorrect guesses
      for (let i = 0; i < 6; i++) {
        state = submitGuess(state, 'WRONG')
      }

      expect(state.gameStatus).toBe('lost')
      expect(state.guesses.length).toBe(6)
    })

    it('should not allow guesses after game is won', () => {
      let state = createState('HELLO')
      state = submitGuess(state, 'HELLO')

      const newState = submitGuess(state, 'WORLD')

      expect(newState.guesses.length).toBe(1)
      expect(newState.gameStatus).toBe('won')
    })

    it('should not allow guesses after game is lost', () => {
      let state = createState('HELLO')

      // Make 6 incorrect guesses
      for (let i = 0; i < 6; i++) {
        state = submitGuess(state, 'WRONG')
      }

      const newState = submitGuess(state, 'WORLD')

      expect(newState.guesses.length).toBe(6)
      expect(newState.gameStatus).toBe('lost')
    })

    it('should uppercase the guess', () => {
      const state = createState('HELLO')
      const newState = submitGuess(state, 'world')

      expect(newState.guesses[0]).toBe('WORLD')
    })
  })
})
