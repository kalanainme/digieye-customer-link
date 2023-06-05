import { useNavigate } from 'react-router-dom';
import Header from "../components/Header";
import UploadAndDisplayImage from "../components/UploadImage";
import {connect} from "react-redux";
import {getMediaUploadUrl, UploadImagesToS3} from "../store/claimReportReducer";
import "./MyVehiclePage.css"
import React, {useState} from "react";
import "../components/UploadImage.css"
const MyVehiclePage = (props)=>{

    const navigate = useNavigate();
    const [file, setFile] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [imageURLS, setImageURLs] = useState([]);


    const navigateNextScreen = async () => {
        for(let i = 0; i < fileObj.length; i++){
            const mediaData = {fileName: fileObj ? fileObj[i].name : '', fileType: "CUSTOMER-PARTY-MEDIA"};
            let link =  await props.getMediaUploadUrl(mediaData);
            let result = await uploadImageToS3(link,file);
        }
        navigate('/other-vehicle');
    };

    // get media upload URL
    const getMediaUploadURL = async (newFile) =>{
        setFile([...file,...newFile]);
        console.log(file)

    }

    var fileObj = [];
    const uploadMultiple = (e) => {
        const newArr = [...fileObj,...e.target.files];
        fileObj= [...newArr];
        console.log(fileObj)
    }

    //upload images to s3 bucket
    const uploadImageToS3 = async (link,file) => {
        let result = await props.UploadImagesToS3(link,file);
    }
// Add doc to  modal
    const addDocToModal = ({ src, file, docId, type }) => {
        try {
            const docElement = type === 'video' ? document.createElement('video') : new Image();
            docElement.setAttribute('id', docId);
            docElement.setAttribute('alt', docId);
            docElement.src = src ? src : '';
            docElement.className = 'app-modal-item-thumb';

            const docDiv = document.createElement('div');
            docDiv.className = 'app-modal-item';
            docDiv.appendChild(docElement);
            docDiv.setAttribute('onclick', `openDocViewModal('${docId}')`);

            const docContainer = document.getElementById(`${type === 'video' ? 'video' : 'photo'}-container`);
            if (docContainer.firstChild) docContainer.insertBefore(docDiv, docContainer.firstChild);
            else docContainer.appendChild(docDiv);

            if (!src && file) {
                const reader = new FileReader();
                reader.onload = rdr => (docElement.src = rdr.target.result);

                reader.readAsDataURL(file);
            }
        } catch (e) {
            console.log('add doc to dom' + e.message);
        }
    }

    return (
        <>
            <Header/>
            <div id="myvehicle-container" className="myvehicle-container">
                <p id="vehicle-name " className="vehicle-name ">Damaged to your Vehicle</p>
                <p className="vehicle-instruction">Please upload your damaged vehicle photos here</p>
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


