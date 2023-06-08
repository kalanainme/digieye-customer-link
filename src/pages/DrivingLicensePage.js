import { useNavigate } from 'react-router-dom';
import Header from "../components/Header";
import UploadAndDisplayImage from "../components/UploadImage";
import {connect} from "react-redux";
import {getMediaUploadUrl, UploadImagesToS3} from "../store/claimReportReducer";
import "./DrivingLicensePage.css"
import React, {useEffect, useState} from "react";
const DrivingLicense = (props)=>{

    const navigate = useNavigate();
    const [file, setFile] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
    }, [file]);

    const navigateNextScreen = async () => {
        for(let i = 0; i < file.length; i++){
            const mediaData = {fileName: file ? file[i].name : '', fileType: "CUSTOMER-PARTY-MEDIA"};
            let link =  await props.getMediaUploadUrl(mediaData);
            let result = await uploadImageToS3(link,file);
        }
        navigate('/accident-videos')
    };


    //upload images to s3 bucket
    const uploadImageToS3 = async (link,file) => {
        let result = await props.UploadImagesToS3(link,file);
    }
    const uploadMultiple = (event) => {
        setFile([...file, ...event.target.files]);
        setModalOpen(true);
    };
    return (
        <>
            <Header/>
            <div id="vehicle-container" className="drivinglicense-container">
                <p id="vehicle-name" className="vehicle-name">Driving License Photos</p>
                <p className="vehicle-instruction">Please upload your driving license photos here.</p>
            </div>
            <div className="app-modal-item-container">
                { modalOpen && file.map((image,i)=>(
                    <img
                        style={{margin: '10px'}}
                        key={i}
                        alt="not found"
                        width={"100px"}
                        src={URL.createObjectURL(image)}
                    />
                ))
                }

            </div>
            <input multiple type="file" name="photo" id="photo" accept="image/*" capture="environment" className="img-uploadbtn" onChange={(e)=>
                uploadMultiple(e) }/>

            <div id="select-container" className="select-container2">
                <label htmlFor="photo" id="capture-photo" className="option-container1">
                    <span className="take-photo-txt">Take Photo</span>
                    <i id="image-capture-icon" className="capture-button-icon fa fa-camera"></i>
                </label>
                <div id="option-container" className="option-container" onClick={()=>navigateNextScreen()}>
                    <p className="mybutton-title ">NEXT</p>{props.isLoading && <span className="drivingspinner"></span>}
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
})(DrivingLicense);


