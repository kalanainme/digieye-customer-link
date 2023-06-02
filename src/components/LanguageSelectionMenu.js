import Header from "./Header";
import "./LanguageSelectionMenu.css"
import { useNavigate } from 'react-router-dom';
import {connect} from "react-redux";
import {getCustomerLink} from "../store/claimReportReducer";
import {useEffect} from "react";

const LanguageSelectionMenu = (props) => {

    const navigate = useNavigate();
    const openLocationScreen = () => {
        navigate('/location');
    };
    useEffect(() => {
        generateLink();
    }, [])

    const generateLink = async () => {
        const body = {
            "app": "digieye",
            "userId": 123123
        }
       await props.getCustomerLink(body);
    }
    return(
        <>

            <Header/>
            <div id="welcome-container" className="welcome-container">
                <p id="welcome" className="welcome">Ayubowan!</p>
                <p className="welcome-sub">Welcome to DigiEye Claim Report</p>
                <p className="welcome-instruc">Please select your preferred language.</p>
            </div>
            <div className="apps">
                <div className="lang-btn" onClick={()=>openLocationScreen()}>
                    <p className="app-title">SINHALA</p>
                    {/*<button className="language-btn">SINHALA</button>*/}
                </div>
                <div className="lang-btn" onClick={()=>openLocationScreen()}>
                    <p className="app-title">TAMIL</p>

                    {/*<button className="language-btn">TAMIL</button>*/}
                </div>
                <div className="lang-btn" onClick={()=>openLocationScreen()}>
                    <p className="app-title">ENGLISH</p>

                    {/*<button className="language-btn">ENGLISH</button>*/}
                </div>
            </div>
        </>

    )
}

const mapDispatchToProps = state => {
    return {
        hashToken: state.claimReport.hashToken,
        isLoading: state.claimReport.isLoading
    };
};
export default connect(mapDispatchToProps, {
    getCustomerLink
})(LanguageSelectionMenu);
