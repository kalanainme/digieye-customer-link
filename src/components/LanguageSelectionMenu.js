import React, { useState } from 'react';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCustomerLink } from '../store/claimReportReducer';
import { useEffect } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import translations from './translations';

const defaultTheme = createTheme();


const LanguageSelectionMenu = (props) => {
  const [showLanguageButtons, setShowLanguageButtons] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(true);

  const changeLanguage = (event) => {
    const newLanguage = event.target.value;
    translations.setLanguage(newLanguage);
    navigate('/location');
  };

  const navigate = useNavigate();
  const openLocationScreen = () => {
    navigate('/location');
  };

  useEffect(() => {
    generateLink();
  }, []);

  // -- future modifications needed--
  const generateLink = async () => {
    const body = {
      app: 'digieye',
      userId: 123123,
    };
    await props.getCustomerLink(body);
  };

  const handleAcceptTerms = (event) => {
    setAcceptTerms(event.target.checked);
    setShowLanguageButtons(event.target.checked);
  };
 

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Header />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            fontFamily: 'Inter',
            color: '#757575',
          }}
        >
          <Typography component="h1" variant="poster" color="#03537E" style={{ size: '25px', fontFamily: 'Inter' }}>
            Welcome to HNB GI Claimee 🙏
          </Typography>
          <Typography variant="h6" color="#03537E" style={{ fontFamily: 'Inter' }}>
            Welcome to DIGIEYE Claim Report
          </Typography>
          <Box
            sx={{
              fontFamily: 'Inter',
              size: '14px',
              lineHeight: '15px',
              color: '#777777',
            }}
          >
            <Typography display="block" gutterBottom color="#757575" style={{ variant: 'boald' }}>
              Please select your preferred language
            </Typography>
            <Typography display="block" gutterBottom color="#757575" style={{ variant: 'boald',fontFamily:'Sinhala Sangam MN'}}>
              ඔබ කැමති භාෂාව තෝරාගන්න
            </Typography>
            <Typography display="block" gutterBottom color="#757575" style={{ variant: 'boald' }}>
              உங்களுக்கு விருப்பமான மொழியைத் தேர்ந்தெடுக்கவும்
            </Typography>
          </Box>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <FormControlLabel
              control={
                <Checkbox
                  value="remember"
                  color="primary"
                  style={{ color: '#03537E' }}
                  checked={acceptTerms}
                  onChange={handleAcceptTerms}
                />
              }
              label={
                <span color="primary" style={{ color: '#757575' }}>
                  Accept <a href="https://digitalservices.lk/privacy/?amp=1" style={{ color: '#757575' }}>
                  Terms & Conditions
                  </a>
                </span>
              }
            />


            {(
              <Box style={{ display: 'flex', fontFamily: 'Inter', color: '#03537E' }} onChange={changeLanguage}>
                <Button
                  type="primary"
                  variant="#00bcd4"
                  disabled={!acceptTerms}
                  value="sn"
                  onClick={changeLanguage}
                  style={{
                    backgroundColor: '#F1F3F5',
                    marginRight: '15px',
                    minWidth: '100px',
                    minHeight: '80px',
                    fontWeight: 'bold',
                    borderRadius: '20px',
                  }}
                >
                  සිංහල
                </Button>
                <Button
                  type="primary"
                  variant="#00bcd4"
                  disabled={!acceptTerms}
                  value="ta"
                  onClick={changeLanguage}
                  style={{
                    backgroundColor: '#F1F3F5',
                    marginRight: '15px',
                    minWidth: '100px',
                    minHeight: '80px',
                    fontWeight: 'bold',
                    borderRadius: '20px',
                  }}
                >
                  தமிழ்
                </Button>
                <Button
                  type="primary"
                  variant="#00bcd4"
                  disabled={!acceptTerms}
                  value="en"
                  onClick={changeLanguage}
                  style={{
                    backgroundColor: '#F1F3F5',
                    marginRight: '15px',
                    minWidth: '100px',
                    minHeight: '80px',
                    fontWeight: 'bold',
                    borderRadius: '20px',
                  }}
                >
                  ENGLISH
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

const mapDispatchToProps = (state) => {
  return {
    hashToken: state.claimReport.hashToken,
    isLoading: state.claimReport.isLoading,
  };
};

export default connect(mapDispatchToProps, {
  getCustomerLink,
})(LanguageSelectionMenu);
