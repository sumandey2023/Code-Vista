import { Routes, Route, Navigate } from "react-router";
import HomePage from "./Pages/HomePage";
import ProblemsPage from "./Pages/ProblemsPage";
import { useAuth } from "@clerk/clerk-react";
import Loader from "./components/Loader";
import Dashboard from "./Pages/Dashboard";
import ProblemPage from "./Pages/ProblemPage";

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
        element={isSignedIn ? <ProblemsPage /> : <Navigate to={"/"} />}
      />
      <Route
        path="/problem/:id"
        element={isSignedIn ? <ProblemPage /> : <Navigate to={"/"} />}
      />
    </Routes>
  );
};

export default Router;
