import { ethers } from "ethers";
import { useState, useEffect } from "react";
//Outlet for rendering child components based on the current route
import { Outlet } from "react-router-dom";

//utils
import abi from "./utils/abi.json";
import config from "./utils/config.json";

//components
import Header from "./components/Header";
import ExploreSnap from "./components/ExploreSnap";
import UploadSnap from "./components/UploadSnap";
import "./App.css";

function App() {
  //metamask acc
  const [account, setAccount] = useState(null);

  //connection with smartcontract dapp
  const [provider, setProvider] = useState(null);
  const [dApp, setdApp] = useState(null);

  const loadBcData = async () => {
    try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    setProvider(provider);

      //fetching our etherem network in our case localhost.
   const network = await provider.getNetwork();
      //this gets you what network u are using.
      console.log(network);

 const dApp = new ethers.Contract(
      config[network.chainId].Snaps.address,
      abi,
      provider
    );
    setdApp(dApp);

    } catch (error) {
      console.error("Error loading contract data:", error);
    }
  };
  useEffect(() => {
    loadBcData();
  }, []);
  return (
    <div>
      <Header account={account} setAccount={setAccount} />
      <h1>{account}</h1>
      {provider && dApp ? (
        <Outlet context={{provider, dApp }} />
      ) : (
        <p>Loading Web3 connection...</p>
      )}
    </div>
  );
}

export default App;
