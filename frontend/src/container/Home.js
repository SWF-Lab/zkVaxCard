import * as React from 'react';
import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';  

import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";

import { useVax } from '../hook/useVax';
import { useSnackbar } from 'notistack';
import Copyright from '../components/copyright';
import DoctorModal from '../components/doctorModal';
import UserModal from '../components/userModal';
import VerifyModal from '../components/verifyModal';


const INFURA_ID = process.env.INFURA_ID;
const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: INFURA_ID, // required
    },
  },
  coinbasewallet: {
    package: CoinbaseWalletSDK, // Required
    options: {
      appName: "web3modal", // Required
      infuraId: INFURA_ID, // Required
      rpc: "", // Optional if `infuraId` is provided; otherwise it's required
      chainId: 1, // Optional. It defaults to 1 if not provided
      darkMode: false, // Optional. Use dark theme, defaults to false
    },
  },
  binancechainwallet: {
    package: true,
  },
};

const web3Modal = new Web3Modal({
  network: "goerli", // optional
  cacheProvider: true, // optional
  providerOptions, // required
});
const connectWallet = async () => {
  if (window.ethereum) {
    const provider = await web3Modal.connect();
    const web3 = new Web3(provider);
    await window.ethereum.send("eth_requestAccounts");
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    return account;
  } else {
    // Show alert if Ethereum provider is not detected
    alert("Please install Mask");
  }
};

const tiers = [
  {
    title: 'Doctors',
    description: [
      'Doctors with permission can add members',
    ],
    buttonText: 'Add member',
    buttonVariant: 'outlined',
  },
  {
    title: 'Users',
    description: [
      'Users can verify yourself and get a proof',
    ],
    buttonText: 'Verify',
    buttonVariant: 'outlined',
  },
  
];


const toggleWithString = (s) => {
  return s.substr(0,5) + "..." + s.substr(37,40)
}

const Home = () => {
  const {account, setAccount, doctorModalOpen, setDoctorModalOpen, userModalOpen, setUserModalOpen, verifyModalOpen, setVerifyModalOpen} = useVax();
  const { enqueueSnackbar } = useSnackbar();

  const handleModalOpen = (type) => {
    if (type === "Doctors")
      setDoctorModalOpen(true)
    else if(type === "Users")
      setUserModalOpen(true)
    else
      setVerifyModalOpen(true)
  }
  const handleModalClose = (type) => {
    if (type === "Doctors")
      setDoctorModalOpen(false)
    else if(type === "Users")
      setUserModalOpen(false)
    else
      setVerifyModalOpen(false)
  }

  const handleConnect = async (event) => {
    event.preventDefault();
    const addr = await connectWallet()
    setAccount(addr);
    // TODO: check if account is Doctor (call setIsDoctor();)

  };

  const addMember = (userId, doze) => {
    setDoctorModalOpen(false)
    console.log("addId:", userId);
    console.log("doze:", doze);
    enqueueSnackbar('Member added succesfully', { variant:'success' });
    //TODO: _addMember
  }


  useEffect(() => {
    console.log(account);
  }, [account]);

  return (
    <React.Fragment>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: 'wrap' }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            zkVaxCard
          </Typography>
          <nav>
            <Link
              variant="button"
              color="text.primary"
              href="#"
              sx={{ my: 1, mx: 1.5 }}
            >
              Features
            </Link>
            <Link
              variant="button"
              color="text.primary"
              href="#"
              sx={{ my: 1, mx: 1.5 }}
            >
              About Us
            </Link>
          </nav>
          { 
            (account === "") && 
            <Button href="#" variant="outlined" sx={{ my: 1, mx: 1.5 }} onClick={handleConnect}>
              Login
            </Button> 
          }
          { account !== "" && 
            <>
              <Button>
                {toggleWithString(account)}
              </Button>
              {/* <Button>
                Disconnect
              </Button> */}
            </>
          }
        </Toolbar>
      </AppBar>
      {/* Hero unit */}
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          zkVaxCard
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" component="p">
          system that verifies your vax records without exposing your private information.
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={6}
              md={6}
            >
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  action={ null}
                  subheaderTypographyProps={{
                    align: 'center',
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'baseline',
                      mb: 2,
                    }}
                  >
                  </Box>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant={tier.buttonVariant} onClick={() => handleModalOpen(tier.title)}>
                    {tier.buttonText} 
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>


      {/* Modals */}
      <DoctorModal 
        open={doctorModalOpen} 
        close={() => handleModalClose("Doctors")}
        addMember={(id, doze) => addMember(id, doze)}
      />
      <UserModal open={userModalOpen} close={() => handleModalClose("Users")}/>
      <VerifyModal open={verifyModalOpen} close={() => handleModalClose("Verify")}/>


      {/* Footer */}
      <Container
        maxWidth="md"
        component="footer"
        sx={{
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          mt: 8,
          py: [3, 6],
        }}
      >
        <Copyright sx={{ mt: 5 }} />
      </Container>
      {/* End footer */}
        
    </React.Fragment>

  );
}

export default Home;