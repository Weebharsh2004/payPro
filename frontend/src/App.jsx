import {BrowserRouter, Route, Routes} from "react-router-dom"
import { Signin } from "./pages/Signin"
import { Signup } from "./pages/Signup"
import { Dashboard } from "./pages/Dashboard"
import { SendMoney } from "./pages/SendMoney"
function App() {

  return (
    <div>
        <BrowserRouter>
            <Routes>
              <Route path="/signin" Component={Signin}></Route>
              <Route path="/signup" Component={Signup}></Route>
              <Route path="/dashboard" Component={Dashboard}></Route>
              <Route path="/sendMoney" Component={SendMoney}></Route>
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
