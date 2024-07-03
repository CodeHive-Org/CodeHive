import { createContext, useContext, useState, useEffect  } from "react";
import { TronWeb } from "tronweb";
import { ABI, ABI_Bank, QuesBYTECODE } from "../utils/problems";

const tronWeb = new TronWeb({
    fullHost: import.meta.env.VITE_TRON_HOST,
    privateKey: import.meta.env.VITE_TRON_PRIVATE_KEY
});
const thisContext = createContext();

export default function ContextProvierAllOver({ children }) {
    const [ address, setAddress ] = useState();
    const [tronWebState, setTronWebState] = useState({
        installed: false,
        loggedIn: false,
    });
    const update = ()=>{
        if (window.tronWeb) {
            setTronWebState({
                installed: true,
                loggedIn: window.tronWeb.defaultAddress.base58 ? true : false,
            });
        } else {
            setTronWebState({
                installed: false,
                loggedIn: false,
            });
        }
    }
    useEffect(() => {
        update();
    }, []);

    return (
        <thisContext.Provider
            value={{
                address,
                tronWebState, setTronWebState,
                update, 
                tronWeb,
                ABI_Bank,
                ABI,
                QuesBYTECODE,
                // cryptr,
            }}
        >
            {children}
        </thisContext.Provider>
    );
}

export const useTheContext = () => {
    return useContext(thisContext);
};
