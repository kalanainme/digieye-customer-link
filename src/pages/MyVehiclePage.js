import { useNavigate } from 'react-router-dom';
import Header from "../components/Header";
import UploadAndDisplayImage from "../components/UploadImage";
import {connect} from "react-redux";
import {getMediaUploadUrl, UploadImagesToS3} from "../store/claimReportReducer";
import "./MyVehiclePage.css"
import {useState} from "react";
const MyVehiclePage = (props)=>{

    const navigate = useNavigate();
    const [file, setFile] = useState([]);


    const navigateNextScreen = async () => {
        document.getElementById('mybuttons').setAttribute("disabled","disabled");
        for(let i = 0; i < file.length; i++){
            const mediaData = {fileName: file ? file[i].name : '', fileType: "CUSTOMER-PARTY-MEDIA"};
            let link =  await props.getMediaUploadUrl(mediaData);
            let result = await uploadImageToS3(link,file);
        }
        navigate('/other-vehicle');
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
            <div id="myvehicle-container" className="myvehicle-container">
                <p id="vehicle-name " className="vehicle-name ">Damaged to your Vehicle</p>
                <p className="vehicle-instruction">Please upload your damaged vehicle photos here</p>
            </div>

            <div className="myupload-section">
                <UploadAndDisplayImage
                    imageHandler={getMediaUploadURL}
                />
            </div>

            <div id="mybuttons" className="mybuttons">
                <div className="mybutton" onClick={()=>navigateNextScreen()}>
                    <p className="mybutton-title">NEXT</p>{props.isLoading && <span className="myspinner"></span>}
                </div>
            </div>

        </>
    )
};

const mapDispatchToProps = state => {
    return {
        mediaUploadURL: state.claimReport.mediaUploadURL,
        isLoading: state.claimReport.isLoading
    };
};
export default connect(mapDispatchToProps, {
    getMediaUploadUrl,UploadImagesToS3
})(MyVehiclePage);


