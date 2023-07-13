import Header from "../components/Header";
import "./LocationPage.css";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {connect} from "react-redux";
import {getMediaUploadUrl, updateLocation, UploadImagesToS3} from "../store/claimReportReducer";
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
const LocationPage = (props) =>{

    const currentLanguage = 'en';

    const [locationModalVisible, setLocationModalVisible] = useState(false);
    const [location, setLocation] = useState(false);

    const navigate = useNavigate();
    const openLocationEnableModal = async () => {
        setLocationModalVisible(true);

    };

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);

    const uploadLocation = async (id) =>{
        // need to modify later
        const locationData = {
            lat: "6.927079",
            long: "79.861244"
        }
        let result = await props.updateLocation(locationData);
        if (result){
            setLocation(true);
            setLocationModalVisible(false);
        }

    }
    const navigateNextScreen = () => {
        navigate('/my-vehicle');

    }
    const navigateBackScreen = () => {
        navigate('/');

    }
    const closeModal = () => {
        setLocationModalVisible(false);
    }


    const openLocationModal = () => {
      setLocationModalVisible(true);
    };
    
    const closeLocationModal = () => {
      setLocationModalVisible(false);
    };

  


    const getLatitudeAndLongitude = async()=> {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
           (position)=> {
            // const position = await new Promise((resolve, reject) => {navigator.geolocation.getCurrentPosition(resolve, reject);});
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            setLocationModalVisible(false);
            setLocation(true);
            navigateNextScreen();
            console.log(latitude);
            console.log(longitude);
          },
           (error)=> {
            console.error('Error getting location:', error.message);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    }

    return(
        <>
        <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
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
           {!location && <Typography component="h1" variant="poster" color="#03537E">
             {translations.greeting}<img src={l}/>
            </Typography>
           }
            {!location && <Typography  gutterBottom color="#757575" style={{fontSize:14}}>
              {translations.intro}
             </Typography>
            }
            {!location && <Typography  gutterBottom color="#757575" style={{fontSize:12}}>
             {translations.loctext2}
             </Typography>
            }
         {location &&  <p id="location-enabled-heading" className="location-heading">Location Enabled!</p>}
         {location &&  <img className="success-img" width={100} src="/success1.png" />}

         </div>
         <img src={map} className="" alt="logo" height={'230px'} width={'100%'}/>
         <div className="apps">
            <Box display={{display:'flex'}} noValidate sx={{ mt: 1 }}>
              {!location &&<Button
                type="primary"
                fullWidth
                variant="white"
                style={{backgroundColor:'white',borderRadius: '50px' , color:'#03537E',fontWeight: 'bold', minWidth: '50px', minHeight:'30px' }}
                sx={{ mt: 2, mb: 1 }}
                onClick={()=>navigateBackScreen()}
              >
                {translations.bu2}
              </Button>}
              {!location &&<Button
                type="primary"
                fullWidth
                variant="white"
                style={{backgroundColor:'#03537E',borderRadius: '50px',fontWeight: 'bold', minWidth: '200px', minHeight:'30px'}}
                sx={{ mt: 2, mb: 1 }}
                onClick={()=>getLatitudeAndLongitude()}
              >
               {translations.bu3}
              </Button>}

              {location &&<Button
                type="primary"
                fullWidth
                variant="white"
                style={{backgroundColor:'#03537E',borderRadius: '50px',fontWeight: 'bold', minWidth: '200px', minHeight:'30px'}}
                sx={{ mt: 2, mb: 1 }}
                onClick={()=>navigateNextScreen()}
              >
               {translations.bu1}
              </Button>}                 
            </Box>
            </div>
{/* 
    <div id="location-welcome-container" className="location-welcome-container">
                {!location &&  <p id="location-heading" className="location-heading">Enable Your Location</p>}
                {!location && <p className="location-subtitle ">Please Enable Your Location</p>}
                {location &&  <p id="location-enabled-heading" className="location-heading">Location Enabled!</p>}
                {location &&  <img className="success-img" width={100} src="/success1.png" />}

    </div> */}


           
             {/* <div className="apps">
                {!location && <div className="nxt-btn" onClick={()=>openLocationEnableModal()}>
                    <p className="app-title">LOCATION</p>
                </div>}
                { location && <div className="nxt-btn" onClick={()=>navigateNextScreen()}>
                    <p className="app-title">NEXT</p>
                </div>}
            </div> 
    */}

<>
{locationModalVisible &&
   <Box sx={style}>
      <img src={cross} style={{float:'right'}} onClick={()=>closeLocationModal()}/>
    <Typography  gutterBottom color="#03537E" style={{fontweight:'bold',fontFamily:'Inter'}}>
        <p style={{fontWeight:'bold'}}>Please pin your location of the incident</p>
    </Typography>
      <Button
        className="capture-button1 w-full"
        style={{backgroundColor:'#03537E',borderRadius: '50px',fontWeight: 'bold', minWidth: '200px', minHeight:'30px'}}
        onClick={() => navigateNextScreen()}
      >
        <i className="capture-button-icon fas fa-search-location"></i>
        {props.isLoading && <span className="location-spinner"></span>}
        <span className="capture-button-text">Next</span>
      </Button>
      <div id="map" className="relative h-96 w-full mt-4 rounded shadow-md"></div>
      </Box>
}
  </>





            {/* {locationModalVisible &&
            <div id="location-capture">
                <div id="location-capture-modal" className="app-modal">
                    <button id="location-capture-close" className="close" onClick={()=>closeModal()}>
                        <i className="fas fa-times text-lg">X</i>
                    </button>
                    <div id="location-capture-header" className="app-modal-header">
                        <div id="location-capture-details" className="app-modal-details-container">
                            <p id="location-capture-title" className="app-modal-title">Allow Access Location?</p>
                            <p id="location-capture-subtitle" className="app-modal-subtitle">Please pin your location of the
                                incident</p>
                        </div>
                    </div>
                    <button id="location-capture-button" className="capture-button1 w-full">
                        <i className="capture-button-icon fas fa-search-location"></i>
                        {props.isLoading && <span className="location-spinner"></span>}
                        <span className="capture-button-text" onClick={()=>uploadLocation()}>Enable location</span>
                    </button>
                    <div id="map" className="relative h-96 w-full mt-4 rounded shadow-md"></div>
                </div>
                <div className="app-modal-background app-dimension"></div>
            </div>
            } */}


            </Box>
            </Container>
            </ThemeProvider>
      </>
    )

}

const mapDispatchToProps = state => {
    return {
        mediaUploadURL: state.claimReport.mediaUploadURL,
        isLoading: state.claimReport.isLoading
    };
};
export default connect(mapDispatchToProps, {
    updateLocation
})(LocationPage);
