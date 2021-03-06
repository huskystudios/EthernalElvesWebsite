import { useEffect, useState, useRef } from "react";
import {
  getCurrentWalletConnected, //import here
  connectWallet, getUsername, balanceOf
} from "./utils/interact.js";



import Button from 'react-bootstrap/Button'
const ConnectWallet = (props) => {
 
  //State variables
  const [walletAddress, setWallet] = useState("");

  const [username, setUsername] = useState();
  const [status, setStatus] = useState("");
  const [isMetamask, setIsMetamask] = useState(false);
 

  useEffect(async () => {
    const {address, status} = await getCurrentWalletConnected();
    setWallet(address)
   // setUsername(await getUsername(address))
    
    setStatus(status);
    addWalletListener(); 
    isMetaMaskInstalled();
}, []);

  
const connectWalletPressed = async () => {
  const walletResponse = await connectWallet();
  setStatus(walletResponse.status);
  setWallet(walletResponse.address);
  
};

function addWalletListener() {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setWallet(accounts[0]);
        setStatus("");
      } else {
        setWallet("");
        setStatus("🦊 Connect to Metamask using the top right button.");
      }
    });
  } else {
    setStatus(
      <p>
        {" "}
        🦊{" "}
        <a target="_blank" href={`https://metamask.io/download.html`}>
          You must install Metamask, a virtual Ethereum wallet, in your
          browser.
        </a>
      </p>
    );
  }
}

const isMetaMaskInstalled = async () => {
  if (window.ethereum){     
    setIsMetamask(window.ethereum.isMetaMask)
  }
}


  return (
   
    <>
{isMetamask ? (
<>
<button variant="light" onClick={connectWalletPressed}>
{walletAddress.length > 0 ? (
  "Connected: " +
  String(walletAddress).substring(0, 6) +
  "..." +
  String(walletAddress).substring(38)

) : (
  <span>Connect Wallet</span>
)}
</button>

</>

    ) : (

      <Button 
      variant="light"
      onClick={(e) => {
        e.preventDefault();
        window.location.href='https://metamask.app.link/dapp/ethernalelves.com/whitelist';
        }}
  >Get Metamask</Button>

    ) }




</>  

  );
};

export default ConnectWallet;


