import { Toaster } from "react-hot-toast";
import Router from "./Router";

const App = () => {
  // const { isSignedIn } = useAuth();

  return (
    <>
      <Router />
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
    </>
  );
};

export default App;
