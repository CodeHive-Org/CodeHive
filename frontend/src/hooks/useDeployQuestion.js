import { questionAddStatus } from "@/atoms/problemAtom.js";
import { useTheContext } from "@/context";
import { useCallback, useState } from "react";
import { useRecoilState } from "recoil";
import { toast } from "sonner";
import { ABI } from "../utils/problems/index.js";
import { signMessageWithTimeConstraint } from "./SigMessage.js";

export default function useDeployQuestion() {
  const { QuesBYTECODE, ABI_Bank } = useTheContext();

  const [error, setError] = useState(null);
  const [deployedAddress, setDeployedAddress] = useState(null);
  const [deployed, setDeployed] = useState(false);
  const [stateOfTransaction, setStateOfTransaction] = useState(-1);

  const [, setStatus] = useRecoilState(questionAddStatus);

  const DEPLOY = useCallback(async (formData, bounty) => {
    setStateOfTransaction(0); // Deploying the question
    setStatus(0);

    // const txnData = await signMessageWithTimeConstraint();

    // pushing the question's data to server
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // tron_message: txnData.message,
        // tron_signature: txnData.signature,
      },
      body: JSON.stringify({
        ...formData,
        bounty : Number(bounty),
        bounterId: "cm1i48vnc0000ohkr622814lt",
        // TODO : made this dynamic but before implement the auth logic
      }),
    };

    if (!window.tron.tronWeb.ready) {
      console.error("Cannot deploy, TronWeb not ready.");
      setError("TronWeb not ready");
      return;
    }

    try {
      const response = await fetch(
        import.meta.env.VITE_BACKEND_URL + "/problems",
        options,
      );
      const jsonData = await response.json();

      console.log("jsonData ; ", jsonData);
      setStatus(1);

      await new Promise((res) =>
        setTimeout(() => {
          setStatus(3);
          return res;
        }, 3000),
      );
    } catch (err) {
      console.error(err);
      setError(err);
      setStateOfTransaction(-1);
      setStatus(-1);
      toast.error("Error occurred, failed to deploy the question");
    }

    // TODO : write the logic to send bounty value to the codehive wallet

    //     const contractOptions = {
    //       feeLimit: 1000000000,
    //       callValue: 1000000 * bounty,
    //       userFeePercentage: 100,
    //       originEnergyLimit: 20,
    //       abi: ABI,
    //       bytecode: QuesBYTECODE,
    //       parameters: [
    //         formData.name,
    //         // IpfsHash,
    //         window.tron.tronWeb.defaultAddress.base58.toString(),
    //         difficulty,
    //       ],
    //       name: "Question",
    //     };

    //     const contract =
    //       await window.tron.tronWeb.transactionBuilder.createSmartContract(
    //         contractOptions,
    //         window.tron.tronWeb.defaultAddress.base58,
    //       );

    //     const signedTxn = await window.tron.tronWeb.trx.sign(contract);

    //     const result =
    //       await window.tron.tronWeb.trx.sendRawTransaction(signedTxn);
    //     const addressDeployed = window.tron.tronWeb.address.fromHex(
    //       result.transaction.contract_address,
    //     );

    //     // calling the nestjs core api here
    //     if (result) {
    //       // write the nestjs api calling logic here
    //     }
    //     setDeployedAddress(addressDeployed);
    //     setDeployed(true);
    //     setStateOfTransaction(1); // Question deployed
    //     setStatus(1);
    //     toast.success("Question successfully deployed!");

    //     const bank_contract = await window.tronLink.tronWeb.contract(
    //       ABI_Bank,
    //       import.meta.env.VITE_NILE_BANK_ADD,
    //     );

    //     setStateOfTransaction(2); // Ready for bank transaction
    //     setStatus(2);

    //     const tsnData = await bank_contract
    //       .addAddress(
    //         addressDeployed,
    //         formData.name + "|" + window.tronLink.tronWeb.defaultAddress.base58,
    //         difficulty,
    //       )
    //       .send();

    //     console.log(tsnData);
    //     setStateOfTransaction(3);
    //     setStatus(3);
    //   } catch (err) {
    //     console.error(err);
    //     setError(err);
    //     setStateOfTransaction(-1);
    //     setStatus(-1);
    //     toast.error("Error occurred, failed to deploy the question");
    //   }
  }, []);

  return { DEPLOY, deployed, deployedAddress, error, stateOfTransaction };
}
