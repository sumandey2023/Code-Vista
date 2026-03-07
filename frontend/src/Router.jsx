import { Routes, Route, Navigate } from "react-router";
import HomePage from "./Pages/HomePage";
import ProblemPage from "./Pages/ProblemPage";
import { useAuth } from "@clerk/clerk-react";
import Loader from "./components/Loader";

const Router = () => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return <Loader />;
  }
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/problems"
        element={isSignedIn ? <ProblemPage /> : <Navigate to={"/"} />}
      />
    </Routes>
  );
};

export default Router;
