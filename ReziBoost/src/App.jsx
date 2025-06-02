import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Resume from "./assets/Components/Resume";
import "./App.css";
import HomePage from "./assets/Components/HomePage";
import Navbar from "./assets/Components/NavBar";
import Footer from "./assets/Components/Footer";
import Contact from "./assets/Components/Contact";
import AuthPage from "./assets/Components/AuthPage";

function App() {
  // const [rendered, setRendered] = useState("/");

  const [printing, setPrinting] = useState(false);

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100 w-screen">
        {!printing && <Navbar />}
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/resume"
              element={<Resume printstat={setPrinting} stat={printing} />}
            />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<AuthPage type="login" />} />
            <Route path="/signup" element={<AuthPage type="signup" />} />
          </Routes>
          {/* {rendered === "/" && <HomePage setPage={setRendered}/>}
        {rendered === "/resume" && <Resume printstat={setPrinting} />}
        {rendered === "/contact" &&
          <Contact />
        } */}
        </main>
        {!printing && <Footer />}
      </div>
    </Router>
  );
}

export default App;
