import React from 'react';
import './footer.css';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = () => {
    return (
        <div className='footer'>
            <div className='footer-content'>
                <div className='footer-section'>
                    <h3>Company</h3>
                    <ul>
                        <li>About us</li>
                        <li>Press</li>
                        <li>Investors</li>
                        <li>Partners</li>
                        <li>Blog</li>
                    </ul>
                </div>
                <div className='footer-section'>
                    <h3>Support</h3>
                    <ul>
                        <li>Contact us</li>
                        <li>FAQs</li>
                        <li>Privacy policy</li>
                        <li>Terms of use</li>
                        <li>Accessibility</li>
                    </ul>
                </div>
                <div className='footer-section'>
                    <h3>Services</h3>
                    <ul>
                        <li>Flights</li>
                        <li>Hotels</li>
                        <li>Cars</li>
                        <li>Deals</li>
                        <li>Travel guides</li>
                    </ul>
                </div>
                <div className='footer-section'>
                    <h3>Connect</h3>
                    <ul>
                        <li>Facebook</li>
                        <li>Twitter</li>
                        <li>Instagram</li>
                        <li>LinkedIn</li>
                        <li>Youtube</li>
                    </ul>
                </div>
                <div className='footer-section'>
                    <h3>Newsletter</h3>
                    <p>Subscribe to our newsletter for the latest updates on our services, deals, and more.</p>
                    <input type="email" placeholder="Enter your email" />
                    <button onClick={() => alert("Coming Soon")}>Subscribe</button>
                </div>
            </div>
        </div>
    )
}

export default Footer;