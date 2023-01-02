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


});

const VaxProvider = (props) => {

  //States comes here
  const [account, setAccount] = useState("");
  const [isDoctor, setIsDoctor] = useState(true)
  const [doctorModalOpen, setDoctorModalOpen] = useState(false)
  const [userModalOpen, setUserModalOpen] = useState(false)
  const [verifyModalOpen, setVerifyModalOpen] = useState(false)

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
        setVerifyModalOpen

			}
		}
		{...props}
	  />
  )
}

const useVax = () => useContext(VaxContext);
export { VaxProvider, useVax };