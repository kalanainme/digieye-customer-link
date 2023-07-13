import { useNavigate } from 'react-router-dom';
import Header from "../components/Header";
import UploadAndDisplayImage from "../components/UploadImage";
import {connect} from "react-redux";
import {getMediaUploadUrl, UploadImagesToS3} from "../store/claimReportReducer";
import "./DrivingLicensePage.css"
import React, {useEffect, useState} from "react";

import translations from '../components/translations';
import Upload from 'antd/es/upload/Upload';
import Modal from 'antd/es/modal/Modal';
import { CameraOutlined} from '@ant-design/icons';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { faClockFour } from '@fortawesome/free-solid-svg-icons';
import dl from '../dl.png'
import cam from '../cam.png'


const defaultTheme = createTheme();

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });



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


    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([
      // Initial file list data
    ]);
    
    const handleCancel = () => setPreviewOpen(false);
    
    const handlePreview = async (file) => {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      setPreviewImage(file.url || file.preview);
      setPreviewOpen(true);
      setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };
    
    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
    
    const uploadButton = (
      <div style={{color:"#03537E"}}>
          <img src={cam}/>
      </div>
    );

    const navigateBack = () => {
      navigate('/other-vehicle');

  }






    return (
        <>
        <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <Header/>
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color:"white",
              fontFamily:"Inter",
            }}
          >
            <div>
            <Typography component="h1" variant="poster" color="#03537E" fontFamily="Inter">
            {translations.dlp1}<img src={dl}/>
            </Typography>
            <Typography component="h1" color="#03537E" fontFamily="Inter" style={{fontWeight:'bold'}}>
            {translations.dlp2}
            </Typography>
            <Typography component="h1" gutterBottom color="#757575" style={{fontFamily:"Inter",fontSize:14}}>
            {translations.dlp3}
            <p style={{color:"#757575",fontSize:12}}>{translations.dlp4}</p>
            </Typography>
            </div>
            {/* <Header/>
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

            </div> */}

<div style={{maxHeight:'200px', overflowY:'scroll',marginRight:'50px',minWidth:'300px'}}>
<Upload
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      listType="picture-card"
      fileList={fileList}
      onPreview={handlePreview}
      onChange={handleChange}
      multiple
    >
      {fileList.length >= 2 ? null : uploadButton}
    </Upload>
    </div>
    
    <div className="apps">
            <Box display={{display:'flex'}} noValidate sx={{ mt: 10 }}>
            <Button
                type="primary"
                fullWidth
                variant="white"
                style={{backgroundColor:'white',borderRadius: '50px' , color:'#03537E',fontWeight: 'bold', minWidth: '50px', minHeight:'30px' }}
                sx={{ mt: 2, mb: 1 }}
                onClick={navigateBack}
            
              >
                {translations.bu2}
              </Button>
              <Button
                type="primary"
                fullWidth
                variant="white"
                style={{backgroundColor:'#03537E',borderRadius: '50px',fontWeight: 'bold', minWidth: '200px', minHeight:'30px'}}
                sx={{ mt: 2, mb: 1 }}
                onClick={navigateNextScreen}
              >
                {translations.bu1}
              </Button>       
            </Box>
            </div>

            {/* <input multiple type="file" name="photo" id="photo" accept="image/*" capture="environment" className="img-uploadbtn" onChange={(e)=>
                uploadMultiple(e) }/>

            <div id="select-container" className="select-container2">
                <label htmlFor="photo" id="capture-photo" className="option-container1">
                    <span className="take-photo-txt">Take Photo</span>
                    <i id="image-capture-icon" className="capture-button-icon fa fa-camera"></i>
                </label>
                <div id="option-container" className="option-container" onClick={()=>navigateNextScreen()}>
                    <p className="mybutton-title ">NEXT</p>{props.isLoading && <span className="drivingspinner"></span>}
                </div>
            </div> */}
            <Modal
      visible={previewOpen}
      title={previewTitle}
      footer={null}
      onCancel={handleCancel}
    >
      <img
        alt="example"
        style={{ width: '100%' }}
        src={previewImage}
      />
    </Modal>

             </Box>
            </Container>
            </ThemeProvider>

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


