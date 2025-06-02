import React, { use, useEffect, useState } from "react";
import Swal from 'sweetalert2'
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

 

  function checkAuth() {
    axios.get("http://127.0.0.1:5134/reziboost/auth", { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        setLoggedIn(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    checkAuth();
  }, []);
  function notify(title, text) {
    Swal.fire({
      title: title,
      text: text,
      icon: "question"
    });
  }
  useEffect(() => {
    console.log(loggedIn);
  }, [loggedIn]);
  async function handleLogout() {
    try {
      await axios.get("http://127.0.0.1:5134/reziboost/logout", { withCredentials: true });
      notify("Success", "You have successfully logged out!");
      setLoggedIn(false);
      window.location.href = "/login"; // Redirect only after logout is confirmed
    } catch (error) {
      notify("Error", "Logout failed!");
      console.error("Logout Error:", error);
    }
  }


  return (
    <nav className="navbar navbar-expand-lg position-sticky top-0 w-100" style={{
      background: "linear-gradient(135deg, #ff8a00, #da1b60)",
      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
      padding: "10px 20px",
      fontFamily: "Poppins, sans-serif",
      zIndex: "1000",
    }}>
      <div className="container-fluid">
        <a className="navbar-brand" href="#" style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          color: "#fff",
          letterSpacing: "1px",
          transition: "color 0.3s ease-in-out"
        }}>ReziBoost</a>
        <button className="navbar-toggler" type="button" onClick={() => setIsOpen(!isOpen)} data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item"><a className="nav-link" href="/" style={{
              color: "#fff",
              fontSize: "1rem",
              marginRight: "15px",
              transition: "color 0.3s ease-in-out",
            }} onMouseEnter={e => e.target.style.color = "#ffd700"} onMouseLeave={e => e.target.style.color = "#fff"}>Home</a></li>
            <li className="nav-item cursor-pointer"><a className="nav-link" onClick={() => notify("Under Development", "This feature is under development")} style={{
              color: "#fff",
              fontSize: "1rem",
              marginRight: "15px",
              transition: "color 0.3s ease-in-out"
            }} onMouseEnter={e => e.target.style.color = "#ffd700"} onMouseLeave={e => e.target.style.color = "#fff"}>Dashboard</a></li>
            <li className="nav-item"><a className="nav-link" href="/contact" style={{
              color: "#fff",
              fontSize: "1rem",
              marginRight: "15px",
              transition: "color 0.3s ease-in-out"
            }} onMouseEnter={e => e.target.style.color = "#ffd700"} onMouseLeave={e => e.target.style.color = "#fff"}>Contact</a></li>
            <li className="nav-item cursor-pointer">
              <a className="btn"
                onClick={loggedIn ? handleLogout : () => window.location.href = "/login"}
                style={{
                  background: "#ffd700",
                  color: "#000",
                  borderRadius: "30px",
                  padding: "8px 20px",
                  transition: "all 0.3s ease-in-out",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  boxShadow: "0 4px 10px rgba(255, 215, 0, 0.4)"
                }} onMouseEnter={e => { e.target.style.transform = "scale(1.1)"; e.target.style.boxShadow = "0 6px 15px rgba(255, 215, 0, 0.6)"; }} onMouseLeave={e => { e.target.style.transform = "scale(1)"; e.target.style.boxShadow = "0 4px 10px rgba(255, 215, 0, 0.4)"; }}>{loggedIn ? "Logout" : "Login"}</a>
            </li>
          </ul>
        </div>
      </div>
      {/* Dropdown Menu */}
      <div className={`dropdown-menu ${isOpen ? "show" : ""} dropdown-menu-end mt-2`}>
        <a href="/" className="dropdown-item" onClick={() => setIsOpen(false)}>Home</a>
        <a href="/dashboard" className="dropdown-item" onClick={() => setIsOpen(false)}>Dashboard</a>
        <a href="/contact" className="dropdown-item" onClick={() => setIsOpen(false)}>Contact</a>
        <div className="dropdown-divider"></div>
        {loggedIn ? (
          <button className="dropdown-item text-danger" onClick={handleLogout}>Logout</button>
        ) : (
          <a href="/login" className="dropdown-item" onClick={() => setIsOpen(false)}>Login</a>
        )}
      </div>
    </nav>
  );
};

export default Navbar;