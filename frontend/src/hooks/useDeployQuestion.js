import { useTheContext } from "@/context";
import { useState } from "react";
import { useWallet } from "@tronweb3/tronwallet-adapter-react-hooks";
import { ABI } from "../utils/problems/index.js"
import { addDoc, collection } from "firebase/firestore";
import { toast } from "sonner";
import { db } from "@/firebaseConfig.js";

export default function useDeployQuestion() {
  const {
    wallet,
    address,
    connected,
    select,
    connect,
    disconnect,
    signMessage,
    signTransaction,
  } = useWallet();
  const { QuesBYTECODE, ABI_Bank, tronWeb } = useTheContext();
  const [error, setError] = useState(null);
  const [deployedAddress, setDeployedAddress] = useState(null);
  const [deployed, setdeployed] = useState(true);

  // const AddToBank = async (address) => {
  //   try{
  //     console.log(tronWeb);
  //     const contract = await tronWeb.trx.contract(
  //       ABI_Bank,
  //       import.meta.env.VITE_NILE_BANK_ADD,
  //     );
  //     console.log(contract)
  //     return;
  //   }
  //   catch(err){
  //     console.log(err);
  //     return;
  //   }
  //   const questions = await contract.questionList().call();
  //   setProblems(questions);
  //   setLoading(false);
  //   console.log(questions);
  // };

  const DEPLOY = async (difficulty, formData, bounty) => {
    setdeployed(false);
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_PINATA_JWT}`,
        "Content-Type": "application/json",
      },
      body: `{"pinataOptions":{"cidVersion":1},"pinataMetadata":{"name":"${formData.name.replace(/ /g, "_")}.json"},"pinataContent":${JSON.stringify(formData)}}`,
    };
    if (!window.tron.tronWeb.ready) {
      console.error("cant deploy tron undefined.");
      return;
    }
    const data = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", options)
    const jsonData = await data.json();
    const IpfsHash = jsonData.IpfsHash;
    // const IpfsHash = "bafkreiafjezwdv4uxezin6jvsew4o5eivvro7qblogibow74crgxrrecxi";
    console.log('formData.name:', formData.name);
console.log('IpfsHash:', IpfsHash);
console.log('defaultAddress:', window.tron.tronWeb.defaultAddress.base58.toString());
console.log('difficulty:', difficulty);
console.log('VITE_WEB_HANDLER:', import.meta.env.VITE_WEB_HANDLER.toString());
    console.log(IpfsHash, ABI, typeof QuesBYTECODE);
    try{
      const options = {
        feeLimit: 1000000000, //The maximum TRX burns for resource consumption（1TRX = 1,000,000SUN）
        callValue: 1000000 * bounty, //The TRX transfer to the contract for each call（1TRX = 1,000,000SUN）
        userFeePercentage: 100, //Consume user's resource percentage. It should be an integer between [0, 100]. if 0, means it does not consume user's resource until the developer's resource has been used up
        originEnergyLimit: 100, //The maximum resource consumption of the creator in one execution or creation
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
      const contract = await  window.tron.tronWeb.transactionBuilder.createSmartContract(
        options,
        window.tron.tronWeb.defaultAddress.base58,
      );
      console.log("the contract made =>", contract);
      //signing the txn...
      const signedTxn = await window.tron.tronWeb.trx.sign(contract);
      const result = await window.tron.tronWeb.trx.sendRawTransaction(signedTxn);
      console.log("result babo",result);
      const address_deployed = window.tron.tronWeb.address.fromHex(result.transaction.contract_address);
      setDeployedAddress(address_deployed);
      setdeployed(true);

      //code to post to the firebase...

      const docRef = await addDoc(collection(db, "Questions"), {
        ques: result.transaction.contract_address,
        user: window.tron.tronWeb.defaultAddress.base58.toString(),
        name: formData.name,
        diff: difficulty,
      });
      if(docRef){
      }
      toast.success("Contract deployed, will be added soon to dashboard after a review!");



      //we have to now run the contract addition call....
      // const address_deployed = "TRiE8LhNeCacWftfiNPEayXzyi1d2irgB7";
      //now we add this to the main contract...
      // await AddToBank(address_deployed);
      return address_deployed;
    }
    catch(err){
      console.error(err);
      setError(err);
      toast.success("Error occured, failed to deploy the question");
    }
  };

  return { DEPLOY, deployed, deployedAddress, error };
}
