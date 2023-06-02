
import Header from "../components/Header";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import "./TowingFacilityPage.css"
const TowingFacility = () =>{

    const [locationModalVisible, setLocationModalVisible] = useState(false);
    const navigate = useNavigate();
    const openLocationEnableModal = () => {
        setLocationModalVisible(true);
    };

    const navigateThankYouPage = (id) =>{
        setLocationModalVisible(false);
        navigate('/thankyou');

    }
    const closeModal = () => {
        setLocationModalVisible(false);
    }
    return(
        <>
            <Header/>
            <div id="towing-container" className="towing-container">
                <p id="towing-name" className="towing-name">Do you need Towing Facility?</p>
                <img className="towing-img" src="/towing.png"/>

            </div>
            <div id="selection-container" className="selection-container">
                <div id="thumbsup-container" className="thumbsup-container" onClick={()=>navigateThankYouPage()}>
                    <p className="button-title">YES</p>
                </div>
                <div id="thumbsup-container" className="thumbsup-container" onClick={()=>navigateThankYouPage()}>
                    <p className="button-title">NO</p>

                </div>
            </div>

        </>
    )

}
export  default TowingFacility;