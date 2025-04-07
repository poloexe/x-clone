import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import Sidebar from "./components/common/Sidebar";
import RightPanel from "./components/common/RightPanel";
import Notification from "./pages/notifications/Notification";
import Profile from "./pages/profile/Profile";

function App() {
  return (
    <>
      <div className="flex max-w-6xl mx-auto">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/notifications" element={<Notification />} />
          <Route path="/profile/:username" element={<Profile />} />
        </Routes>
        <RightPanel />
      </div>
    </>
  );
}

export default App;
