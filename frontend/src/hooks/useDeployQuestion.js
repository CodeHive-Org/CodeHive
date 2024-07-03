// import { useTheContext } from "@/context";
// import { useState } from "react";
// import { useWallet } from "@tronweb3/tronwallet-adapter-react-hooks";
// import { ABI } from "../utils/problems/index.js"
// import { addDoc, collection } from "firebase/firestore";
// import { toast } from "sonner";
// import { db } from "@/firebaseConfig.js";

// export default function useDeployQuestion() {
//   const {
//     wallet,
//     address,
//     connected,
//     select,
//     connect,
//     disconnect,
//     signMessage,
//     signTransaction,
//   } = useWallet();
//   const { QuesBYTECODE, ABI_Bank, tronWeb } = useTheContext();
//   const [error, setError] = useState(null);
//   const [deployedAddress, setDeployedAddress] = useState(null);
//   const [deployed, setdeployed] = useState(false);



//   const [ questionDeployed, setQuestonDeployed ] = useState(false);
//   const [ deployedQuestionAddress, setDeployedQuestionAddress ] = useState("");
//   const [ transactedToBank, settransactedToBank ] = useState(false);
//   const [ transactedToBankHash, setTransactedToBankHash ] = useState("");
//   const [ stateOftransaction, setStateOfTransaction ] = useState(0); 
//   /*
//     state: 
//       0: meaning nothing has happened,
//       1: meaning the question is curuntly under deployment...
//       2: the question is deployed,
//       3: signing to the bank fro the txn,
//       4: signed to the bank 
//       5: process done.

//   */

//   const DEPLOY = async (difficulty, formData, bounty) => {
//     setdeployed(false);
//     setStateOfTransaction(1); //deploying the question
//     ///state one done....
//     const options = {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${import.meta.env.VITE_PINATA_JWT}`,
//         "Content-Type": "application/json",
//       },
//       body: `{"pinataOptions":{"cidVersion":1},"pinataMetadata":{"name":"${formData.name.replace(/ /g, "_")}.json"},"pinataContent":${JSON.stringify(formData)}}`,
//     };
//     if (!window.tron.tronWeb.ready) {
//       console.error("cant deploy tron undefined.");
//       return;
//     }
//     const data = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", options)
//     const jsonData = await data.json();
//     const IpfsHash = jsonData.IpfsHash;
//     // const IpfsHash = "bafkreiafjezwdv4uxezin6jvsew4o5eivvro7qblogibow74crgxrrecxi";
//     console.log('formData.name:', formData.name);
//     console.log('IpfsHash:', IpfsHash);
//     console.log('defaultAddress:', window.tron.tronWeb.defaultAddress.base58.toString());
//     console.log('difficulty:', difficulty);
//     console.log('VITE_WEB_HANDLER:', import.meta.env.VITE_WEB_HANDLER.toString());
//     console.log(IpfsHash, ABI, typeof QuesBYTECODE);
//     try{
//       const options = {
//         feeLimit: 1000000000, //The maximum TRX burns for resource consumption（1TRX = 1,000,000SUN）
//         callValue: 1000000 * bounty, //The TRX transfer to the contract for each call（1TRX = 1,000,000SUN）
//         userFeePercentage: 100, //Consume user's resource percentage. It should be an integer between [0, 100]. if 0, means it does not consume user's resource until the developer's resource has been used up
//         originEnergyLimit: 100, //The maximum resource consumption of the creator in one execution or creation
//         abi: ABI,
//         bytecode: QuesBYTECODE,
//         parameters: [
//           formData.name,
//           IpfsHash,
//           window.tron.tronWeb.defaultAddress.base58.toString(),
//           difficulty,
//           import.meta.env.VITE_WEB_HANDLER.toString(),
//         ],
//         name: "Question",
//       };
//       const contract = await  window.tron.tronWeb.transactionBuilder.createSmartContract(
//         options,
//         window.tron.tronWeb.defaultAddress.base58,
//       );
//       console.log("the contract made =>", contract);
//       //signing the txn...
//       const signedTxn = await window.tron.tronWeb.trx.sign(contract);
//       const result = await window.tron.tronWeb.trx.sendRawTransaction(signedTxn);
//       console.log("result babo",result);
//       const address_deployed = window.tron.tronWeb.address.fromHex(result.transaction.contract_address);
//       setDeployedAddress(address_deployed);
//       setDeployedQuestionAddress(address_deployed);
//       setQuestonDeployed();
//       setdeployed(true);
//       setStateOfTransaction(2); // question is deployed.....

//       //code to post to the firebase...

//       // const docRef = await addDoc(collection(db, "Questions"), {
//       //   ques: result.transaction.contract_address,
//       //   user: window.tron.tronWeb.defaultAddress.base58.toString(),
//       //   name: formData.name,
//       //   diff: difficulty,
//       // });
      
