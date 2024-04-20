import React, { useEffect, useState } from 'react';
import { useTheContext } from '.';

const ConnectButton = () => {
  const { tronWebState, update } = useTheContext();
  
  const connectWallet = async () => {
    if (window.tronWeb && window.tronWeb.ready) {
      // TronLink is installed and connected
      console.log('TronLink is installed and connected');
    } else {
      // TronLink is not installed or not connected
        if(tronWebState.installed){
          //if installed....
            await window.tronWeb.trx;
            update((v)=>!v);
        }   
        else{
            console.log('TronLink is not installed or not connected'); 
        }
    }
  };  
  //creating a loop that constantly checks fro the 
    //console.log(window.tronWeb.defaultAddress.base58);

  return (
    <button onClick={connectWallet}>
      { !tronWebState.installed ? <span className="bg[#be123ce6] test-white p-2 rounded">Install TronLink</span> : tronWebState.loggedIn ? <span className="bg-[#262626] text-white p-2 rounded">Connected</span> : <span className="bg-[#338c23] text-white p-2 rounded">Connect</span> }
    </button>
  );
};

export default ConnectButton;