import {useState, useEffect, useContext} from "react";
import { useNavigate } from "react-router-dom";
import { NearestAirportsListContext } from "../../App";

export const useSearchInputs = () => {

    const [NearestAirportsList, setNearestAirportsList] = useContext(NearestAirportsListContext); 

    const [fromData, setFromData] = useState({
        city: 'Dhaka',
        country: 'Bangladesh',
        airport: 'Hazrat Shahjalal Int',
        airportCode: 'DAC'
    });

    const [toData, setToData] = useState({
        city: 'New York',
        country: 'United States',
        airport: 'John F. Kennedy Int',
        airportCode: 'JFK'
    });

    useEffect(() => {
        if (NearestAirportsList.length > 0) {
            setFromData({
                city: NearestAirportsList[0].address.cityName,
                country: NearestAirportsList[0].address.countryName,
                airport: NearestAirportsList[0].name,
                airportCode: NearestAirportsList[0].iataCode
            });
            setToData({
                city: NearestAirportsList[1].address.cityName,
                country: NearestAirportsList[1].address.countryName,
                airport: NearestAirportsList[1].name,
                airportCode: NearestAirportsList[1].iataCode
            });
        }
    }, []);

    const [departureDate, setDepartureDate] = useState({
        date: '16 Aug 23',
        day: 'Monday',
    });

    const [returnDate, setReturnDate] = useState({
        date: '16 Aug 23',
        day: 'Monday',
    });

    const [passengerAndClass, setPassengerAndClass] = useState({
        passenger_count: 1,
        children_count: 0,
        infant_count: 0,
        class_type: 'ECONOMY'
    });

    const [radioValue, setRadioValue] = useState('oneway');

    const navigate = useNavigate();

    // Airport Selection 
    const handleSelect = (tag, city, country, airport, airportCode) => {
        const selectedData = { city, country, airport, airportCode };
        tag === 'From' ? setFromData(selectedData) : setToData(selectedData);
    };

    // Date Selection
    const handleDateSelect = (tag, date, day) => {
        const selectedDate = { date, day };
        tag == 'Departure' ? setDepartureDate(selectedDate) : setReturnDate(selectedDate);
    };

    // Passenger and Class Selection
    const handlePassengerAndClassSelect = (newPassengerCount, newChildrenCount, newInfantCount, newClassType) => {
        setPassengerAndClass({
            passenger_count: newPassengerCount,
            children_count: newChildrenCount,
            infant_count: newInfantCount,
            class_type: newClassType
        });
    };

    // Swap Button
    const onSwap = () => {
        const temp = fromData;
        setFromData(toData);
        setToData(temp);
    };

    // Current date function 
    const getCurrentDate = () => {
        const date = new Date();
        const options = { day: 'numeric', month: 'long', year: '2-digit' };
        return {
            date: date.toLocaleDateString('en-US', options),
            day: date.toLocaleDateString('en-US', { weekday: 'long' })
        };
    };

    // Radio Button
    const handleRadioChange = (radio) => {
        setRadioValue(radio);
        if (radio === 'oneway') {
            setReturnDate({ date: 'N/A', day: '-' });
        } else if(radio === 'roundtrip') {
            setReturnDate({...getCurrentDate()});
        }
    };

    // Set current date
    useEffect(() => {
        setDepartureDate({ ...getCurrentDate()});
        handleRadioChange('oneway');
    }, []);

    const formatDate = (date) => {
        const d = new Date(date);
        let month = "" + (d.getMonth() + 1);
        let day = "" + d.getDate();
        const year = d.getFullYear();

        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;

        return [year, month, day].join("-");
    };

    const fromCountry = fromData.country;
    const fromCity = fromData.city;
    const fromAirport = fromData.airport;
    const fromAirportCode = fromData.airportCode;

    const toCountry = toData.country;
    const toCity = toData.city;
    const toAirport = toData.airport;
    const toAirportCode = toData.airportCode;

    const departureDateExact = departureDate.date;
    const returnDateExact = returnDate.date;
    const departureDay = departureDate.day;
    const returnDay = returnDate.day;

    const passengerCount = passengerAndClass.passenger_count;
    const childrenCount = passengerAndClass.children_count;
    const infantCount = passengerAndClass.infant_count;
    const classType = passengerAndClass.class_type;

    const searchClicked = () => {

        /*const latitude = NearestAirportsList[0].geoCode.latitude;
        const longitude = NearestAirportsList[0].geoCode.longitude;
        let currencyCode = 'USD';
        fetch(`https://api.example.com/reverse-geocoding?lat=${latitude}&lng=${longitude}`)
            .then(response => response.json())
            .then(data => {
                currencyCode = data.currencyCode;
                console.log("Currency Code:", currencyCode);
            })
            .catch(error => {
                console.error('Error fetching currency code:', error);
            });*/

        // Generate currencyCode from country_code

        let currencyCode = 'USD';
        /*fetch(`https://restcountries.com/v3.1/name/US`)
            .then(response => response.json())
            .then(data => {
                currencyCode = data[0].currencies[0].code;
                console.log("Currency Code:", data[0].currencies[0].code);
            })
            .catch(error => {
                console.error('Error fetching currency code:', error);
            });*/
        
        const queryParams = [
            `fromCountry=${fromCountry}`,
            `fromCity=${fromData.city}`,
            `fromAirport=${fromData.airport}`,
            `fromAirportCode=${fromData.airportCode}`,
            
            `toCountry=${toData.country}`,
            `toCity=${toData.city}`,
            `toAirport=${toData.airport}`,
            `toAirportCode=${toData.airportCode}`,

            `departureDateExact=${departureDateExact}`,
            `departureDay=${departureDay}`,
            `returnDateExact=${returnDateExact}`,
            `returnDay=${returnDay}`,

            `passengerCount=${passengerCount}`,
            `childrenCount=${childrenCount}`,
            `infantCount=${infantCount}`,
            `classType=${classType}`,
            `tripType=${radioValue}`, 
            `currencyCode=${currencyCode}`
        ].join('&');

        navigate(`/search?${queryParams}`);
    };


    return {

        setFromData,
        setToData,
        setPassengerAndClass,
        setDepartureDate,
        setReturnDate,
        
        fromData,
        toData,
        departureDate,
        returnDate,
        passengerAndClass,

        radioValue,
        getCurrentDate,
        handleSelect,
        handleDateSelect,
        handlePassengerAndClassSelect,
        onSwap,
        handleRadioChange,
        radioValue, 
        formatDate, 
        searchClicked
    };
};