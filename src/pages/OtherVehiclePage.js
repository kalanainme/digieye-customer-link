import { useNavigate } from 'react-router-dom';
import Header from "../components/Header";
import UploadAndDisplayImage from "../components/UploadImage";
import {connect} from "react-redux";
import {getMediaUploadUrl, UploadImagesToS3} from "../store/claimReportReducer";
import "./OtherVehiclePage.css"
import React, {useEffect, useState} from "react";
const OtherVehicle = (props)=>{

    const navigate = useNavigate();
    const [file, setFile] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        console.log('UpdatedFiles=>', file);
    }, [file]);

    const navigateNextScreen = async () => {
        for(let i = 0; i < file.length; i++){
            const mediaData = {file: file ? file[i].name : '', fileType: "CUSTOMER-PARTY-MEDIA"};
            let link =  await props.getMediaUploadUrl(mediaData);
            let result = await uploadImageToS3(link,file);
        }
        navigate('/driving-license')
    };

    const uploadMultiple = (event) => {
        console.log('NewFile=>', event.target.files);
        setFile([...file, ...event.target.files]);
    };
    //upload images to s3 bucket
    const uploadImageToS3 = async (link,file) => {
        let result = await props.UploadImagesToS3(link,file);
    }
    return (
        <>
            <Header/>
            <div id="" className="othervehicle-container">
                <p id="welcome-name" className="vehicle-name">Damaged to other Vehicle or Object</p>
                <p className="vehicle-instruction">Please upload your damaged vehicle or object photos here</p>
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
            <input multiple type="file" name="photo" id="photo" accept="image/*" capture="environment" className="img-uploadbtn"
                   onChange={(event) => uploadMultiple(event)}

            />

            <div id="select-container" className="select-container1">
                <label htmlFor="photo" id="capture-photo" className="option-container1">
                    <span className="take-photo-txt">Take Photo</span>
                    <i id="image-capture-icon" className="capture-button-icon fa fa-camera"></i>
                </label>
                <div id="option-container" className="option-container" onClick={()=>navigateNextScreen()}>
                    <p className="mybutton-title ">NEXT</p>{props.isLoading && <span className="myspinner"></span>}
                </div>
            </div>

            {/*<div id="otherbuttons" className="otherbuttons">*/}
            {/*    <div className="otherbutton" onClick={()=>navigateNextScreen()}>*/}
            {/*        <p className="otherbutton-title">NEXT</p>{props.isLoading && <span className="otherspinner"></span>}*/}
            {/*    </div>*/}
            {/*</div>*/}

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


