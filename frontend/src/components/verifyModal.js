import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useVax } from '../hook/useVax';

const VerifyModal = (props) => {

  const { setVerifyModalOpen } = useVax();
  
  const handleClose = () => {
    setVerifyModalOpen(false);
  }

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
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
        VERIFICATION PHOTO HERE
      </Typography>
      
      <Button variant="outlined" color="error" onClick={() => handleClose()}>
          CLOSE
      </Button>
        
      
    </Box>
    </Modal>
  )

}
export default VerifyModal;