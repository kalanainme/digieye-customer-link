import { useNavigate } from 'react-router-dom';
import Header from "../components/Header";
import UploadAndDisplayImage from "../components/UploadImage";
import {connect} from "react-redux";
import {getMediaUploadUrl, UploadImagesToS3} from "../store/claimReportReducer";
import "./MyVehiclePage.css"
import React, {useEffect, useState} from "react";
import "../components/UploadImage.css"
const MyVehiclePage = (props)=>{

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
        navigate('/other-vehicle');
    };

    const uploadMultiple = (event) => {
        setFile([...file, ...event.target.files]);
    };

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

            <div id="select-container" className="select-container">
                <label htmlFor="photo" id="capture-photo" className="option-container1">
                    <span className="take-photo-txt">Take Photo</span>
                    <i id="image-capture-icon" className="capture-button-icon fa fa-camera"></i>
                </label>
                <div id="option-container" className="option-container" onClick={()=>navigateNextScreen()}>
                    <p className="mybutton-title ">NEXT</p>{props.isLoading && <span className="myspinner"></span>}
                </div>
            </div>

            {/*<div id="mybuttons" className="mybuttons">*/}
            {/*    <div className="mybutton" onClick={()=>navigateNextScreen()}>*/}
            {/*        <p className="mybutton-title">NEXT</p>{props.isLoading && <span className="myspinner"></span>}*/}
            {/*        <p className="mybutton-title">NEXT</p>{props.isLoading && <span className="myspinner"></span>}*/}
            {/*    </div>*/}
            {/*</div>*/}

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


