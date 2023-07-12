
import Header from "../components/Header";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import "./TowingFacilityPage.css";

import translations from '../components/translations';
import Upload from 'antd/es/upload/Upload';
import {VideoCameraOutlined} from '@ant-design/icons';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { faClockFour } from '@fortawesome/free-solid-svg-icons';
import tw from '../tw.png'
import tow from '../tow.png'
import tow1 from '../tow1.png'
import sucess from '../sucess.png'
import cross from '../cross.png'
import Modal from '@mui/material/Modal';


const defaultTheme = createTheme();
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '300px',
  height:'350px',
  bgcolor: '#EDEDEDE5',
  // border: '2px solid #000',
  borderRadius: '20px',
  p: 4,
};
const TowingFacility = () =>{

    const [locationModalVisible, setLocationModalVisible] = useState(false);
    const navigate = useNavigate();
    const openLocationEnableModal = () => {
        setLocationModalVisible(true);
    };

    const navigateThankYouPage = (id) =>{
        setLocationModalVisible(false);
        navigate('/thankyou');

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

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    

    return(
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
            {translations.tw1}<img src={tw}/>
            </Typography>
            <Typography component="h1" color="#03537E" fontFamily="Inter" style={{fontWeight:'bold'}}>
            {translations.tw2}
            </Typography>
            <Typography component="h1" gutterBottom color="#757575" style={{fontFamily:"Inter",fontSize:14}}>
            {translations.tw3}
            </Typography>
            </div>


             
    <div className="apps">
            <Box display={{display:'flex'}} noValidate sx={{ mt: 20 }}>
            <Button
                type="primary"
                fullWidth
                variant="white"
                style={{backgroundColor:'#03537E',borderRadius: '50px' ,fontWeight: 'bold', minWidth: '150px', minHeight:'30px',marginRight:'15px' }}
                sx={{ mt: 2, mb: 1 }}
                onClick={()=>openLocationModal()}
            
              >
                YES 
              </Button>
              <Button
                type="primary"
                fullWidth
                variant="white"
                style={{backgroundColor:'#03537E',borderRadius: '50px',fontWeight: 'bold', minWidth: '150px', minHeight:'30px',marginRight:'15px'}}
                sx={{ mt: 2, mb: 1 }}
                onClick={()=>navigateThankYouPage()}
              >
                No
              </Button>       
            </Box>
            </div>


            {/* <Header/>
            <div id="towing-container" className="towing-container">
                <p id="towing-name" className="towing-name">Do you need Towing Facility?</p>
                <img className="towing-img" src="/towing.png"/>

            </div>
            <div id="selection-container" className="selection-container">
                <div id="thumbsup-container" className="thumbsup-container" onClick={()=>navigateThankYouPage()}>
                    <p className="button-title">YES</p>
                </div>
                <div id="thumbsup-container" className="thumbsup-container" onClick={()=>navigateThankYouPage()}>
                    <p className="button-title">NO</p>

                </div>
            </div> */}

<>
{locationModalVisible&&
      <Box sx={style}>
        <img src={cross} style={{float:'right'}} onClick={()=>closeLocationModal()}/>
    <img src={sucess} style={{ textAlign: 'center', marginLeft:'100px',width:'90px',height:'90px' }} /> 
    <Typography  gutterBottom color="#03537E" style={{fontweight:'bold',color:'#498F02',fontWeight:'bold',fontFamily:'Inter',fontSize:22}}>
    <p style={{marginInline:'25px'}}>Towing requested has been sent</p> 
    </Typography>
    <img src={tow1} style={{marginLeft:'30px'}}/> <img src={tow}/>
      <Button
        className="capture-button1 w-full"
        style={{backgroundColor:'#03537E',borderRadius: '50px',fontWeight: 'bold', minWidth: '150px', minHeight:'30px',color:'white',marginLeft:'62px',marginBottom:'-150px'}}
        onClick={()=>navigateThankYouPage()}
      >
        OKay
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
export  default TowingFacility;