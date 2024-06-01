import React from "react";
import Typist from 'react-typist';
import './About.css';

const About = () => {
    return (
        <div className="about-container">
            <div className="about-content">
                <h1>About Us</h1>
                <div className="typist-wrapper">
                    <Typist>
                        <p>
                            A-1 Travels has brought the ultimate comfort in travel 
                            planning for customers for over a decade, making us one 
                            of the leading Travel Agencies in the Nation.
                        </p>
                    </Typist>
                </div>
                <div className="additional-info">
                    <div className="info-block">
                        <h2>Our Mission</h2>
                        <p>To provide seamless and enjoyable travel experiences for our clients.</p>
                    </div>
                    <div className="info-block">
                        <h2>Our Vision</h2>
                        <p>To be the most trusted and innovative travel agency globally.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
