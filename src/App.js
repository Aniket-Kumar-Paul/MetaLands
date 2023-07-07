import "./App.css";
import Web3 from "web3";
import { useState, useEffect } from "react";

// import abi
import Land from "./abis/Land.json";

// import components

function App() {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);

  // Contract & Contract States
  const [landContract, setLandContract] = useState(null);

  const [cost, setCost] = useState(0);
  const [buildings, setBuildings] = useState(null);
  const [landId, setLandId] = useState(null);
  const [landName, setLandName] = useState(null);
  const [landOwner, setLandOwner] = useState(null);
  const [hasOwner, setHasOwner] = useState(false);

  useEffect(() => {
    loadBlockchainData();
  }, [account]);

  const loadBlockchainData = async () => {
    // check if MetaMask exists
    if (typeof window.ethereum !== "undefined") {
      const web3 = new Web3(window.ethereum);
      setWeb3(web3);

      const accounts = await web3.eth.getAccounts();

      if (accounts.length > 0) {
        setAccount(accounts[0]);
      }

      const networkId = await web3.eth.net.getId();
      // Land.networks[networkId].addressdeployed address of the contract on the current network
      const land = new web3.eth.Contract(
        Land.abi,
        Land.networks[networkId].address
      );
      setLandContract(land);

      const cost = await land.methods.cost().call();
      setCost(web3.utils.fromWei(cost.toString(), "ether"));

      const buildings = await land.methods.getBuildings().call();
      setBuildings(buildings);

      window.ethereum.on("accountsChanged", (accounts) => {
        setAccount(accounts[0]);
      });

      window.ethereum.on("chainChanged", (chainId) => {
        window.location.reload();
      });
    }
  };

  return <div>Hi</div>;
}

export default App;
