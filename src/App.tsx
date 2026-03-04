import { useState } from "react"

import Play from "./Play"
import Start from "./Start"

const App: React.FC = () => {
  const [active, setActive] = useState(false)

  if (!active) {
    return (
      <>
        <h1>Wordlish</h1>
        <Start onStart={() => setActive(true)} />
      </>
    )
  }

  return (
    <>
      <h1>Wordlish</h1>
      <Play />
    </>
  )
}

export default App
