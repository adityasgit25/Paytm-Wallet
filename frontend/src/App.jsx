// See this dashboard route will be not hitting the backend, that's one thing to notice when you are creating the app.

// Frontend bna rahe ho toh user ki tarah socho konse konse pages pr jaaoge.

// Backend bana rhe ho then think konse pages hit honge and kya auth, req, res denge.
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Dashboard } from "./pages/Dashboard";
import { SendMoney } from "./pages/SendMoney";
import {PaymentStatus} from "./pages/PaymentStatus";

function App() {
  return (
    <>
       <BrowserRouter>
        <Routes>
        <Route path="/" element={<Signup />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send" element={<SendMoney />} />
          <Route path="/paymentstatus" element={<PaymentStatus />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App