import { useState, createContext, useContext } from 'react';

const VaxContext = createContext({
  account: "",
  setAccount: () => {},
  doctorModalOpen: false, 
  setDoctorModalOpen: () => {},
  userModalOpen: false, 
  setUserModalOpen: () => {},
  isDoctor: false,
  setIsDoctor: () => {},
  verifyModalOpen: false,
  setVerifyModalOpen: () => {},
  addMember: async () => {},
  verify: async () => {},
  verified: false,
  setVerified: () => {},
  doctors: [],

});

const VaxProvider = (props) => {

  //States comes here
  const [account, setAccount] = useState("");
  const [isDoctor, setIsDoctor] = useState(false)
  const [doctorModalOpen, setDoctorModalOpen] = useState(false)
  const [userModalOpen, setUserModalOpen] = useState(false)
  const [verifyModalOpen, setVerifyModalOpen] = useState(false)
  const [verified, setVerified] = useState(false)

  const addMember = async (seed, doze) => {
    setDoctorModalOpen(false)
    console.log("seed:", seed);
    console.log("doze:", doze);
    //TODO: add member

  }

  const verify = async (seed, doze) => {
    console.log("seed:", seed);
    console.log("doze:", doze);
    //TODO: verify

    //if (check verified)
    // setVerified(true)
  }

  const doctors = [
    '0xC064a24Ec8ab00Bd67924d007b94FD8EebD4Bc25',
    '0xaB50035F25F96dd3DEf1A7a9cC4E1C81AD6a7651'
  ]


  return (
	  <VaxContext.Provider
		value={
			{
        account, 
        setAccount, 
        doctorModalOpen, 
        setDoctorModalOpen, 
        userModalOpen, 
        setUserModalOpen,
        isDoctor,
        setIsDoctor,
        verifyModalOpen,
        setVerifyModalOpen,
        addMember,
        verify,
        verified,
        setVerified,
        doctors


			}
		}
		{...props}
	  />
  )
}

const useVax = () => useContext(VaxContext);
export { VaxProvider, useVax };