import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/homePage.js";
import SignIn from "./pages/signIn.js";
import Profile from "./pages/profile.js";
import Footer from "./components/Footer/Footer.js";
import Navbar from "./components/Navbar/Navbar.js";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/profile/:id" element={<Profile />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
