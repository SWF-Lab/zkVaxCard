import { useState, createContext, useContext } from 'react';
import { utils, BigNumber } from 'ethers';
import { Identity } from '@semaphore-protocol/identity';
import { generateProof, packToSolidityProof } from "@semaphore-protocol/proof"
import { Group } from '@semaphore-protocol/group';
import axios from '../container/Api';
import { Contract, providers, Wallet } from "ethers"

const VaxContext = createContext({
  account: "",
  setAccount: () => { },
  doctorModalOpen: false,
  setDoctorModalOpen: () => { },
  userModalOpen: false,
  setUserModalOpen: () => { },
  isDoctor: false,
  setIsDoctor: () => { },
  verifyModalOpen: false,
  setVerifyModalOpen: () => { },
  addMember: async () => { },
  verify: async () => { },
  verified: false,
  setVerified: () => { },
  doctors: [],

});

const groupId = [
  "4567654324",
  "4567654324",
  "4567654324",
  "4567654324",
  "4567654324"
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
    const transaction = await contract.joinGroup(identityCommitment, utils.formatBytes32String("seed"), groupId[doze - 1]);
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

    // const identity = new Identity("test")

    //TODO: verify
    const totalData = await axios.get(`/vac`);
    const users = totalData.data;
    console.log(users);
    const group = new Group()
    group.addMembers(["1003196480256260545214452023844398390233932528616564356991478713860498019498", 
    "1003196480256260545214452023844398390233932528616564356991478713860498019498", 
    "1003196480256260545214452023844398390233932528616564356991478713860498019498", 
    "15475330558479669541131830513404375041857311241543989950958865680126002397225", 
    "1350831874154331841295226949417125447794366539415355981775251806993970635764", 
    "10518942016405086693591107618816873283684897999479673286562581174701741805517",
    "6047319584217107402311561461752724975951107006208499089393695570455013408828",
    "18340211187676896482163261866143502449185399819868199318186666812750826321759"]);

    const identity = new Identity(seed);
    const identityCommitment = identity.generateCommitment().toString();
    console.log(identityCommitment)
    const data = await axios.get(`/vac?vacHash=${seed}`);
    const externalNullifier = groupId[doze - 1]
    const message = "seed1"
    const messageHash = utils.solidityKeccak256(["string"], [message]);
    const { proof, publicSignals } = await generateProof(identity, group, 4567654324, messageHash);
    const solidityProof = packToSolidityProof(proof)

    const merkleRoot = publicSignals.merkleRoot;
    const nullifierHash = publicSignals.nullifierHash;

    const ETHEREUM_PRIVATE_KEY = "c882a3e1d0f9be7952afb9239ed7ba46546477caaef694c77cb618212edaeef2";
    const INFURA_ID = "c2df702ef262401691e9e54d8a65b1f2";
    const ethereumPrivateKey = ETHEREUM_PRIVATE_KEY;
    const ethereumURL = "https://goerli.infura.io/v3/" + INFURA_ID
    const provider = new providers.JsonRpcProvider(ethereumURL)
    const signer = new Wallet(ethereumPrivateKey, provider);
    const s = new Contract("0x5259d32659F1806ccAfcE593ED5a89eBAb85262f", [{
      "inputs": [
        {
          "internalType": "uint256",
          "name": "groupId",
          "type": "uint256"
        }
      ],
      "name": "getMerkleTreeRoot",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }], signer)

    const root = await s.getMerkleTreeRoot(4567654324)
    console.log(message)
    console.log(groupId[doze - 1])
    console.log(root.toString())
    console.log(nullifierHash)
    console.log(externalNullifier)
    console.log(solidityProof);

    try { // success
      const transaction = await contract.verify(
        message,
        root.toString(),
        nullifierHash,
        solidityProof);

      await transaction.wait()
      setVerified(true);
      await axios.put(`/vac/${data.data[0].id}`, {
        nonce: (externalNullifier + 1)
      });

      
    } catch (e) {

      console.log(e);
      setVerified(false);
      // fail
    }
  }

  const doctors = [
    '0xC064a24Ec8ab00Bd67924d007b94FD8EebD4Bc25',
    '0xaB50035F25F96dd3DEf1A7a9cC4E1C81AD6a7651',
    '0xB42faBF7BCAE8bc5E368716B568a6f8Fdf3F84ec'
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