import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Banner from "../components/Banner/Banner";
import Features from "../components/Features/Features";
import "../App.css";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <main>
        <Banner />
        <Features />
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
