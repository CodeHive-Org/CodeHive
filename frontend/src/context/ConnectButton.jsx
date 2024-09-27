import LoginButton from "@/components/LoginButton";
import { useWallet } from "@tronweb3/tronwallet-adapter-react-hooks";
import { WalletActionButton } from "@tronweb3/tronwallet-adapter-react-ui";
import { Toaster } from "sonner";

const ConnectButton = () => {
  // const { tronWebState, update } = useTheContext();

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

  return (
    <>
      <LoginButton />
      {/* <WalletActionButton /> */}
      <Toaster richColors />
    </>
  );
};

export default ConnectButton;
