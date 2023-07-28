import Header from "../components/Header";
import "./ThankyouPage.css";

import translations from '../components/translations';

import React, { useEffect, useState } from "react";
import Upload from 'antd/es/upload/Upload';
import Modal from 'antd/es/modal/Modal';
import { CameraOutlined } from '@ant-design/icons';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { faClockFour } from '@fortawesome/free-solid-svg-icons';
import sucess from '../sucess.png'
import cross from '../cross.png'
import Rating from '@mui/material/Rating';


const defaultTheme = createTheme();
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '300px',
  height: '200px',
  marginTop: '160px',
  bgcolor: '#EDEDEDE5',
  borderRadius: '20px',
  marginRight: '2px',
  p: 4,
};

const ThankyouPage = () => {

  const [value, setValue] = React.useState(2);


  const [locationModalVisible, setLocationModalVisible] = useState(false);
  const closeModal = () => {
    setLocationModalVisible(false);
  }


  const openLocationModal = () => {
    setLocationModalVisible(true);
  };

  const closeLocationModal = () => {
    setLocationModalVisible(false);
  };





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
              <Typography component="h1" variant="poster" color="#03537E" fontFamily="Inter" style={{ fontSize: 30 }}>
                {translations.tn1} <img src={sucess} style={{ width: '25px', height: '25px' }} />
              </Typography>
              <Typography component="h1" gutterBottom color="#498F02" style={{ fontWeight: 'bold', fontFamily: "Inter" }}>
                {translations.tn2}
              </Typography>
              <Typography>
                <p style={{ color: "#757575", fontSize: 14 }}>{translations.tn3}</p>
              </Typography>
            </div>

            <Box sx={style}>
              <Typography gutterBottom color="#03537E" style={{ fontweight: 'bold' }}>
                <p style={{ color: '#03537E', fontWeight: 'bold', fontFamily: 'Inter', fontSize: 20, marginRight: '3px' }}>{translations.tn4}</p>
                <p style={{ color: "#757575", fontSize: 14 }}>{translations.tn5}</p>
              </Typography>
              <Box
                sx={{
                  '& > legend': { mt: 2 },
                  justifyContent: 'center'
                }}
              >
                <Rating
                  name="simple-controlled"
                  style={{ fontSize: 50 }}
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                />
              </Box>
              <div id="map" className="relative h-96 w-full mt-4 rounded shadow-md"></div>


              <div className="apps">
                <Box display={{ display: 'flex' }} noValidate sx={{ mt: 2 }}>
                  <Button
                    type="primary"
                    fullWidth
                    variant="white"
                    style={{ backgroundColor: '#03537E', borderRadius: '50px', fontWeight: 'bold', minWidth: '200px', minHeight: '30px' }}
                    sx={{ mt: 2, mb: 1 }}
                    onClick={() => openLocationModal()}
                  >
                    rate
                  </Button>
                </Box>
              </div>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>

    </>
  )
};

export default ThankyouPage;