import { useNavigate } from 'react-router-dom';
import Header from "../components/Header";
import UploadAndDisplayImage from "../components/UploadImage";
import {connect} from "react-redux";
import {getMediaUploadUrl, UploadImagesToS3} from "../store/claimReportReducer";
import "./AccidentVideosPage.css"
import React, {useState} from "react";
const AccidentVideo = (props)=>{

    const navigate = useNavigate();
    const [file, setFile] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);

    const navigateNextScreen = async () => {
        // document.getElementById('accidentbuttons').setAttribute("disabled","disabled");
        for(let i = 0; i < fileObj.length; i++){
            const mediaData = {fileName: fileObj ? fileObj[i].name : '', fileType: "CUSTOMER-PARTY-MEDIA"};
            let link =  await props.getMediaUploadUrl(mediaData);
            let result = await uploadImageToS3(link,file);
        }
        navigate('/towing-facility')
    };

    // get media upload URL
    // const getMediaUploadURL = async (newFile) =>{
    //     setFile([...file,...newFile]);
    // }

    //upload images to s3 bucket
    const uploadImageToS3 = async (link,file) => {
        let result = await props.UploadImagesToS3(link,file);
    }

    var fileObj = [];
    const uploadMultiple = (e) => {
        const newArr = [...fileObj,...e.target.files];
        fileObj= [...newArr];
        setModalOpen(true);
        setFile([...fileObj]);
    }

    return (
        <>
            <Header/>
            <div id="vehicle-container" className="accidentvehicle-container">
                <p id="vehicle-name" className="vehicle-name">Accident Videos</p>
                <p className="vehicle-instruction">Please upload accident videos here</p>
            </div>
            <div className="app-modal-item-container">
                { modalOpen && file.map((image,i)=>(
                    <video
                        style={{margin: '10px'}}
                        key={i}
                        alt="not found"
                        width={"100px"}
                        src={URL.createObjectURL(image)}
                    />
                ))
                }

            </div>
            <input multiple type="file" name="photo" id="photo" accept="video/mp4,video/x-m4v,video/*" capture="environment" className="img-uploadbtn" onChange={(e)=>
                uploadMultiple(e) }/>

            <div id="select-container" className="select-container3">
                <label htmlFor="photo" id="capture-photo" className="option-container1">
                    <span className="take-photo-txt">Take Video</span>
                    <i id="image-capture-icon" className="capture-button-icon fa fa-video-camera"></i>
                </label>
                <div id="option-container" className="option-container" onClick={()=>navigateNextScreen()}>
                    <p className="mybutton-title ">NEXT</p>{props.isLoading && <span className="myspinner"></span>}
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


