import Header from "../components/Header";
import "./LocationPage.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { connect } from "react-redux";
import { getMediaUploadUrl, updateLocation, UploadImagesToS3 } from "../store/claimReportReducer";
import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import map from '../map.png'
import l from "../l.png"
import cross from '../cross.png'
import translations from "../components/translations";

const defaultTheme = createTheme();

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '300px',
  bgcolor: '#EDEDEDE5',
  // border: '2px solid #000',
  borderRadius: '20px',
  p: 4,
};
const LocationPage = (props) => {

  const currentLanguage = 'en';

  const [locationModalVisible, setLocationModalVisible] = useState(false);
  const [location, setLocation] = useState(false);

  const navigate = useNavigate();

  const enableLocation = async (lat, long) => {

    const uniqueCode = localStorage.getItem('uniqueCode');
    const tenantId = localStorage.getItem('tenantId');

    const locationData = {
      uniqueCode: uniqueCode,
      lng: long,
      lat,
    }
    const result = await props.updateLocation(locationData, tenantId);
    if (result) navigate('/my-vehicle');
  }

  const navigateBackScreen = () => {
    navigate('/');
  }

  const closeLocationModal = () => {
    setLocationModalVisible(false);
  };

  const getLatitudeAndLongitude = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setLocationModalVisible(false);
          setLocation(true);
          enableLocation(latitude, longitude);
        },
        (error) => {
          console.error('Error getting location:', error.message);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
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
              {!location && <Typography component="h1" variant="poster" color="#03537E">
                {translations.greeting}<img src={l} />
              </Typography>
              }
              {!location && <Typography gutterBottom color="#757575" style={{ fontSize: 14 }}>
                {translations.intro}
              </Typography>
              }
              {!location && <Typography gutterBottom color="#757575" style={{ fontSize: 12 }}>
                {translations.loctext2}
              </Typography>
              }
              {location && <p id="location-enabled-heading" className="location-heading">Location Enabled!</p>}
              {location && <img className="success-img" width={100} src="/success1.png" />}

            </div>
            <img src={map} className="" alt="logo" height={'230px'} width={'100%'} />
            <div className="apps">
              <Box display={{ display: 'flex' }} noValidate sx={{ mt: 1 }}>
                {!location && <Button
                  type="primary"
                  fullWidth
                  variant="white"
                  style={{ backgroundColor: 'white', borderRadius: '50px', color: '#03537E', fontWeight: 'bold', minWidth: '50px', minHeight: '30px' }}
                  sx={{ mt: 2, mb: 1 }}
                  onClick={() => navigateBackScreen()}
                >
                  {translations.bu2}
                </Button>}
                {!location && <Button
                  type="primary"
                  fullWidth
                  variant="white"
                  style={{ backgroundColor: '#03537E', borderRadius: '50px', fontWeight: 'bold', minWidth: '200px', minHeight: '30px' }}
                  sx={{ mt: 2, mb: 1 }}
                  onClick={() => getLatitudeAndLongitude()}
                >
                  {translations.bu3}
                </Button>}

                {location && <Button
                  type="primary"
                  fullWidth
                  variant="white"
                  style={{ backgroundColor: '#03537E', borderRadius: '50px', fontWeight: 'bold', minWidth: '200px', minHeight: '30px' }}
                  sx={{ mt: 2, mb: 1 }}
                  onClick={() => enableLocation()}
                >
                  {translations.bu1}
                </Button>}
              </Box>
            </div>

            <>
              {locationModalVisible &&
                <Box sx={style}>
                  <img src={cross} style={{ float: 'right' }} onClick={() => closeLocationModal()} />
                  <Typography gutterBottom color="#03537E" style={{ fontweight: 'bold', fontFamily: 'Inter' }}>
                    <p style={{ fontWeight: 'bold' }}>Please pin your location of the incident</p>
                  </Typography>
                  <Button
                    className="capture-button1 w-full"
                    style={{ backgroundColor: '#03537E', borderRadius: '50px', fontWeight: 'bold', minWidth: '200px', minHeight: '30px' }}
                    onClick={() => enableLocation()}
                  >
                    <i className="capture-button-icon fas fa-search-location"></i>
                    {props.isLoading && <span className="location-spinner"></span>}
                    <span className="capture-button-text">Next</span>
                  </Button>
                  <div id="map" className="relative h-96 w-full mt-4 rounded shadow-md"></div>
                </Box>
              }
            </>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  )

}

const mapDispatchToProps = state => {
  return {
    mediaUploadURL: state.claimReport.mediaUploadURL,
    isLoading: state.claimReport.isLoading,
    locationData: state.claimReport.locationData
  };
};
export default connect(mapDispatchToProps, {
  updateLocation
})(LocationPage);


