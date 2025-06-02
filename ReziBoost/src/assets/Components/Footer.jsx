import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  return (
    <footer className="text-light py-3 w-100 d-flex justify-content-between align-items-center px-4 position-relative" style={{ background: "linear-gradient(135deg, #1e3c72, #2a5298)", boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.2)", marginTop: "auto" }}>
      <div className="d-flex gap-3">
        <a href="https://facebook.com" className="text-light fs-5" target="_blank" rel="noopener noreferrer"><i className="bi bi-facebook"></i></a>
        <a href="https://twitter.com" className="text-light fs-5" target="_blank" rel="noopener noreferrer"><i className="bi bi-twitter"></i></a>
      </div>
      <p className="small mb-0">&copy; {new Date().getFullYear()} ReziBoost. All Rights Reserved.</p>
      <div className="d-flex gap-3">
        <a href="https://linkedin.com" className="text-light fs-5" target="_blank" rel="noopener noreferrer"><i className="bi bi-linkedin"></i></a>
        <a href="https://instagram.com" className="text-light fs-5" target="_blank" rel="noopener noreferrer"><i className="bi bi-instagram"></i></a>
      </div>
    </footer>
  );
};

export default Footer;
