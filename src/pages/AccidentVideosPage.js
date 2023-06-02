import { useNavigate } from 'react-router-dom';
import Header from "../components/Header";
import UploadAndDisplayImage from "../components/UploadImage";
import {connect} from "react-redux";
import {getMediaUploadUrl, UploadImagesToS3} from "../store/claimReportReducer";
import "./AccidentVideosPage.css"
import {useState} from "react";
const AccidentVideo = (props)=>{

    const navigate = useNavigate();
    const [file, setFile] = useState([]);

    const navigateNextScreen = async () => {
        document.getElementById('accidentbuttons').setAttribute("disabled","disabled");
        for(let i = 0; i < file.length; i++){
            const mediaData = {fileName: file ? file[i].name : '', fileType: "CUSTOMER-PARTY-MEDIA"};
            let link =  await props.getMediaUploadUrl(mediaData);
            let result = await uploadImageToS3(link,file);
        }
        navigate('/towing-facility')
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
            <div id="vehicle-container" className="accidentvehicle-container">
                <p id="vehicle-name" className="vehicle-name">Accident Videos</p>
                <p className="vehicle-instruction">Please upload accident videos here</p>
            </div>
            <div className="accidentupload-section">
            <UploadAndDisplayImage
                imageHandler={getMediaUploadURL}
            />
            </div>
            <div id="accidentbuttons" className="accidentbuttons">
                <div className="accidentbutton" onClick={()=>navigateNextScreen()}>
                    <p className="accidentbutton-title">NEXT</p>{props.isLoading && <span className="accidentspinner"></span>}
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
})(AccidentVideo);


