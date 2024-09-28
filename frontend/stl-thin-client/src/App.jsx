import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "@pages/Login";
import Signup from "@pages/Signup";
import ChangePassword from "@pages/ChangePassword";
import Bills from "@pages/Bills";
import Chat from "@pages/Chat";
import Services from "@pages/Services";
import Notifications from "@pages/Notifications";
import Home from "@pages/Home";
import Header from "@components/Header";
import { useState } from "react";

function App() {
  const [hasNewNotifications, setHasNewNotifications] = useState(false);
  const [viewNotificationCount, setViewNotificationCount] = useState(0);

  return (
    <Router>
      <Header
        hasNewNotifications={hasNewNotifications}
        viewNotificationCount={viewNotificationCount}
        setHasNewNotifications={setHasNewNotifications}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/services" element={<Services />} />
        <Route path="/bills" element={<Bills />} />
        <Route
          path="/notifications"
          element={
            <Notifications
              setHasNewNotifications={setHasNewNotifications}
              setViewNotificationCount={setViewNotificationCount}
            />
          }
        />
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
