import { createContext, useContext, useState, useEffect  } from "react";
import { TronWeb } from "tronweb";

const tronWeb = new TronWeb({
    fullHost: import.meta.env.VITE_TRON_HOST,
    privateKey: import.meta.env.VITE_TRON_PRIVATE_KEY
});
console.log(tronWeb);
const thisContext = createContext();

export default function ContextProvierAllOver({ children }) {
    const [ address, setAddress ] = useState();
    const [ BankContract, setContract  ] = useState();//the bank  contract here....
    const [ ABI, setABI ] = useState([]);
    const [ QuesBYTECODE, setQuesBYTECODE] = useState();
    const [ ABI_Bank, setABI_Bank ] = useState([]);
    
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
        //fetching the abi....
        fetch(import.meta.env.VITE_TRONQL_ENDPOINT+'wallet/getcontractinfo', {
            method: 'POST',
            headers: {
                'Authorization': import.meta.env.VITE_TRONQL_API_KEY,
                'accept': 'application/json',
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                value: 'TV1emh8NCzQt5yiiSWyxg8hg18J3wjMQZ4',
                visible: true
            })
        })
        .then(response => {
            if (!response.ok) {
                console.log("cant fetch the abi....");
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {setQuesBYTECODE(data.smart_contract.bytecode);setABI(data.smart_contract.abi.entrys)})
        .catch(error => {console.error('There was a problem with the fetch operation:', error)});
        //fetching the bank abi..
        fetch(import.meta.env.VITE_TRONQL_ENDPOINT+'wallet/getcontractinfo', {
            method: 'POST',
            headers: {
                'Authorization': import.meta.env.VITE_TRONQL_API_KEY,
                'accept': 'application/json',
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                value: import.meta.env.VITE_NILE_BANK_ADD,
                visible: true
            })
        })
        .then(response => {
            if (!response.ok) {
                console.log("cant fetch the abi....");
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {setABI_Bank(data.smart_contract.abi.entrys);console.log(data.smart_contract);})
        .catch(error => {console.error('There was a problem with the fetch operation:', error)});


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
            }}
        >
            {children}
        </thisContext.Provider>
    );
}

export const useTheContext = () => {
    return useContext(thisContext);
};
