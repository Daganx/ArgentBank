import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import UserHeader from "../components/User-Header/UserHeader";
import UserTransactions from "../components/User-Transactions/UserTransactions";
// COMMENTAIRE

export default function Profile() {
  return (
    <div>
      <Navbar />
      <main className="main bg-dark user-page">
        <UserHeader />
        <UserTransactions />
      </main>
      <Footer />
    </div>
  );
}
