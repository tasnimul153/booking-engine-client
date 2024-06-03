import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
    const [formData, setFormData] = useState({
        fName: "",
        mName: "",
        lName: "",
        contact: "",
        country: "",
        email: "",
        password: "",
        passwordRe: "",
        dob: ""
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        // Here you can add code to send the formData to your backend server
    };

    return (
        <div className="signup-page">
            <div className="signup-container">
                <div className="signup-left">
                    <h1>Sign Up</h1>
                    <p style={{ marginTop: "0px" }}>Please enter your details</p>
                    <form onSubmit={handleSubmit}>
                        <div className="namegroup">
                            <div className="input-box-each">
                                <label htmlFor="fName" style={{ marginTop: "7px" }}>First Name <span></span> </label>
                                <input type="text" id="fName" value={formData.fName} onChange={handleChange} />
                            </div>
                            <div className="input-box-each">
                                <label htmlFor="mName" style={{ marginTop: "10px" }}>Middle Name</label>
                                <input type="text" id="mName" value={formData.mName} onChange={handleChange} />
                            </div>
                            <div className="input-box-each">
                                <label htmlFor="lName" style={{ marginTop: "10px" }}>Last Name</label>
                                <input type="text" id="lName" value={formData.lName} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="passwordgroup">
                            <div className="input-box-each">
                                <label htmlFor="contact">Contact</label>
                                <input type="text" id="contact" value={formData.contact} onChange={handleChange} />
                            </div>
                            <div className="input-box-each">
                                <label htmlFor="country">Country</label>
                                <input type="text" id="country" value={formData.country} onChange={handleChange} />
                            </div>
                        </div>

                        <label htmlFor="email">Email Address</label>
                        <input type="email" id="email" value={formData.email} onChange={handleChange} />
                        <div className="passwordgroup">
                            <div className="input-box-each">
                                <label htmlFor="password">Password</label>
                                <input type="password" id="password" value={formData.password} onChange={handleChange} />
                            </div>
                            <div className="input-box-each">
                                <label htmlFor="passwordRe">Retype Password</label>
                                <input type="password" id="passwordRe" value={formData.passwordRe} onChange={handleChange} />
                            </div>
                            <div className="input-box-each" style={{ marginTop: "-1.5px" }}>
                                <label htmlFor="dob">Date of Birth</label>
                                <input type="date" id="dob" value={formData.dob} onChange={handleChange} />
                            </div>
                        </div>
                        <button type="submit" style={{ marginTop: "30px" }}>Sign Up</button>
                    </form>
                    <p className="footer-text">
                        By creating an account, you agree to our <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>.
                    </p>
                    <p>
                        Have an account? <Link to="/signin" style={{ color: "#007bff", fontWeight: "bold" }}>Sign In</Link>
                    </p>
                </div>
                <div className="signup-right">
                    <div className="image-container">
                        <p style={{ marginBottom: "-10px", marginTop: "40vh" }}></p>
                        <p></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
