import * as React from 'react';
import axios from 'axios';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BasicMenu from './BasicMenu';
import ModelDragForm from './ModelDragForm';
import AccountBalance from './AccountBalance';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit">
        AIgon Alley
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Profile() {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `http://34.42.69.196:5000/profile/${username}`;
        const response = await axios.get(url);
        setUserData(response.data); // Assuming response.data is the user data
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [username]);

  //const [balance, setBalance] = useState(null);
  //const [loadingBalance, setLoadingBalance] = useState(true);
  //const [error, setError] = useState(null);

  //const account_id = userData.user.bank_account_id;
  //const api_key = '6814f91cb9090942d48d91b63caa8f9c';
  //const url = `http://api.nessieisreal.com/accounts/${account_id}?key=${api_key}`;

  // useEffect(() => {
  //   axios.get(url, { headers: { "Accept": "application/json" } })
  //     .then(response => {
  //       setBalance(response.data.balance);
  //       setLoadingBalance(false);
  //     })
  //     .catch(error => {
  //       setError(error.toString());
  //       setLoadingBalance(false);
  //     });
  // }, []);  // The empty array as a second argument ensures this useEffect runs once, similar to componentDidMount()

  //if (loadingBalance) return <div>Loading...</div>;
  //if (error) return <div>Error: {error}</div>;




  if (loading) {
    return <div>Loading</div>
  }
  return (
    
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar position="relative">

        <Toolbar>
          <CameraIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            {userData ? userData.user.username : 'Loading'}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 1
          }}
        >
      <BasicMenu/>
      </Box>
      {/* <div>
      Account Balance: ${balance}
      </div> */}
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
            align: 'center'
          }}
          justifyContent={'center'}
          alignItems="center"
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              {userData ? userData.user.first_name : 'Loading'}
            </Typography>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '30px'}}>
              <AccountBalance AccountId={userData.user.bank_account_id}></AccountBalance>
            </div>
            <Typography variant="h4" align="center" color="text.secondary" paragraph>
              Look at all your models!
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
            <ModelDragForm/>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {userData.models.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image="https://source.unsplash.com/random?wallpapers"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {card.title}
                    </Typography>
                    <Typography>
                      {card.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">{card.price}</Button>
                    <Button size="small">{card.link}</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Copyright />
      </Box>
    </ThemeProvider>
  );
}