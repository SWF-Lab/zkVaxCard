import { useState, createContext, useContext } from 'react';
import { utils, BigNumber } from 'ethers';
import { Identity } from '@semaphore-protocol/identity';
import { generateProof, packToSolidityProof } from "@semaphore-protocol/proof"
import { Group } from '@semaphore-protocol/group';
import axios from '../container/Api';

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

const groupId = [
  BigNumber.from("11013851635916537925"),
  BigNumber.from("10293009457859494032"),
  BigNumber.from("35427849445478396784"),
  BigNumber.from("16958698264868628465"),
  BigNumber.from("24747249385289390816")
];

const VaxProvider = (props) => {

  //States comes here
  const [account, setAccount] = useState("");
  const [isDoctor, setIsDoctor] = useState(false)
  const [doctorModalOpen, setDoctorModalOpen] = useState(false)
  const [userModalOpen, setUserModalOpen] = useState(false)
  const [verifyModalOpen, setVerifyModalOpen] = useState(false)
  const [verified, setVerified] = useState(false)

  const addMember = async (seed, doze, contract) => {
    setDoctorModalOpen(false)
    console.log("seed:", seed);
    console.log("doze:", doze);

    //TODO: add member
    const identity = new Identity(seed);
    const identityCommitment = identity.generateCommitment().toString();
    const transaction = await contract.joinGroup(identityCommitment, utils.formatBytes32String("seed"), groupId[doze-1]);
    await transaction.wait();
    await axios.post(`/vac`, {
      vacHash: seed,
      nonce: 0,
      commitment: identityCommitment
    });
  }


  const verify = async (seed, doze, contract) => {
    console.log("seed:", seed);
    console.log("doze:", doze);
    //TODO: verify
    const totalData = await axios.get(`/vac`);
    const users = totalData.data;
    const group = new Group()
    group.addMembers(users.map((each) => each.commitment));

    const identity = new Identity(seed);
    const data = await axios.get(`/vac?vacHash=${seed}`);
    console.log(seed);
    // const message = utils.formatBytes32String("seed");
    const externalNullifier = data.data[0].nonce;
    // console.log(identity, group, externalNullifier, message);
    const { proof, publicSignals } = await generateProof(identity, group, externalNullifier, utils.formatBytes32String("seed"));
    const solidityProof = packToSolidityProof(proof);
    const merkleRoot = publicSignals.merkleRoot;
    const nullifierHash = publicSignals.nullifierHash;
    console.log(utils.formatBytes32String("seed"))
    console.log(groupId[doze - 1])
    console.log(merkleRoot)
    console.log(nullifierHash)
    console.log(externalNullifier)
    console.log(solidityProof);
    try { // success
      const transaction = await contract.verify(
        utils.formatBytes32String("seed"),
        groupId[doze - 1],
        merkleRoot,
        nullifierHash,
        externalNullifier,
        solidityProof
      );

      await transaction.wait()
      await axios.put(`/vac/${data.data[0].id}`, {
        nonce: (externalNullifier + 1)
      });
      
      setVerified(true);
    } catch (e) {
      console.log(e);
      setVerified(false);
      // fail
    }
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