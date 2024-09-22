import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "@pages/Login";
import Signup from "@pages/Signup";
import ForgotPassword from "@pages/ForgotPassword";
import Bills from "@pages/Bills";
import Chat from "@pages/Chat";
import Services from "@pages/Services";
import Notifications from "@pages/Notifications";
import Home from "@pages/Home";
import Header from "@components/Header";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/services" element={<Services />} />
        <Route path="/bills" element={<Bills />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="*" element={<Login />} />{" "}
      </Routes>
    </Router>
  );
}

export default App;
