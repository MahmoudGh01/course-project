export type State = {
  word: string
  guess: string
}

const states = {
  unknown: "#333333",
}

export function createState(): State {
  return {
    word: "dizzy",
    guess: "",
  }
}

export function getLetterState(
  state: State,
  letter: string,
  position?: number,
): string {
  console.log({ state, letter, position })

  return states.unknown
}
