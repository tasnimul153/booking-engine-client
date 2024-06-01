import React from "react";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import Reservation from "./Components/Reservation/Reservation";
import SearchPage from "./Components/SearchPage/SearchPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createContext, useState } from "react";
import { FlightDetailsProvider } from "./Components/Contexts/FlightDetailContext";
import Signin from "./Components/Authenticate/Signin";
import Signup from "./Components/Authenticate/Signup";
import About from "./Components/About/About";

export const NearestAirportsListContext = createContext();

function App() {
  const NearestAirportsProvider = ({ children }) => {
    const [NearestAirportsList, setNearestAirportsList] = useState([]);
    return (
      <NearestAirportsListContext.Provider value={[NearestAirportsList, setNearestAirportsList]}>
        {children}
      </NearestAirportsListContext.Provider>
    );
  };
  

  return (
    <NearestAirportsProvider>
      <FlightDetailsProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" exact Component={Home} />
            <Route path="/search" Component={SearchPage} />
            <Route path="/Reservation" Component={Reservation} />
            <Route path="/signin" Component={Signin} />
            <Route path="/signup" Component={Signup} />
            <Route path="/about" Component={About} />
          </Routes>
        </Router>
      </FlightDetailsProvider>
    </NearestAirportsProvider>
  );
}

export default App;
