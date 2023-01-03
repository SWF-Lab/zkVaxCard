import * as React from 'react';
import { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useVax } from '../hook/useVax';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Button from '@mui/material/Button';
import { useSnackbar } from 'notistack';
import keccak256 from 'keccak256'

const DoctorModal = (props) => {
  
  const {account, isDoctor} = useVax();
  const [addId, setAddId] = useState("")
  const [password, setPassword] = useState("")
  const [doze, setDoze] = useState(3);
  const { enqueueSnackbar } = useSnackbar();
  
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

  const handleSetId = (e) => {
    setAddId(e.target.value);
  }
  const handleSetPassword = (e) => {
    setPassword(e.target.value);
  }

  const handleSetDoze = (e, newAlignment) => {
    setDoze(newAlignment);
  };

  const handleSubmit = async () => {
    if(!addId)
      enqueueSnackbar('ID required', { variant:'error' });
    else if(!password)
      enqueueSnackbar('Password required', { variant:'error' });  
    else{
      const beforeHash = addId.concat(password);
      let seed = keccak256(beforeHash).toString('hex')
      await props.addMember(seed, doze)
      
    }
  }

  return(
   
    <Modal
    open={props.open}
    onClose={props.close}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    >
    <Box sx={modalStyle}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Add Member
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        { 
          account ? isDoctor ?
          ""
          :
          "This method is only for doctors"
          : 
          "Please Log in first"
        }
      </Typography>
      {
        account && isDoctor &&
        <>
        <TextField id="patient-ID" label="patient-ID" variant="outlined" required value={addId} onChange={handleSetId}/>
        <TextField id="patient-password" label="patient-password" variant="outlined" required value={password} onChange={handleSetPassword}/>
        
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
          ADD
        </Button>
        
        </>
      }
      
    </Box>
    </Modal>
    )

}

export default DoctorModal;