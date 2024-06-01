import React from "react";
import { Link } from "react-router-dom";
import "./Signin.css";

const Signin = () => {

    return (
        <div className="signin-page">
            <div className="signin-container">
                <div className="signin-left">
                    <h1>Sign In</h1>
                    <p style={{marginTop: "0px"}}>Please enter your details</p>
                    <form>
                        <label htmlFor="email">Email Address</label>
                        <input type="email" id="email" />
                        <label htmlFor="password" style={{marginTop: "10px"}}>Password</label>
                        <input type="password" id="password" />
                        <div className="options">
                            <div style={{
                                width: "102px", 
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}>
                                <input type="checkbox" id="rememberMe" />
                                <label htmlFor="rememberMe" style={{marginTop: "-5px", fontSize: "12px"}}>Remember me</label>
                            </div>
                            <Link to='/forgot' href="/forgot-password">Forgot Password?</Link>
                        </div>
                        <button type="submit">Sign In</button>
                    </form>
                    <p className="footer-text">
                        By creating an account, you agree to our <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>.
                    </p>
                    <p>
                        Don't have an account? <Link to="/signup" style={{color: "#007bff", fontWeight: "bold"}}>Sign Up</Link>
                    </p>
                </div>
                <div className="signin-right">
                    <div className="image-container">
                        <p style={{marginBottom: "-10px", marginTop: "40vh"}}>Seamless work experience</p>
                        <p>Everything you need in one place</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signin;
