import Header from "../components/Header";
import "./ThankyouPage.css"
const ThankyouPage = () => {

    return(
        <>
            <Header/>
            <div id="thankyou-container" className="thankyou-container">
                <img className="thank-img" src="/thank-you.png"/>
            </div>

            <div id="thankyou-container" className="thankyou-container">
                <p id="success-msg " className="success-msg ">Successfully Submitted!</p>
                <p className="thankyou-instruction">HNB GL Agent will contact you shortly!</p>
            </div>

            <div id="rate-container" className="rate-container">
                <img className="rate-us" width={150} src="/rate-us1.png"/>
                <p id="rateus-msg " className="rateus-msg ">Rate your experience</p>
                <div id="thumbs-container" className="thumbs-container">
                    {/*<i className="fa fa-solid fa-thumbs-down"></i>*/}
                    <img className="thumbsup-icon" width={40} src="/thumbsup.png"/>
                </div>
                <div id="thumbs-container" className="thumbs-container">
                    <img className="thumbsdown-icon" width={40} src="/thumbsdown.png"/>
                </div>
            </div>
        </>
    )
};

export default ThankyouPage;