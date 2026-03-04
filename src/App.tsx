import { lazy } from "react"
import { Route, Routes } from "react-router"

import AppLayout from "./AppLayout"
import Foo from "./Foo"

const Play = lazy(() => import("./Play"))
const Start = lazy(() => import("./Start"))

const App: React.FC = () => {
  return (
    <Routes>
      <Route Component={AppLayout}>
        <Route index Component={Start} />
        <Route path="/play" Component={Play} />
        <Route path="/foo/:slug" Component={Foo} />
      </Route>
    </Routes>
  )
}

export default App
