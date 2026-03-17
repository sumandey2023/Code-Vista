import { useAuth } from "@clerk/clerk-react";
import { Navigate, Route, Routes } from "react-router";
import Loader from "./components/Loader";
import Dashboard from "./Pages/Dashboard";
import HomePage from "./Pages/HomePage";
import ProblemPage from "./Pages/ProblemPage";
import ProblemsPage from "./Pages/ProblemsPage";
import SessionPage from "./Pages/SessionPage";

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
      <Route
        path="/session/:id"
        element={isSignedIn ? <SessionPage /> : <Navigate to={"/"} />}
      />
    </Routes>
  );
};

export default Router;
