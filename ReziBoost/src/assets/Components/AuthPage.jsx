import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function AuthPage({ type }) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
    const [loader, setLoader] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  function notify(title, text, icon) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoader(true);
    try {
      const url = `http://127.0.0.1:5134/reziboost/${type}`;
      await axios.post(url, formData, { withCredentials: true });
      await axios.get(
        "http://127.0.0.1:5134/reziboost/analytics",
        { withCredentials: true }
      );
      notify("Success", "You have successfully logged in!", "success");
      window.location.href = "/";
      setLoader(false);
    } catch (err) {
      setError(err.response?.data || "Something went wrong");
      notify("Error", "Invalid username or password", "error");
        setLoader(false);
    }
  };

  return (
    <div className="container-fluid custom-gradient">
      {loader && (
        <div className="fullscreen-loader">
        <div className="typewriter">
          <div className="slide">
            <i></i>
          </div>
          <div className="paper"></div>
          <div className="keyboard"></div>
        </div>
        </div>
      )}
      <div className="row h-100">
        {/* Left Section - Project Description */}
        <div className="col-md-6 d-none d-md-flex justify-content-center align-items-center text-dark p-5">
          <div className="text-center">
            <h1 className="display-4 fw-bold mb-4 text-danger">
              <span className="rocket-icon">🚀</span> ReziBoost
            </h1>
            <p className="lead mb-4">
              Your AI-powered resume tailoring solution! ReziBoost helps you
              customize your resume for any job description in seconds. Simply
              upload your resume and the job description, and let our AI do the
              rest.
            </p>
            <p className="mb-4">
              <strong className="text-primary fs-5">Why ReziBoost?</strong>
              <br />
              - Tailor your resume to match job requirements effortlessly.
              <br />
              - AI-powered editing for clarity and impact.
              <br />- Save time and land your dream job faster.
            </p>
            <p className="text-muted">
              Join thousands of users who have transformed their job search with
              ReziBoost!
            </p>

            {/* Call-to-Action Button */}
            <a href="/signup" className="btn btn-primary btn-lg mt-3 fw-bold">
              Get Started Now 🚀
            </a>
          </div>
        </div>

        {/* Right Section - Login/Signup Form */}
        <div className="col-md-6 d-flex justify-content-center align-items-center p-4">
          <div className="card p-4 shadow-lg border-0 form-card">
            <div className="card-body text-center">
              {/* Icon */}
              <div className="mb-4">
                <i className="bi bi-person-circle display-4 text-primary"></i>
              </div>

              {/* Title and Subtitle */}
              <h3 className="card-title mb-3 fw-bold">
                {type === "login" ? "Welcome Back!" : "Join Us!"}
              </h3>
              <p className="card-text text-muted mb-4">
                {type === "login"
                  ? "Log in to continue your journey with us."
                  : "Sign up to unlock exclusive features and opportunities."}
              </p>

              {/* Error Message */}
              {error && <div className="alert alert-danger">{error}</div>}

              {/* Form */}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label fw-medium">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className="form-control form-control-lg"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="form-label fw-medium">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control form-control-lg"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-100 btn-lg mb-3 fw-bold"
                >
                  {type === "login" ? "Login" : "Signup"}
                </button>
              </form>

              {/* Footer Links */}
              <div className="text-center mt-3">
                <p className="text-muted">
                  {type === "login" ? (
                    <>
                      Don't have an account?{" "}
                      <a
                        href="/signup"
                        className="text-decoration-none fw-medium text-primary"
                      >
                        Sign up
                      </a>
                    </>
                  ) : (
                    <>
                      Already have an account?{" "}
                      <a
                        href="/login"
                        className="text-decoration-none fw-medium text-primary"
                      >
                        Log in
                      </a>
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
