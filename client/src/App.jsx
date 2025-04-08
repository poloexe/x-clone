import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import Sidebar from "./components/common/Sidebar";
import RightPanel from "./components/common/RightPanel";
import Notification from "./pages/notifications/Notification";
import Profile from "./pages/profile/Profile";
import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "./components/common/LoadingSpinner";

function App() {
  const { data: authUser, isLoading } = useQuery({
    queryKey: ["authUser"], // Used to ref queries in diff components
    queryFn: async () => {
      try {
        const res = await fetch("/api/auth/getuser");
        const data = await res.json();

        if (data.error) return null;

        if (!res.ok) throw new Error(data.error || "Something went wrong");
        console.log(data);

        return data;
      } catch (error) {
        console.log(error.message);
        throw error;
      }
    },

    retry: false,
  });

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <>
      <div className="flex max-w-6xl mx-auto">
        {authUser && <Sidebar />}
        <Routes>
          <Route
            path="/"
            element={authUser ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!authUser ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!authUser ? <SignUp /> : <Navigate to="/" />}
          />
          <Route
            path="/notifications"
            element={authUser ? <Notification /> : <Navigate to="login" />}
          />
          <Route
            path="/profile/:username"
            element={authUser ? <Profile /> : <Navigate to="login" />}
          />
        </Routes>
        {authUser && <RightPanel />}
        <Toaster />
      </div>
    </>
  );
}

export default App;
