import Homepage from "./pages/Homepage"
import { GlobalProvider } from "./contexts/GlobalContext"

export default function App() {

  return (
    <GlobalProvider>
      <Homepage />
    </GlobalProvider>
  )
}






