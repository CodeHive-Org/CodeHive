import { useMemo } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "./index.css";
import AccountSettings from "./pages/AccountSettings";
import AddQuestion from "./pages/AddQuestion";
import Landing from "./pages/Landing";
import ProblemDesc from "./pages/ProblemDesc";
import Problems from "./pages/Problems.";
//importing buffer tronweb access
import { Buffer } from "buffer";

import {
  WalletDisconnectedError,
  WalletNotFoundError,
} from "@tronweb3/tronwallet-abstract-adapter";
import { WalletProvider } from "@tronweb3/tronwallet-adapter-react-hooks";
import { WalletModalProvider } from "@tronweb3/tronwallet-adapter-react-ui";
import "@tronweb3/tronwallet-adapter-react-ui/style.css";
import { TronLinkAdapter } from "@tronweb3/tronwallet-adapter-tronlink";
globalThis.Buffer = Buffer;

// wallet connection imports

function App() {
  window.global = window;

  const address = null;
  const data = JSON.parse(localStorage.getItem("user"));

  const userWalletHanlder = async () => {
    // try {
    //   const reponse = await axios.post(
    //     "http://localhost:8000/api/add_user_wallet",
    //     {
    //       user_id: data.user.user_id,
    //       sol_addr: String(address)
    //     },
    //     {
    //       headers: {
    //         "Content-Type": "application/x-www-form-urlencoded"
    //       }
    //     }
    //   );
    //   console.log('response : ', reponse);
    //   // Reset form after successful submission
    //   // Handle success or redirect user
    // } catch (error) {
    //   // Handle error
    //   console.error("Error adding user wallet:", error);
    // }
  };

  // useEffect(() => {
  //   userWalletHanlder();
  // }, [address]);

  function onError(e) {
    if (e instanceof WalletNotFoundError) {
      // some alert for wallet not found
    } else if (e instanceof WalletDisconnectedError) {
      // some alert for wallet not connected
    } else {
      console.error(e.message);
    }
  }
  const adapters = useMemo(function () {
    const tronLink = new TronLinkAdapter();
    return [tronLink];
  }, []);

  return (
    <>
      <WalletProvider onError={onError} adapters={adapters}>
        <WalletModalProvider>
          {/* Place your app's components here */}
          <main className="dm-sans dark bg-black to-background text-foreground">
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="problems/:pid" element={<ProblemDesc />} />
                <Route path="/accountsettings" element={<AccountSettings />} />
                <Route path="/addquestion" element={<AddQuestion />} />
                <Route path="/problems" element={<Problems />} />
                <Route path="/problems/problem/*" element={<ProblemDesc />} />
              </Routes>
            </BrowserRouter>
          </main>
        </WalletModalProvider>
      </WalletProvider>
    </>
  );
}

export default App;
