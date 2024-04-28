import { useTheContext } from "@/context";
import { useState } from 'react';
import { useWallet } from "@tronweb3/tronwallet-adapter-react-hooks";

export default function useDeployQuestion(){
    const { wallet, address, connected, select, connect, disconnect, signMessage, signTransaction } = useWallet();
    console.log(address);
    const { ABI, QuesBYTECODE } = useTheContext(); 
    const [ error, setError ] = useState(null);
    const [ deployedAddress, setDeployedAddress ] = useState(null);
    const [ deployed, setdeployed ] = useState(false);


    const DEPLOY = (difficulty, formData, bounty)=>{

        //first deploy the ipfs thingy....
        
        //first deployment to pinat.. man....
        //this goes away... man...
        const options = {
            method: 'POST',
            headers: {Authorization: `Bearer ${import.meta.env.VITE_PINATA_JWT}`, 'Content-Type': 'application/json'},
            body: `{"pinataOptions":{"cidVersion":1},"pinataMetadata":{"name":"${formData.name.replace(/ /g, "_")}.json"},"pinataContent":${JSON.stringify(formData)}}`
        };
        if(!window.tron.tronWeb.ready){
            console.error("cant deploy tron undefined.");
            console.log(window.tron.tronWeb);
            return;
        }
        fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', options)
        .then(response => response.json())
        .then(response => response.IpfsHash)
        .then((res)=>{
            console.log("pinata deployed at :",res);
        // (string memory _name, string memory _quesData, address _mod, uint16 _diff, address _webHandler)
            console.log(ABI,QuesBYTECODE);

            const options = {
                feeLimit: 1000000000,//The maximum TRX burns for resource consumption（1TRX = 1,000,000SUN）
                callValue: 10,//The TRX transfer to the contract for each call（1TRX = 1,000,000SUN）
                userFeePercentage: 100,//Consume user's resource percentage. It should be an integer between [0, 100]. if 0, means it does not consume user's resource until the developer's resource has been used up
                originEnergyLimit: 100,//The maximum resource consumption of the creator in one execution or creation
                abi: ABI,
                bytecode: QuesBYTECODE,
                parameters:[formData.name, res, window.tron.tronWeb.defaultAddress.base58.toString(), difficulty, import.meta.env.VITE_WEB_HANDLER.toString()],
                name:"Question",
              };
            return window.tron.tronWeb.transactionBuilder.createSmartContract(options,window.tron.tronWeb.defaultAddress.base58);



            const pro = window.tron.tronWeb.contract().new({
                abi: ABI,
                bytecode: QuesBYTECODE,
                feeLimit: 40000000000,
                callValue: parseInt(bounty)* 1000000,
                userFeePercentage: 100,
                originEnergyLimit: 1e7,
                parameters: [formData.name, res, window.tron.tronWeb.defaultAddress.base58.toString(), difficulty, import.meta.env.VITE_WEB_HANDLER.toString()],
            });
            pro.then((res)=>{console.log("something",res)}).catch(err=>console.log(err));
            throw new Error("not implemented yet");
            return window.tron.tronWeb.contract().new({
                abi: ABI,
                bytecode: QuesBYTECODE,
                feeLimit: 40000000000,
                callValue: parseInt(bounty)* 1000000,
                userFeePercentage: 100,
                originEnergyLimit: 1e7,
                parameters: [formData.name, res, window.tron.tronWeb.defaultAddress.base58.toString(), difficulty, import.meta.env.VITE_WEB_HANDLER.toString()],
            });
        })
        .then((contract)=>{
            console.log("the contract made =>", contract);
            //signing the txn...
            return window.tron.tronWeb.trx.sign(contract);
        })
        .then(( signedTransaction )=>{
            console.log("the txn is signed.... =>", signedTransaction);
            return window.tron.tronWeb.trx.sendRawTransaction(signedTransaction);           
        })
        .then((resultBaby)=>{
            console.log("result =>",resultBaby);
        })
            .catch((err)=>{
                console.error(err);
                alert("error occured!");
                setError(err);
            })
        }
            
    return {DEPLOY, deployed, deployedAddress, error}
} 