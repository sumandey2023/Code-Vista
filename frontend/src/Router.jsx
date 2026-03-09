import { Routes, Route, Navigate } from "react-router";
import HomePage from "./Pages/HomePage";
import ProblemPage from "./Pages/ProblemPage";
import { useAuth } from "@clerk/clerk-react";
import Loader from "./components/Loader";
import Dashboard from "./Pages/Dashboard";

const Router = () => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return <Loader />;
  }
  return (
    <Routes>
      <Route
        path="/"
        element={!isSignedIn ? <HomePage /> : <Navigate to={"/dashboard"} />}
      />
      <Route
        path="/dashboard"
        element={isSignedIn ? <Dashboard /> : <Navigate to={"/"} />}
      />
      <Route
        path="/problems"
        element={isSignedIn ? <ProblemPage /> : <Navigate to={"/"} />}
      />
    </Routes>
  );
};

export default Router;
