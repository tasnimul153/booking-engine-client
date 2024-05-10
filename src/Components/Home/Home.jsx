import { React, useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineSwap } from 'react-icons/ai';
import { AiOutlineSearch } from 'react-icons/ai';
import Radio from './Input-Main/Radio';
import Location from './Input-Main/Location/Location';
import DatePicker from './Input-Main/DatePicker';
import Passenger from './Input-Main/Passenger';
import './home.css';
import { useSearchInputs } from '../Functions/useSearchInputs';
import { fetchAccessToken } from '../../FetchAPIs';
import { NearestAirportsListContext } from '../../App';
import NearestAirports from './Input-Main/Location/NearestAirports';
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { Link } from 'react-router-dom';

import image2 from '../../Assets/BackgroundHomePage2.jpg';
import image1 from '../../Assets/BackgroundHomePage1.jpg';
import image3 from '../../Assets/BackgroundHomePage3.jpg';
import image4 from '../../Assets/BackgroundHomePage4.jpg';

import dealImg1 from '../../Assets/deals_images/dealImg1.jpg';
import dealImg2 from '../../Assets/deals_images/dealImg2.jpg';
import dealImg3 from '../../Assets/deals_images/dealImg3.jpg';
import dealImg4 from '../../Assets/deals_images/dealImg4.jpg';
import dealImg5 from '../../Assets/deals_images/dealImg5.jpg';
import dealImg6 from '../../Assets/deals_images/dealImg6.jpg';

import mockup from '../../Assets/mockup.png';
import playButton from '../../Assets/playbutton.png';

