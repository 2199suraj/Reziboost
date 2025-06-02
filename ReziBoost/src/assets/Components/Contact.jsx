import React, { useState } from "react";
import Swal from "sweetalert2";

import axios from "axios";
export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    function notify(title, text) {
        Swal.fire({
            title: title,    
            text: text,
            icon: "success",
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        try{
            axios.post("http://127.0.0.1:5134/reziboost/feedback", formData).then((res) => {
                console.log(res);
            });

        }catch(error){
            console.log(error);
        }
        notify("Thank You For Your FeedBack", "Your FeedBack has been submitted successfully");
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <div className="container my-5">
            <h2 className="text-center mb-4">Contact Us</h2>
            <div className="row">
                {/* Contact Form */}
                <div className="col-md-6">
                    <div className="p-4 border rounded shadow-sm bg-light">
                        <h4>Send Us a FeedBack</h4>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Your Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Your Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Message</label>
                                <textarea
                                    className="form-control"
                                    name="message"
                                    rows="4"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary w-100">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>

                {/* Contact Info */}
                <div className="col-md-6">
                    <div className="p-4 border rounded shadow-sm bg-white">
                        <h4>Get in Touch</h4>
                        <p className="mb-2">
                            <strong>Email:</strong> <a href="mailto:pratishant86@gmail.com">pratishant86@gmail.com</a>
                        </p>
                        <p className="mb-2">
                            <strong>Phone:</strong> +91 9370655646 <a href="https://wa.me/9370655646" target="_blank" className="btn btn-success">
                                <i className="bi bi-whatsapp"></i> 
                            </a>

                        </p>
                        <p className="mb-2">
                            <strong>Linked In: </strong> <a target="_blank" href="https://www.linkedin.com/in/prashant-shinde-289933261/">Prashant Shinde</a>
                        </p>
                        <p className="mb-2">
                            <strong>PortFolio: </strong> <a target="_blank" href="https://prashant-shinde-pfolio.netlify.app/">Prashant Shinde</a>
                        </p>

                        {/* Social Media Links */}
                        <div className="mt-3">
                            <h5>Follow Us</h5>
                            <a href="https://www.facebook.com/ramesh.waghmare.96930013" target="_blank" className="btn btn-outline-dark me-2">
                                <i className="bi bi-facebook"></i> Facebook
                            </a>
                            <a href="#" className="btn btn-outline-dark me-2">
                                <i className="bi bi-twitter"></i> Twitter
                            </a>
                            <a href="https://www.linkedin.com/in/prashant-shinde-289933261/" target="_blank" className="btn btn-outline-dark">
                                <i className="bi bi-linkedin"></i> LinkedIn
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
