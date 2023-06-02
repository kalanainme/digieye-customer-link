import Header from "../components/Header";
import "./LocationPage.css";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {connect} from "react-redux";
import {getMediaUploadUrl, updateLocation, UploadImagesToS3} from "../store/claimReportReducer";

const LocationPage = (props) =>{

    const [locationModalVisible, setLocationModalVisible] = useState(false);
    const [location, setLocation] = useState(false);

    const navigate = useNavigate();
    const openLocationEnableModal = async () => {
        setLocationModalVisible(true);

    };

    const uploadLocation = async (id) =>{
        const locationData = {
            lat: "6.927079",
            long: "79.861244"
        }
        let result = await props.updateLocation(locationData);
        if (result){
            setLocation(true);
            setLocationModalVisible(false);
        }

    }
    const navigateNextScreen = () => {
        navigate('/my-vehicle');

    }
    const closeModal = () => {
        setLocationModalVisible(false);
    }
    return(
        <>
            <Header/>
            <div id="location-welcome-container" className="location-welcome-container">
                {!location &&  <p id="location-heading" className="location-heading">Enable Your Location</p>}
                {!location && <p className="location-subtitle ">Please Enable Your Location</p>}
                {location &&  <p id="location-enabled-heading" className="location-heading">Location Enabled!</p>}
                {location &&  <img className="success-img" width={100} src="/success1.png" />}

            </div>
            <div className="apps">
                {!location && <div className="nxt-btn" onClick={()=>openLocationEnableModal()}>
                    <p className="app-title">LOCATION</p>
                </div>}
                { location && <div className="nxt-btn" onClick={()=>navigateNextScreen()}>
                    <p className="app-title">NEXT</p>
                </div>}
            </div>

            {locationModalVisible &&
            <div id="location-capture" className="hidden">
                <div id="location-capture-modal" className="app-modal">
                    <button id="location-capture-close" className="close" onClick={()=>closeModal()}>
                        <i className="fas fa-times text-lg">X</i>
                    </button>
                    <div id="location-capture-header" className="app-modal-header">
                        <div id="location-capture-details" className="app-modal-details-container">
                            <p id="location-capture-title" className="app-modal-title">Allow Access Location?</p>
                            <p id="location-capture-subtitle" className="app-modal-subtitle">Please pin your location of the
                                incident</p>
                        </div>
                    </div>
                    <button id="location-capture-button" className="capture-button1 w-full">
                        <i className="capture-button-icon fas fa-search-location"></i>
                        {props.isLoading && <span className="location-spinner"></span>}
                        <span className="capture-button-text" onClick={()=>uploadLocation()}>Enable location</span>
                    </button>
                    <div id="map" className="relative h-96 w-full mt-4 rounded shadow-md"></div>
                </div>
                <div className="app-modal-background app-dimension"></div>
            </div>}
        </>
    )

}

const mapDispatchToProps = state => {
    return {
        mediaUploadURL: state.claimReport.mediaUploadURL,
        isLoading: state.claimReport.isLoading
    };
};
export default connect(mapDispatchToProps, {
    updateLocation
})(LocationPage);
