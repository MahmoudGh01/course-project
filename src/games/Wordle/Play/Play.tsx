import { WordleProvider } from "./context"
import Guesses from "./Guesses"
import Keyboard from "./Keyboard"

const Play: React.FC = () => {
  return (
    <WordleProvider>
      <Guesses />
      <Keyboard />
    </WordleProvider>
  )
}

export default Play
