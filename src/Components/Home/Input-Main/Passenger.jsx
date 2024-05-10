import { React, useState, useEffect } from 'react';
import { useRef } from 'react';
import { MdArrowDropDown } from 'react-icons/md';
import CounterButton from '../Input-Dropdown/CounterButton';
import './passenger.css';

const Passenger = ({ tag, passenger_count, children_count, infant_count, class_type, onSelect }) => {
    const [dropdown, setDropdown] = useState(false);
    const [radioValue, setRadioValue] = useState(class_type);
    const dropdownRef = useRef(null);

    const handleRadioChange = (event) => {
        const newRadioValue = event.target.value;
        setRadioValue(newRadioValue);
        onSelect(passenger_count, children_count, infant_count, newRadioValue);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdown]);

    return (
        <>
            <div className="passengers mainInput" ref={dropdownRef} style={{ position: 'relative' }}>
                <div className="dataBox passengerBox" onClick={() => { setDropdown(!dropdown); }}>
                    <span className='constant-tag'>{tag} <MdArrowDropDown className="icon" id='dropdownArrow' /></span>
                    <span className='number-of-passenger Middle'>{parseInt(passenger_count) + parseInt(children_count) + parseInt(infant_count)} Traveler</span>
                    <span className='class-type Last'>{class_type}</span>
                </div>
                {dropdown && (
                    <div className={`passengerAndClassDropdown ${dropdown ? 'activeDrop' : 'inactiveDrop'}`}>
                        <div className='container'>
                            <div className='radio-inputs'>
                                <label className={`radio ${radioValue === 'ECONOMY' ? 'active-radio' : ''}`}>
                                    <input
                                        type="radio"
                                        name='radio'
                                        value="ECONOMY"
                                        checked={radioValue === "ECONOMY"}
                                        onChange={handleRadioChange}
                                    />
                                    <span className="name">ECONOMY</span>
                                </label>
                                <label className={`radio ${radioValue === 'PREMIUM_ECONOMY' ? 'active-radio' : ''}`}>
                                    <input
                                        type="radio"
                                        name='radio'
                                        value="PREMIUM_ECONOMY"
                                        checked={radioValue === "PREMIUM_ECONOMY"}
                                        onChange={handleRadioChange}
                                    />
                                    <span className="name">PREMIUM_ECONOMY</span>
                                </label>
                                <label className={`radio ${radioValue === 'BUSINESS' ? 'active-radio' : ''}`}>
                                    <input
                                        type="radio"
                                        name='radio'
                                        value="BUSINESS"
                                        checked={radioValue === "BUSINESS"}
                                        onChange={handleRadioChange}
                                    />
                                    <span className="name">BUSINESS</span>
                                </label>
                                <label className={`radio ${radioValue === 'FIRST' ? 'active-radio' : ''}`}>
                                    <input
                                        type="radio"
                                        name='radio'
                                        value="FIRST"
                                        checked={radioValue === "FIRST"}
                                        onChange={handleRadioChange}
                                    />
                                    <span className="name">FIRST</span>
                                </label>
                            </div>
                            <div className='passengerCount' style={{ paddingLeft: '10px' }}>
                                <div className='textContainer'>
                                    <span className='adultsTitle title'>Adult</span>
                                    <span className='info' style={{ marginTop: "-3px" }}>Age 12 or older on date of departure</span>
                                </div>
                                <CounterButton
                                    count={passenger_count}
                                    setCount={(newCount) => onSelect(newCount, children_count, infant_count, class_type)}
                                />
                            </div>
                            <div className='passengerCount infantCount' style={{ marginTop: "10px" }}>
                                <div className='textContainer'>
                                    <span className='childrenTitle title'>Children</span>
                                    <span className='info' style={{ marginLeft: "0px", marginTop: "-3px" }}>Age more than 2 and less than 12</span>
                                </div>
                                <CounterButton
                                    count={children_count}
                                    setCount={(newCount) => onSelect(passenger_count, newCount, infant_count, class_type)}
                                />
                            </div>
                            <div className='passengerCount infantCount' style={{ marginTop: "10px" }}>
                                <div className='textContainer'>
                                    <span className='infantsTitle title'>Infant</span>
                                    <span className='info' style={{ marginLeft: "0px", marginTop: "-3px" }}>Age is less or equal to 2 </span>
                                </div>
                                
                                <CounterButton
                                    count={infant_count}
                                    setCount={(newCount) => onSelect(passenger_count, children_count, newCount, class_type)}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>

        </>
    );
};

export default Passenger;