import { useMemo } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "./index.css";
import AddQuestion from "./pages/AddQuestion";
import Landing from "./pages/Landing";
import MyQuestionDesc from "./pages/MyQuestionDesc";
import MyQuestions from "./pages/MyQuestions";
import ProblemDesc from "./pages/ProblemDesc";
import Problems from "./pages/Problems.";
//importing buffer tronweb access
import { Buffer } from "buffer";

import {
  WalletDisconnectedError,
  WalletNotFoundError,
} from "@tronweb3/tronwallet-abstract-adapter";
import {
  WalletProvider
} from "@tronweb3/tronwallet-adapter-react-hooks";
import { WalletModalProvider } from "@tronweb3/tronwallet-adapter-react-ui";
import "@tronweb3/tronwallet-adapter-react-ui/style.css";
import { TronLinkAdapter } from "@tronweb3/tronwallet-adapter-tronlink";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { authTokenState, userState } from "./atoms/userAtom";
import AlertModal from "./components/ui/AlertModal";
import { jwtDecode } from "jwt-decode";

globalThis.Buffer = Buffer;

// wallet connection imports

function App() {
  window.global = window;

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

  useEffect(() => {
    adapters[0].on("chainChanged", (data) => {
      console.log("chainChanged", JSON.stringify(data));
    });
  });

  const setAuthToken = useSetRecoilState(authTokenState);
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    if (token) {
      setAuthToken(token);
      const decoded = jwtDecode(token);
      setUser(decoded?.user);
    }
  }, [setAuthToken]);

  return (
    <>
      <WalletProvider onError={onError} adapters={adapters}>
        <WalletModalProvider>
          {/* Place your app's components here */}
          <main className="dm-sans dark bg-black to-background text-foreground">
            <AlertModal />

            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="problems/:pid" element={<ProblemDesc />} />
                <Route path="myquestion/:pid" element={<MyQuestionDesc />} />
                <Route path="/myquestion" element={<MyQuestions />} />
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
