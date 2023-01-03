import { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useVax } from '../hook/useVax';
import { useSnackbar } from 'notistack';
import keccak256 from 'keccak256'

import { AccountCircle } from '@mui/icons-material';
import LockIcon from '@mui/icons-material/Lock';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const UserModal = (props) => {

  const { account, setVerifyModalOpen } = useVax();
  const [Id, setId] = useState("")
  const [password, setPassword] = useState("")
  const [doze, setDoze] = useState(3)
  const { enqueueSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => 
    setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSetDoze = (e, newAlignment) => {
    setDoze(newAlignment);
  };
  const handleSetId = (e) => {
    setId(e.target.value);
  }
  const handleSetPassword = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmit = async () => {
    if(!Id)
      enqueueSnackbar('ID required', { variant:'error' });
    else if(!password)
      enqueueSnackbar('Password required', { variant:'error' });  
    else{
      const beforeHash = Id.concat(password);
      let seed = keccak256(beforeHash).toString('hex')
      await props.verify(seed, doze);
      setVerifyModalOpen(true);
    }
  }

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  
  return(
    <Modal
    open={props.open}
    onClose={props.close}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    >
    <Box sx={modalStyle}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Verify
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {
            account ? 
            "Please enter your ID and password"
            :
            "Please Log in first"
          }
      </Typography>
      <p></p>
      {
        account &&
        <>
        <TextField 
          id="users-ID" 
          label="Your ID" 
          variant="outlined" 
          required 
          value={Id} 
          onChange={handleSetId}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            )}
          }
        />

        <p></p>
        
        <FormControl sx={{ m: 0, width: '28.7ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            value={password} 
            onChange={handleSetPassword}
            startAdornment={
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>

        <p></p>


        <ToggleButtonGroup
            color="primary"
            value={doze}
            exclusive
            onChange={handleSetDoze}
            aria-label="Platform"
            >
            <ToggleButton value="3" aria-label="left aligned">3</ToggleButton>
            <ToggleButton value="4" aria-label="centered">4</ToggleButton>
            <ToggleButton value="5" aria-label="right aligned">5</ToggleButton>

        </ToggleButtonGroup>
        <p></p>
        <Button variant="outlined" color="error" onClick={() => handleSubmit()}>
            VERIFY
        </Button>
        </>
      }
    </Box>
    </Modal>
    
  )
}

export default UserModal