const Home = () => {

    const [accessToken, setAccessToken] = useState(''); // Set access token
    const [NearestAirportsList, setNearestAirportsList] = useContext(NearestAirportsListContext); // Set nearest airports list
    const [loading, setLoading] = useState(true);
    const [firstDeal, setFirstDeal] = useState(0);
    const [secondDeal, setSecondDeal] = useState(0);
    const [thirdDeal, setThirdDeal] = useState(0);

    const slides = [image2, image3, image1, image4];
    const [moveImageX, setMoveImageX] = useState(0);

    const {
        fromData,
        toData,
        departureDate,
        returnDate,
        passengerAndClass,
        radioValue,
        handleRadioChange,
        handleSelect,
        handleDateSelect,
        handlePassengerAndClassSelect,
        onSwap,
        searchClicked
    } = useSearchInputs();

    // Fetch access token
    useEffect(() => {
        const getTokenFromBackend = async () => {
            try {
                const response = await fetchAccessToken();
                setAccessToken(response);
                console.log(response);
            } catch (error) {
                console.error('Error fetching access token:', error);
            }
        };
        getTokenFromBackend();
    }, []);

    // Get nearest airports
    const nearestAirports = NearestAirports(accessToken);

    const [style, setStyle] = useState("");

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/ticketStyleDefault`)
            .then((response) => response.json())
            .then(data => {
                setStyle(data.css);
                const styleId = 'dynamic-ticket-style';
                let styleSheet = document.getElementById(styleId);

                if (!styleSheet) {
                    // If the style element doesn't exist, create it and append to head
                    styleSheet = document.createElement("style");
                    styleSheet.id = styleId;  // Set an ID for the style element to reference it later
                    document.head.appendChild(styleSheet);
                }

                // Set or replace the content of the style sheet
                styleSheet.innerText = data.css;
                console.log("Styles applied:", data.css);
            })
            .catch((error) => {
                console.error('Error fetching ticket style:', error);
            });
    }, []);

    useEffect(() => {
        if (nearestAirports.length > 0) {
            setNearestAirportsList(nearestAirports);
            console.log("Nearest Airports: ", nearestAirports);
            setLoading(false);
        } else {
            console.log("Fetching API: Failed (Nearest Airports) -- Home.jsx");
        }
    }, [nearestAirports]);

    useEffect(() => {
        const timer = setInterval(() => {

            document.querySelector('.carousel-slider').style.padding = '10px';
            setTimeout(() => {
                document.querySelector('.carousel-slider').style.padding = '0px';
            }, 600);
            setTimeout(() => {
                setMoveImageX((prev) => ((prev) === (slides.length * 100) - 100 ? 0 : prev + 100));
            }, 500);
        }, 15000);
        return () => clearInterval(timer);
    }, []);

    const handleRightArrowClick = () => {
        setMoveImageX((prev) => ((prev) === 0 ? (slides.length - 1) * 100 : prev - 100));
    };

    const handleLeftArrowClick = () => {
        setMoveImageX((prev) => ((prev) === (slides.length * 100) - 100 ? 0 : prev + 100));
    };

    useEffect(() => {
        const fetchFlightOfferDeal = async () => {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);

            const year = tomorrow.getFullYear();
            const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
            const day = String(tomorrow.getDate()).padStart(2, '0');

            const formattedDate = `${year}-${month}-${day}`;
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/flights?origin=${nearestAirports.length > 0 && nearestAirports[0].address.cityCode}&destination=MIA&departDate=${formattedDate}&adults=1&currencyCode=USD&travelClass=ECONOMY`);
                const data = await response.json();
                setFirstDeal(data[0].price.grandTotal);
                //console.log('Flight offer deal:', data);
            } catch (error) {
                console.error('Error fetching flight offer deal:', error);
            }
        }
        if (nearestAirports.length > 0) {
            fetchFlightOfferDeal();
        }
    }, [nearestAirports])

    useEffect(() => {
        const fetchFlightOfferDeal = async () => {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);

            const year = tomorrow.getFullYear();
            const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
            const day = String(tomorrow.getDate()).padStart(2, '0');

            const formattedDate = `${year}-${month}-${day}`;
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/flights?origin=${nearestAirports.length > 0 && nearestAirports[0].address.cityCode}&destination=JFK&departDate=${formattedDate}&adults=1&currencyCode=USD&travelClass=ECONOMY`);
                const data = await response.json();
                setSecondDeal(data[0].price.grandTotal);
                //console.log('Flight offer deal:', data);
            } catch (error) {
                console.error('Error fetching flight offer deal:', error);
            }
        }
        if (nearestAirports.length > 0) {
            fetchFlightOfferDeal();
        }
    }, [nearestAirports])

    useEffect(() => {
        const fetchFlightOfferDeal = async () => {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);

            const year = tomorrow.getFullYear();
            const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
            const day = String(tomorrow.getDate()).padStart(2, '0');

            const formattedDate = `${year}-${month}-${day}`;
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/flights?origin=${nearestAirports.length > 0 && nearestAirports[0].address.cityCode}&destination=SFO&departDate=${formattedDate}&adults=1&currencyCode=USD&travelClass=ECONOMY`);
                const data = await response.json();
                setThirdDeal(data[0].price.grandTotal);
                //console.log('Flight offer deal:', data);
            } catch (error) {
                console.error('Error fetching flight offer deal:', error);
            }
        }
        if (nearestAirports.length > 0) {
            fetchFlightOfferDeal();
        }
    }, [nearestAirports])

    return (
        <>
            <div className='allContainer'>
                <section className='home'>
                    <div className='carousel-slider'>
                        <div className="overlay">
                            <FaChevronLeft className='icon' onClick={handleLeftArrowClick} />
                            <FaChevronRight className='icon' onClick={handleRightArrowClick} />
                        </div>
                        <div className='overlay2'></div>
                        <div className='overlay3'></div>
                        <div className='overlay4'></div>
                        {
                            slides.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    style={{ transform: `translateX(${moveImageX}%) ` }}
                                    alt={`Slide ${index}`}
                                    className={`each-image`}
                                />
                            ))
                        }
                    </div>

                    <div className="homeContent container">
                        <div className="cardDiv">
                            <Radio onRadioChange={handleRadioChange} />
                            <div className="inputBox">
                                <div className='inputFieldBox'>
                                    <AiOutlineSwap className="icon" onClick={onSwap} id='swapIcon' />
                                    <Location
                                        tag='From'
                                        location={fromData.city}
                                        airport={fromData.airport}
                                        airportCode={fromData.airportCode}
                                        onSelect={(city, country, airport, airportCode) => handleSelect('From', city, country, airport, airportCode)}
                                    />
                                </div>
                                <div className='inputFieldBox'>
                                    <Location
                                        tag='To'
                                        location={toData.city}
                                        airport={toData.airport}
                                        airportCode={toData.airportCode}
                                        onSelect={(city, country, airport, airportCode) => handleSelect('To', city, country, airport, airportCode)}
                                    />
                                </div>

                                <DatePicker
                                    tag='Departure'
                                    date={departureDate.date}
                                    day={departureDate.day}
                                    active={true}
                                    onSelect={(date, day) => handleDateSelect('Departure', date, day)}
                                />
                                <DatePicker
                                    tag='Return'
                                    date={returnDate.date}
                                    day={returnDate.day}
                                    active={radioValue === 'oneway' ? false : true}
                                    onSelect={(date, day) => handleDateSelect('Return', date, day)}
                                />

                                <Passenger
                                    tag='Passengers & Class'
                                    passenger_count={passengerAndClass.passenger_count}
                                    children_count={passengerAndClass.children_count}
                                    infant_count={passengerAndClass.infant_count}
                                    class_type={passengerAndClass.class_type}
                                    onSelect={(passenger_count, children_count, infant_count, class_type) => handlePassengerAndClassSelect(passenger_count, children_count, infant_count, class_type)}
                                />
                            </div>
                            <div className='operation-tab'>
                                <div className='important-links'>
                                    <Link to="/">
                                        <p onClick={() => alert("Coming soon")}>See latest deals on our newsletter</p>
                                    </Link>
                                    <Link to="/">
                                        <p onClick={() => alert("Coming soon")}>View baggage fees and allowances</p>
                                    </Link>
                                    <Link to="/">
                                        <p onClick={() => alert("Coming soon")}>Check or update flight status</p>
                                    </Link>
                                </div>
                                <button className='searchBtn' onClick={searchClicked}>
                                    <AiOutlineSearch className="icon" id='searchIcon' />Search
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
                <div className='content-container'>
                    <div className='mobile-app-container'>
                        <div className='text-content'>
                            <h2>Mobile app comming soon</h2>
                            <p>We're excited to announce our upcoming mobile app, currently in development to enhance your experience with our services directly from your mobile device. Offering convenience and a seamless user experience, our app aims to revolutionize how you interact with us. Below is a preview of our app mockup. Stay tuned for the official launch and further updates. Get ready for a new level of engagement with our innovative mobile solution.
                                <Link to="/">
                                    <span style={{
                                        color: 'blue',
                                        cursor: 'pointer'

                                    }} onClick={() => alert("Coming soon")}> Learn more</span>
                                </Link>
                            </p>
                            <img src={playButton} alt="download from playstore, appstore or amazon appstore" />
                        </div>
                        <img src={mockup} alt="Mobile App" />
                    </div>
                    <div className='deals-container'>
                        <h2>Latest deals on A-1 Travel and Tours</h2>
                        <div className='deals'>
                            <div className='deal1 deal'>
                                <img src={dealImg4} alt="" />
                                <h3>Fly to Miami for ${parseInt(firstDeal) === 0 ? 'cheap price' : parseInt(firstDeal)}</h3>
                                <p>Discover Miami's beaches and nightlife with our exclusive one-time offer: fly from {nearestAirports.length == 0 || nearestAirports[0].address.cityName === "MIAMI" ? 'anywhere' : nearestAirports[0].address.cityName} to MIAMI for ${parseInt(firstDeal) === 0 ? 'cheap price' : parseInt(firstDeal)}—book now and embrace the sun.</p>
                                <Link to="/">
                                    <span onClick={() => alert("Coming soon")}>Learn more</span>
                                </Link>
                            </div>
                            <div className='deal2 deal'>
                                <img src={dealImg5} alt="" />
                                <h3>New York Bound for ${parseInt(secondDeal) === 0 ? 'cheap price' : parseInt(secondDeal)}</h3>
                                <p>Explore the Big Apple's iconic sights and vibrant culture with our special offer: fly from {nearestAirports.length == 0 || nearestAirports[0].address.cityName === "NEW YORK" ? 'anywhere' : nearestAirports[0].address.cityName} to NYC for only ${parseInt(secondDeal) === 0 ? 'cheap price' : parseInt(secondDeal)}. Seize this chance to experience New York City like never before.</p>
                                <Link to="/">
                                    <span onClick={() => alert("Coming soon")}>Learn more</span>
                                </Link>
                            </div>
                            <div className='deal3 deal'>
                                <img src={dealImg6} alt="" />
                                <h3>California Dreams for ${parseInt(thirdDeal) === 0 ? 'cheap price' : parseInt(thirdDeal)}</h3>
                                <p>Jet off to the Golden State! Our limited offer lets you fly from {nearestAirports.length == 0 || nearestAirports[0].address.cityName === "SAN FRANCISCO" ? 'anywhere' : nearestAirports[0].address.cityName} to California for just ${parseInt(thirdDeal) === 0 ? 'cheap price' : parseInt(thirdDeal)}. Grab this opportunity to explore California's stunning landscapes and dynamic cities.</p>
                                <Link to="/">
                                    <span onClick={() => alert("Coming soon")}>Learn more</span>
                                </Link>
                            </div>
                        </div>
                        <h2 style={{marginTop: "50px"}}>Your travel getaway</h2>
                        <div className='deals'>
                            <div className='deal1 deal'>
                                <img src={dealImg1} alt="" />
                                <h3>Twilight Getaways</h3>
                                <p>Experience the magic of dusk with special rates on evening flights to tropical paradises. Witness the sky's transformation from the comfort of your seat.</p>
                                <Link to="/">
                                    <span onClick={() => alert("Coming soon")}>Learn more</span>
                                </Link>
                            </div>
                            <div className='deal2 deal'>
                                <img src={dealImg2} alt="" />
                                <h3>Sunny Retreats</h3>
                                <p>Dive into clear skies and sunlit beaches with morning flight deals. Start your day with a splash in paradise without splashing out on fares.</p>
                                <Link to="/">
                                    <span onClick={() => alert("Coming soon")}>Learn more</span>
                                </Link>
                            </div>
                            <div className='deal3 deal'>
                                <img src={dealImg3} alt="" />
                                <h3>Cityscape Adventures</h3>
                                <p>Conquer the city buzz with our urban explorer discounts. Jet off to iconic cities and enjoy the urban tapestry with unbeatable flight offers.</p>
                                <Link to="/">
                                    <span onClick={() => alert("Coming soon")}>Learn more</span>
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
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
            </div>

        </>
    )
};

export default Home;