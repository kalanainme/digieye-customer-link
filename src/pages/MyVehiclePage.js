import { useNavigate } from 'react-router-dom';
import Header from "../components/Header";
import UploadAndDisplayImage from "../components/UploadImage";
import { connect } from "react-redux";
import { getMediaUploadUrl, UploadImagesToS3, saveFileKeys } from "../store/claimReportReducer";
import "./MyVehiclePage.css"
import React, { useEffect, useState } from "react";
import "../components/UploadImage.css";

import translations from '../components/translations';
import Upload from 'antd/es/upload/Upload';
import Modal from 'antd/es/modal/Modal';
import { CameraOutlined } from '@ant-design/icons';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import cam from '../cam.png'
import p from '../p.png'
import { ALLOWED_MEDIA_TYPES } from "../constants/constants"


const defaultTheme = createTheme();

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const MyVehiclePage = (props) => {


  const uniqueCode = localStorage.getItem('uniqueCode');
  const tenantId = localStorage.getItem('tenantId');

  const currentLanguage = 'en';

  const navigate = useNavigate();
  const [file, setFile] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [fileKeys, setFileKeys] = useState([]);

  const navigateNextScreen = async () => {

    const fileData = {
      uniqueCode: uniqueCode,
      tenantId: tenantId,
      files: fileKeys
    };

    const result = await props.saveFileKeys(fileData, tenantId);
    if (result) {
      navigate('/other-vehicle');
    }
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

  const removeImage = (deletedFile ) => {
    const availableimages = fileKeys.filter((item) => item.uid !== deletedFile.uid);
    setFileKeys(availableimages);
  };


  const handleUpload = async (file) => {

    const urlData = {
      uniqueCode: uniqueCode,
      tenantId: tenantId,
      mediaType: ALLOWED_MEDIA_TYPES.CustomerVehiclePhoto,
      fileName: file.name,
      mimeType: file.type
    };

    // Get the media upload URL
    const urlResponse = await props.getMediaUploadUrl(urlData, tenantId);
    // setFile([file]);
    setFileKeys(fileKeys => [...fileKeys, { key: urlResponse.key, mimeType: file.type, uid: file.uid}]);
    await props.UploadImagesToS3(file, urlResponse.url);
  }

  const uploadButton = (
    <div style={{ color: "#03537E" }}>
      <img src={cam} />
    </div>
  );

  const navigateBack = () => {
    navigate('/location');

  }

  return (
    <>

      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <Header />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: "white",
              fontFamily: "Inter",
            }}
          >
            <div>
              <Typography component="h1" variant="poster" color="#03537E" fontFamily="Inter">
                {translations.myvechileh1}<img src={p} />
              </Typography>
              <Typography component="h1" color="#03537E" fontFamily="Inter" style={{ fontWeight: 'bold' }}>
                {translations.myvechileh2}
              </Typography>
              <Typography component="h1" gutterBottom color="#757575" style={{ fontFamily: "Inter", fontSize: 14 }}>
                {translations.myvechileh3}
                <p style={{ color: "#757575", fontSize: 12 }}>{translations.myvechileh4}</p>
              </Typography>
            </div>

            <div style={{ maxHeight: '200px', overflowY: 'auto', marginRight: '50px', minWidth: '300px' }}>
              <Upload
                onRemove={removeImage}
                action={handleUpload}
                listType="picture-card"
                onPreview={handlePreview}
              >
                {fileList.length >= 10 ? null : uploadButton}
              </Upload>
            </div>


            <div className="apps">
              <Box display={{ display: 'flex' }} noValidate sx={{ mt: 10 }}>
                <Button
                  type="primary"
                  fullWidth
                  variant="white"
                  style={{ backgroundColor: 'white', borderRadius: '50px', color: '#03537E', fontWeight: 'bold', minWidth: '50px', minHeight: '30px' }}
                  sx={{ mt: 2, mb: 1 }}
                  onClick={navigateBack}

                >
                  {translations.bu2}
                </Button>
                <Button
                  type="primary"
                  fullWidth
                  variant="white"
                  style={{ backgroundColor: '#03537E', borderRadius: '50px', fontWeight: 'bold', minWidth: '200px', minHeight: '30px' }}
                  sx={{ mt: 2, mb: 1 }}
                  onClick={navigateNextScreen}
                >
                  {translations.bu1}
                </Button>
              </Box>
            </div>

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
  return {
    mediaUploadURL: state.claimReport.mediaUploadURL,
    isLoading: state.claimReport.isLoading,
    uploadedImageURLs: state.claimReport.uploadedImageURLs,
    uploadURLData: state.claimReport.uploadURLData

  };
};
export default connect(mapDispatchToProps, {
  getMediaUploadUrl, UploadImagesToS3, saveFileKeys
})(MyVehiclePage);


