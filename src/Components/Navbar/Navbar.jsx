import { React, useEffect, useState } from "react";
import "./navbar.css";
import { HiBars3BottomRight } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const [navLink, setNavLink] = useState("navLink");
  const [buttonClass, setButtonClass] = useState("signupButtonHomePage");
  const [logoClass, setLogoClass] = useState("logoHomePage");

  const [active, setActive] = useState("navBar");
  const [navBarBackground, setNavBarBackground] = useState("transparent");
  const [signupButtonClicked, setSignupButtonClicked] = useState(false);
  const [toggleButtonColor, setToggleButtonColor] = useState("black");

  useEffect(() => {
    if (location.pathname === "/") {
    } else {
      if (signupButtonClicked) {
        setNavBarBackground('url("../../Assets/image-from-rawpixel-id-3713064-original.png")');
      } else {
        setNavBarBackground("white");
      }
    }
  }, [location.pathname, signupButtonClicked]);

  // Toggle Navigation Bar
  const showNav = () => {
    if (active === "navBar activeNavBar") {
      setActive("navBar");
    } else {
      setActive("navBar activeNavBar");
    }
  };

  const navigate = useNavigate();

  // Sign Up Button Click
  const onSignupButtonClick = () => {
    navigate('/signup');
  };

  // Sign In Button Click
  const onSignInButtonClick = () => {
    navigate('/signin');
  };

  return (
    <>
      {/* Navigation Bar */}
      <section className="navBarSection" style={{ background: navBarBackground }}>
        <header className="header flex">
          <div className="header-content">
            {/* Company Logo */}
            <div className="logoDiv">
              <Link to='/' className="logo flex" href="#">
                <h1 className={logoClass}>
                  <div className="companyLogo"></div>
                  <p>A-1 TRAVEL AND TOURS</p>
                </h1>
              </Link>
            </div>

            {/* Navigation Bar  */}
            <div className={active}>
              <ul className="navLists flex">
                <li className="navItem">
                  <Link to='/'>
                    <p className={navLink}>HOME</p>
                  </Link>
                </li>
                <li className="navItem">
                  <Link to='/'>
                    <p className={navLink}>SERVICES</p>
                  </Link>
                </li>
                <li className="navItem">
                  <Link to='/about'>
                    <p className={navLink}>ABOUT</p>
                  </Link>
                </li>
              </ul>
            </div>


            <div className="btn-group">
              <button className={buttonClass} id="signInBtn" onClick={onSignInButtonClick}>Sign In</button>
              <button className={buttonClass} id="signUpBtn" onClick={onSignupButtonClick} style={{ marginLeft: "5px" }}>Sign Up</button>
            </div>

            {/* Toggle Navigation Bar */}
            <div className="toggleNavBar" onClick={showNav} >
              <HiBars3BottomRight className="icon" style={{ color: toggleButtonColor }} />
            </div>
          </div>
        </header>
      </section >
    </>
  );
};

export default Navbar;
