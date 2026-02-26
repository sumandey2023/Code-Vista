import {
  SignedOut,
  SignedIn,
  SignInButton,
  UserButton,
  SignOutButton,
} from "@clerk/clerk-react";
import React from "react";

const App = () => {
  return (
    <>
      <h1>Welcome to Code Vista</h1>
      <SignedOut>
        <SignInButton mode="modal">
          <button>Sign up</button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        {/* <SignOutButton /> */}
        <UserButton />
      </SignedIn>
    </>
  );
};

export default App;
