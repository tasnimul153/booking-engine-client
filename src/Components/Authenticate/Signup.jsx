import React from "react";
import { Link } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
    return (
        <div className="signup-page">
            <div className="signup-container">
                <div className="signup-left">
                    <h1>Sign Up</h1>
                    <p style={{ marginTop: "0px" }}>Please enter your details</p>
                    <form>
                        <div className="namegroup">
                            <div className="input-box-each">
                                <label htmlFor="fName" style={{ marginTop: "7px" }}>First Name <span></span> </label>
                                <input type="text" id="fName" />
                            </div>
                            <div className="input-box-each">
                                <label htmlFor="mName" style={{ marginTop: "10px" }}>Middle Name</label>
                                <input type="text" id="mName" />
                            </div>
                            <div className="input-box-each">
                                <label htmlFor="lName" style={{ marginTop: "10px" }}>Last Name</label>
                                <input type="text" id="lName" />
                            </div>
                        </div>
                        <label htmlFor="contact">Contact</label>
                        <input type="text" id="contact" />
                        <label htmlFor="Country">Country</label>
                        <input type="text" id="Country" />
                        <label htmlFor="email">Email Address</label>
                        <input type="email" id="email" />
                        <div className="passwordgroup">
                            <div className="input-box-each">
                                <label htmlFor="password" style={{ marginTop: "10px" }}>Password</label>
                                <input type="password" id="password" />
                            </div>
                            <div className="input-box-each">
                                <label htmlFor="passwordRe" style={{ marginTop: "10px" }}>Retype Password</label>
                                <input type="password" id="passwordRe" />
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
