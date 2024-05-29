import React, { useContext, useEffect, useState } from "react";
import { MdFlight } from "react-icons/md";
import { FaSuitcaseRolling } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FlightDetailsContext } from "../Contexts/FlightDetailContext";
import { fetchAccessToken } from "../../FetchAPIs";
import { FaAngleRight } from "react-icons/fa";
import { GiWeight } from "react-icons/gi";
import { MdOutlineAirlineSeatReclineExtra } from "react-icons/md";
import { MdFlightClass } from "react-icons/md";
import { MdEventSeat } from "react-icons/md";
import axios from "axios";


const Flight = ({ flight, isFirst, currencyCode, dictionaries, passengerAndClass }) => {

    const navigate = useNavigate();
    const [isExpended, setIsExpended] = useState(false);

    const { metaData, setMetaData } = useContext(FlightDetailsContext);
    const [fetchComplete, setFetchComplete] = useState(false);

    const jsonPayloadFlightOffers = {
        data: {
            type: 'flight-offers-pricing',
            flightOffers: [flight]
        }
    };

    const parseDuration = (duration) => {
        const match = duration.match(/PT(\d+H)?(\d+M)?/); // matches PT#H#M
        const hours = match[1] ? parseInt(match[1]) : 0; // gets hours if present, otherwise 0
        const minutes = match[2] ? parseInt(match[2]) : 0; // gets minutes if present, otherwise 0
        return hours * 60 + minutes; // returns duration in minutes
    };

    const handleFlightDetailSelect = () => {
        setIsExpended(!isExpended);
        console.log(isExpended);
    }

    const getTokenFromBackend = async () => {
        try {
            const response = await fetchAccessToken();
            console.log(`Flight AccessToken: ${response}`);
            return response; // Return the token
        } catch (error) {
            console.error('Error fetching access token:', error);
            return ''; // Return empty string in case of error
        }
    };

    const fetchFlightOffers = async (token) => {
        setFetchComplete(false);
        try {
            if (token) {
                const response = await axios.post(
                    'https://test.api.amadeus.com/v1/shopping/flight-offers/pricing',
                    jsonPayloadFlightOffers,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                console.log(`Reservations Pricing: ${JSON.stringify(response.data)}`);
                setFetchComplete(true);
                return response.data;
            }
        } catch (error) {
            console.error('Error fetching flight offers:', error);
        } finally {
            console.log();
        }
    };

    const handleFlightSelectButton = async () => {

        //delete flight.lastTicketingDateTime; 

        const token = await getTokenFromBackend();
        const flightOffers = await fetchFlightOffers(token);

        setMetaData({
            flight: flightOffers,
            dictionary: dictionaries
        });
    }

    useEffect(() => {
        const navigateToReservation = async () => {
            if (fetchComplete) {
                navigate(`/Reservation?${[]}`);
            }
        }
        navigateToReservation();
    }, [fetchComplete]);

    function getCurrencySymbol(currencyCode, locale = 'en-US') {
        // Create a NumberFormat object for the given locale and currency.
        const formatter = new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currencyCode,
            // Setting minimumFractionDigits to 0 to avoid decimals in the output
            minimumFractionDigits: 0,
        });

        // Format a small number to extract the currency symbol
        const formatted = formatter.format(0);

        // Extract and return the currency symbol from the formatted string
        // The method of extraction can vary depending on the locale and the format; this is a simple approach
        const match = formatted.match(/[^\d\s.,-]+/);
        return match ? match[0] : currencyCode; // Return the currency code as a fallback
    }

    const currencySymbol = getCurrencySymbol(currencyCode);

    return (
        <div className="flight">
            <div className="carrier-info">
                <div className="carriers">
                    {
                        flight.itineraries[0].segments.map((segment, index) => {
                            // put flight carrierCode and id in hash map
                            const carrierCode = segment.carrierCode;
                            const carrierName = dictionaries.carriers[carrierCode];

                            return (
                                <div key={segment.id} className="each-carrier">
                                    <div className="carrier-company">
                                        <div className="carrier-logo">
                                            <img src={`https://images.kiwi.com/airlines/64/${carrierCode}.png`} alt="AF" />
                                        </div>
                                        <div className="carrier-name">{carrierName}</div>
                                    </div>
                                    <p className="carrier-model">{dictionaries.aircraft[segment.aircraft.code]}</p>
                                </div>
                            );
                        })
                    }
                </div>
                <div className="pricing">
                    <span className="price-currency">{currencySymbol}</span>
                    <span className="price">{Math.floor(flight.price.grandTotal)}</span>
                </div>
            </div>

            {/** Flight facilites information*/}
            <div className="facilities-info">
                <div className="left-facilities">
                    <div className="checked-bags">
                        <FaSuitcaseRolling className="icon" />CHECKED {
                            flight.travelerPricings[0].fareDetailsBySegment[0].includedCheckedBags.quantity
                        } {
                            flight.travelerPricings[0].fareDetailsBySegment[0].includedCheckedBags.weight &&
                            `(${flight.travelerPricings[0].fareDetailsBySegment[0].includedCheckedBags.weight}
                                            ${flight.travelerPricings[0].fareDetailsBySegment[0].includedCheckedBags.weightUnit})`
                        }
                    </div>
                    <div className="dot-gray"></div>
                    {
                        flight.itineraries[0].segments.length - 1 > 0 ?
                            <div className="layover-count">
                                {`${flight.itineraries[0].segments.length - 1} Layover`}
                            </div> : <div className="layover-count">DIRECT</div>
                    }
                </div>
                <div className="right-facilities">
                    {
                        // if all fareDetailsBySegment have same cabin class

                        flight.itineraries[0].segments.every((segment, index) => {
                            return flight.travelerPricings[0].fareDetailsBySegment[index].cabin === flight.travelerPricings[0].fareDetailsBySegment[0].cabin;
                        }) ? flight.travelerPricings[0].fareDetailsBySegment[0].cabin :
                            // print all cabin classes but filter duplicates
                            flight.itineraries[0].segments.map((segment, index) => {
                                return flight.travelerPricings[0].fareDetailsBySegment[index].cabin;
                            }).filter((value, index, self) => {
                                return self.indexOf(value) === index;
                            }).join(' - ')

                    }
                    {isFirst && <p className="cheap-indicator">Cheapest </p>}

                </div>
            </div>
            {
                flight.itineraries.map((itinerary, index) => {
                    return (
                        <div className="itineraries-data" key={index}>
                            <div className="left-iti">
                                <span className="departure-airport">{itinerary.segments[0].departure.iataCode}</span>
                                <span className="departure-date">
                                    {`
                        ${new Date(itinerary.segments[0].departure.at).getDate()}
                        ${new Date(itinerary.segments[0].departure.at).toLocaleString('default', { month: 'short' })}, 
                        ${new Date(itinerary.segments[0].departure.at).getFullYear()}
                        `
                                    }
                                </span>
                                <span className="departure-time">
                                    {
                                        new Date(itinerary.segments[0].departure.at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
                                    }
                                </span>
                            </div>
                            <div className="middle-iti">
                                <div className="visual-flight-meta-data">
                                    <div className="line">
                                        <MdFlight className="icon" />
                                    </div>
                                </div>
                                <div className="total-flight-duration">
                                    {
                                        itinerary.duration.split('T')[1].split('H')[0] + ` H` + ' ' + itinerary.duration.split('T')[1].split('H')[1].split('M')[0] + ` M`
                                    }
                                </div>
                            </div>
                            <div className="right-iti">
                                <span className="departure-airport">{itinerary.segments[itinerary.segments.length - 1].arrival.iataCode}</span>
                                <span className="departure-date">
                                    {
                                        `
                                               ${new Date(itinerary.segments[itinerary.segments.length - 1].arrival.at).getDate()}
                                               ${new Date(itinerary.segments[itinerary.segments.length - 1].arrival.at).toLocaleString('default', { month: 'short' })}, 
                                               ${new Date(itinerary.segments[itinerary.segments.length - 1].arrival.at).getFullYear()}
                                            `
                                    }
                                </span>
                                <span className="departure-time">
                                    {
                                        new Date(itinerary.segments[itinerary.segments.length - 1].arrival.at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
                                    }
                                </span>
                            </div>
                        </div>
                    );
                })
            }
            {
                isExpended &&
                <div className="details">
                    {
                        flight.itineraries.map((itinerary, index) => {
                            return (
                                itinerary.segments.map((segment, index) => {
                                    const carrierCode = segment.carrierCode;
                                    const carrierName = dictionaries.carriers[carrierCode];
                                    return (
                                        <div key={index} style={{ border: "none", padding: 0, margin: 0 }}>
                                            <div className="carrier-detail">
                                                <div className="each-carrier">
                                                    <div className="company">
                                                        <div className="logo">
                                                            <img src={`https://images.kiwi.com/airlines/64/${carrierCode}.png`} alt="AF" />
                                                        </div>
                                                        <div className="name">{carrierName}</div>
                                                    </div>
                                                    <p className="model">{dictionaries.aircraft[segment.aircraft.code]}</p>
                                                </div>
                                                <div className="travel-date">
                                                    {`${new Date(segment.departure.at).toLocaleString('default', { weekday: 'long' }).toUpperCase()}`}
                                                    <FaAngleRight className="icon" />
                                                    {`${new Date(segment.departure.at).getDate()}
                                                    ${new Date(segment.departure.at).toLocaleString('default', { month: 'short' }).toUpperCase()},
                                                    ${new Date(segment.departure.at).getFullYear()}`}
                                                </div>
                                            </div>
                                            <div className="travel-detail">
                                                <div className="departure demographic">
                                                    <span className="airport-code">{segment.departure.iataCode}</span>
                                                    <span className="terminal">Terminal {segment.departure.terminal}</span>
                                                    <span className="departure-date">
                                                        {
                                                            `
                                                        ${new Date(segment.departure.at).getDate()}
                                                        ${new Date(segment.departure.at).toLocaleString('default', { month: 'short' })}, 
                                                        ${new Date(segment.departure.at).getFullYear()}
                                                        `
                                                        }
                                                    </span>
                                                    <span className="departure-time">
                                                        {
                                                            new Date(segment.departure.at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
                                                        }
                                                    </span>
                                                </div>
                                                <div className="visual">
                                                    <div className="visualContainer">
                                                        <MdFlight className="icon" />
                                                        <div className="lineJourney"></div>
                                                        <div className="travel-time">{
                                                            segment.duration.split('T')[1].split('H')[0] + ` H` + ' ' + segment.duration.split('T')[1].split('H')[1].split('M')[0] + ` M`

                                                        }</div>
                                                    </div>
                                                </div>
                                                <div className="arrival demographic">
                                                    <span className="airport-code">{segment.arrival.iataCode}</span>
                                                    <span className="terminal">Terminal {segment.arrival.terminal}</span>
                                                    <span className="departure-date">
                                                        {
                                                            `
                                                        ${new Date(segment.arrival.at).getDate()}
                                                        ${new Date(segment.arrival.at).toLocaleString('default', { month: 'short' })}, 
                                                        ${new Date(segment.arrival.at).getFullYear()}
                                                        `
                                                        }
                                                    </span>
                                                    <span className="departure-time">
                                                        {
                                                            new Date(segment.arrival.at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
                                                        }
                                                    </span>
                                                </div>
                                                <div className="fareDetailsBySegment">
                                                    <div className="item">
                                                        <div style={{ display: "flex", flexDirection: "row" }}>
                                                            <FaSuitcaseRolling className="icon" />
                                                            <p style={{ marginLeft: "5px" }}>CHECK BAGS</p>
                                                        </div>
                                                        <p className="quantity"> {flight.travelerPricings[0].fareDetailsBySegment[index].includedCheckedBags.quantity}</p>
                                                    </div>
                                                    <div className="item">
                                                        <div style={{ display: "flex", flexDirection: "row" }}>
                                                            <GiWeight className="icon" />
                                                            <p style={{ marginLeft: "5px" }}>CHECK BAG WEIGHT</p>
                                                        </div>
                                                        <p className="quantity"> {flight.travelerPricings[0].fareDetailsBySegment[index].includedCheckedBags.weight ? flight.travelerPricings[0].fareDetailsBySegment[index].includedCheckedBags.weight + ' ' + flight.travelerPricings[0].fareDetailsBySegment[index].includedCheckedBags.weightUnit : '-'}</p>
                                                    </div>
                                                    <div className="item">
                                                        <div style={{ display: "flex", flexDirection: "row" }}>
                                                            <MdOutlineAirlineSeatReclineExtra />
                                                            <p style={{ marginLeft: "5px" }}>CABIN</p>
                                                        </div>
                                                        <p className="quantity"> {flight.travelerPricings[0].fareDetailsBySegment[index].cabin}</p>
                                                    </div>
                                                    <div className="item">
                                                        <div style={{ display: "flex", flexDirection: "row" }}>
                                                            <MdFlightClass />
                                                            <p style={{ marginLeft: "5px" }}>CLASS</p>
                                                        </div>
                                                        <p className="quantity"> {flight.travelerPricings[0].fareDetailsBySegment[index].class}</p>
                                                    </div>
                                                    <div className="item">
                                                        <div style={{ display: "flex", flexDirection: "row" }}>
                                                            <MdEventSeat />
                                                            <p style={{ marginLeft: "5px" }}>FARE BASIS</p>
                                                        </div>
                                                        <p className="quantity"> {flight.travelerPricings[0].fareDetailsBySegment[index].fareBasis}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="layover-details">
                                                {
                                                    index !== itinerary.segments.length - 1 &&
                                                    <div className="layover">
                                                        <div className="layover-title">LAYOVER
                                                            <span className="layover-duration">
                                                                {
                                                                    index !== itinerary.segments.length - 1 && (() => {
                                                                        const layoverDuration = new Date(itinerary.segments[index + 1].departure.at).getTime() - new Date(segment.arrival.at).getTime();
                                                                        if (layoverDuration > 0) {
                                                                            const hours = Math.floor(layoverDuration / (1000 * 60 * 60));
                                                                            const minutes = Math.floor((layoverDuration % (1000 * 60 * 60)) / (1000 * 60));
                                                                            const formattedDuration = `${hours}H ${minutes}M`;
                                                                            return formattedDuration;
                                                                        }
                                                                        return null;
                                                                    })()
                                                                }
                                                            </span>
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    );
                                })
                            );
                        })
                    }
                </div>
            }

            <div className="operation-buttons">
                <div className="flight-detail-button operation-button" onClick={handleFlightDetailSelect}>
                    <span>Flight Details</span>
                </div>
                <div className="select-button" onClick={handleFlightSelectButton}>
                    SELECT
                </div>
            </div>
        </div>
    );
}

export default Flight;