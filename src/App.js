import React from 'react';
import './App.css';
import LanguageSelectionMenu from "./components/LanguageSelectionMenu";
import { Route, Routes } from "react-router-dom"
import LocationPage from "./pages/LocationPage";
import MyVehiclePage from "./pages/MyVehiclePage";
import ThankyouPage from "./pages/ThankyouPage";
import OtherVehiclePage from "./pages/OtherVehiclePage";
import DrivingLicensePage from "./pages/DrivingLicensePage";
import AccidentVideosPage from "./pages/AccidentVideosPage";
import TowingFacility from "./pages/TowingFacilityPage";

function App() {
  return (
    <>
        <Routes>
            <Route path="/" element={<LanguageSelectionMenu />} />
            <Route path="/location" element={<LocationPage />} />
            <Route path="/my-vehicle" element={<MyVehiclePage />} />
            <Route path="/other-vehicle" element={<OtherVehiclePage />} />
            <Route path="/driving-license" element={<DrivingLicensePage />} />
            <Route path="/accident-videos" element={<AccidentVideosPage />} />
            <Route path="/towing-facility" element={<TowingFacility />} />
            <Route path="/thankyou" element={<ThankyouPage />} />

        </Routes>
    </>
  );
}

export default App;
