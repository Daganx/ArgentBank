import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import SignInForm from "../Features/Auth/SignIn";

export default function SignIn() {
  return (
    <>
      <Navbar />
      <main className="main bg-dark sign-in-page">
        <SignInForm />
      </main>
      <Footer />
    </>
  );
}