//       setStateOfTransaction(3);
// //  function addAddress(address contractAdd, string memory _name, uint256 diffi)public {
// //    questions.push(Ques(contractAdd,_name,diffi));
// //  }
//       const functionSelector = 'addAddress(address,string,uint256)';
//       const parameter = [{type:'address',value:'ACCOUNT_ADDRESS'},{type:'uint256',value:100}]
//     const tx = await tronWeb.transactionBuilder.triggerSmartContract(process.env.Vite_NILE_BANK_ADD, functionSelector, {}, parameter);
//       const signedTx = await tronWeb.trx.sign(tx.transaction);
//       const result2 = await tronWeb.trx.sendRawTransaction(signedTx);
      
      
//       toast.success("Question SucessFully deployed !!!");
      
      
//       //we have to now run the contract addition call....
//       // const address_deployed = "TRiE8LhNeCacWftfiNPEayXzyi1d2irgB7";
//       //now we add this to the main contract...
//       // await AddToBank(address_deployed);
//       return address_deployed;
//     }
//     catch(err){
//       console.error(err);
//       setError(err);
//       toast.success("Error occured, failed to deploy the question");
//     }
//   };

//   return { DEPLOY, deployed, deployedAddress, error, stateOftransaction};
// }


import { useState } from "react";
import { useWallet } from "@tronweb3/tronwallet-adapter-react-hooks";
import { ABI } from "../utils/problems/index.js";
import { addDoc, collection } from "firebase/firestore";
import { toast } from "sonner";
import { db } from "@/firebaseConfig.js";
import { useTheContext } from "@/context";

export default function useDeployQuestion() {
  const { wallet, address, connected, select, connect, disconnect, signMessage, signTransaction } = useWallet();
  const { QuesBYTECODE, ABI_Bank, tronWeb } = useTheContext();
  
  const [error, setError] = useState(null);
  const [deployedAddress, setDeployedAddress] = useState(null);
  const [deployed, setDeployed] = useState(false);
  const [stateOfTransaction, setStateOfTransaction] = useState(0); 

  const DEPLOY = async (difficulty, formData, bounty) => {
    setDeployed(false);
    setStateOfTransaction(1); // Deploying the question
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_PINATA_JWT}`,
        "Content-Type": "application/json",
      },
      body: `{"pinataOptions":{"cidVersion":1},"pinataMetadata":{"name":"${formData.name.replace(/ /g, "_")}.json"},"pinataContent":${JSON.stringify(formData)}}`,
    };
    
    if (!window.tron.tronWeb.ready) {
      console.error("Cannot deploy, TronWeb not ready.");
      return;
    }
    
    try {
      const response = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", options);
      const jsonData = await response.json();
      const IpfsHash = jsonData.IpfsHash;

      const contractOptions = {
        feeLimit: 1000000000,
        callValue: 1000000 * bounty,
        userFeePercentage: 100,
        originEnergyLimit: 100,
        abi: ABI,
        bytecode: QuesBYTECODE,
        parameters: [
          formData.name,
          IpfsHash,
          window.tron.tronWeb.defaultAddress.base58.toString(),
          difficulty,
          import.meta.env.VITE_WEB_HANDLER.toString(),
        ],
        name: "Question",
      };

      const contract = await window.tron.tronWeb.transactionBuilder.createSmartContract(
        contractOptions,
        window.tron.tronWeb.defaultAddress.base58
      );

      const signedTxn = await window.tron.tronWeb.trx.sign(contract);
      const result = await window.tron.tronWeb.trx.sendRawTransaction(signedTxn);
      const addressDeployed = window.tron.tronWeb.address.fromHex(result.transaction.contract_address);

      setDeployedAddress(addressDeployed);
      setDeployed(true);
      setStateOfTransaction(2); // Question deployed

      await addDoc(collection(db, "Questions"), {
        ques: result.transaction.contract_address,
        user: window.tron.tronWeb.defaultAddress.base58.toString(),
        name: formData.name,
        diff: difficulty,
      });

      setStateOfTransaction(3); // Ready for bank transaction

      toast.success("Question successfully deployed!");

      const bank_contract = await window.tronLink.tronWeb.contract(
        ABI_Bank,
        import.meta.env.VITE_NILE_BANK_ADD,
      );
    //   //in the name we are going to save the name of the question +signer..
    //   // name:0xfdfrjfdsf
      setStateOfTransaction(4);
      const tsnData = await bank_contract.addAddress(addressDeployed,formData.name+"|TBJfBkWVR9rLdCVuUYWjTcAWEjQpGgrB9v",difficulty).send();
      console.log(tsnData);
      setStateOfTransaction(5);
      // return addressDeployed;

    } catch (err) {
      console.error(err);
      setError(err);
      toast.error("Error occurred, failed to deploy the question");
    }
  };

  return { DEPLOY, deployed, deployedAddress, error, stateOfTransaction };
}
