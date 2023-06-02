import { useNavigate } from 'react-router-dom';
import Header from "../components/Header";
import UploadAndDisplayImage from "../components/UploadImage";
import {connect} from "react-redux";
import {getMediaUploadUrl, UploadImagesToS3} from "../store/claimReportReducer";
import "./OtherVehiclePage.css"
import {useState} from "react";
const OtherVehicle = (props)=>{

    const navigate = useNavigate();
    const [file, setFile] = useState([]);

    const navigateNextScreen = async () => {
        document.getElementById('otherbuttons').setAttribute("disabled","disabled");
        for(let i = 0; i < file.length; i++){
            const mediaData = {fileName: file ? file[i].name : '', fileType: "CUSTOMER-PARTY-MEDIA"};
            let link =  await props.getMediaUploadUrl(mediaData);
            let result = await uploadImageToS3(link,file);
        }
        navigate('/driving-license')
    };

    // get media upload URL
    const getMediaUploadURL = async (newFile) =>{
        setFile([...file,...newFile]);
    }

    //upload images to s3 bucket
    const uploadImageToS3 = async (link,file) => {
        let result = await props.UploadImagesToS3(link,file);
    }
    return (
        <>
            <Header/>
            <div id="" className="vehicle-container">
                <p id="welcome-name" className="vehicle-name">Damaged to other Vehicle or Object</p>
                <p className="vehicle-instruction">Please upload your damaged vehicle or object photos here</p>
            </div>
            <div className="upload-section">
            <UploadAndDisplayImage
                imageHandler={getMediaUploadURL}
            />
            </div>
            <div id="otherbuttons" className="otherbuttons">
                <div className="otherbutton" onClick={()=>navigateNextScreen()}>
                    <p className="otherbutton-title">NEXT</p>{props.isLoading && <span className="otherspinner"></span>}
                </div>
            </div>

        </>
    )
};

const mapDispatchToProps = state => {
    console.log(state.claimReport.mediaUploadURL)
    return {
        mediaUploadURL: state.claimReport.mediaUploadURL,
        isLoading: state.claimReport.isLoading
    };
};
export default connect(mapDispatchToProps, {
    getMediaUploadUrl,UploadImagesToS3
})(OtherVehicle);


