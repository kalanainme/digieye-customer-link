import React, { useState } from "react";

const UploadAndDisplayImage = ({imageHandler}) => {

    const fileObj = [];
    const uploadMultiple = (e) => {
        const newArr = [...fileObj,...e.target.files];
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
                type="file"
                name="myImage"
                multiple
                capture
                onChange={(event) => {
                    uploadMultiple(event)
                }}
            />
        </div>
    );
};

export default UploadAndDisplayImage;