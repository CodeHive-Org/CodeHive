import { useAddress } from "@thirdweb-dev/react";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "./index.css";
import AccountSettings from "./pages/AccountSettings";
import AddQuestion from "./pages/AddQuestion";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import ProblemDesc from "./pages/ProblemDesc";
import Problems from "./pages/Problems.";
import Signup from "./pages/Signup";

function App() {
  const address = useAddress();
  const data = JSON.parse(localStorage.getItem("user"));

  console.log('datra : ', data);

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

  useEffect(() => {
    userWalletHanlder();
  }, [address]);

  return (
    <main className="dark bg-gradient-to-br from-[#0F1522] to-background to text-foreground bg-black">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="problems/:pid" element={<ProblemDesc />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/accountsettings" element={<AccountSettings />} />
          <Route path="/addquestion" element={<AddQuestion />} />
          <Route path="/problems" element={<Problems />} />
          <Route path="/problems/problem/*" element={<ProblemDesc />} />
          {/* <Route path="*" element={<NoPage />} /> */}
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
