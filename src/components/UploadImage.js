import React, { useState } from "react";
import "./UploadImage.css"
const UploadAndDisplayImage = ({imageHandler}) => {

    const fileObj = [];
    const uploadMultiple = (e) => {
        console.log(e.target.files[0]);
        const newArr = [...fileObj,...e.target.files];
        console.log(newArr)
        imageHandler(newArr);
    }
    return (
        <div>
            {/*{selectedImage && (*/}
            {/*    <div>*/}
            {/*        <img*/}
            {/*            alt="not found"*/}
            {/*            width={"100px"}*/}
            {/*            src={URL.createObjectURL(selectedImage)}*/}
            {/*        />*/}
            {/*        <br />*/}
            {/*        <button onClick={() => setSelectedImage(null)}>Remove</button>*/}
            {/*    </div>*/}
            {/*)}*/}

            <br />
            <br />

            <input
                className="img-uploadbtn"
                name="photo"
                id="photo"
                type="file"
                name="myImage"
                capture="environment"
                onChange={(event) => {
                    uploadMultiple(event)
                }}
            />
            {/*<div id="option-container" className="option-container" onClick={()=> setModalOpen(true)}>*/}
            {/*    <p className="button-title">Take photo</p>*/}
            {/*</div>*/}
            <label htmlFor="photo" id="capture-photo" className="capture-button">
                {/*<i id="image-capture-icon" className="capture-button-icon fas fa-camera"></i>*/}
                <span id="capture-image-button-text" className="capture-button-text">Take A Photo</span>
            </label>
        </div>
    );
};

export default UploadAndDisplayImage;