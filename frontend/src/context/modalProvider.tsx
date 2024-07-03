import { createContext, useContext, useState, useEffect  } from "react";

const modalProvider = createContext();

export default function ContextProvierAllOver({ children }) {
    // console.log("secret here",import.meta.env.VITE_CRYPTR_SECRET);
    // const cryptr = new Cryptr(import.meta.env.VITE_CRYPTR_SECRET);
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
                value: 'TVqg8LtwSj93WX3VREbqGuHNjTMUVPR7GC',
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
        .then(data => {setQuesBYTECODE(data.smart_contract.bytecode);setABI(data.smart_contract.abi)})
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
            console.log(response);
            return response.json();
        })
        .then(data => {console.log(data);setABI_Bank(data.smart_contract.abi.entrys);console.log(data.smart_contract);})
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
