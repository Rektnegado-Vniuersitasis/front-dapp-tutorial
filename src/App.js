import logo from './logo.svg';
import './App.css';
import Web3 from "web3";
import { useEffect } from 'react'
import axios from 'axios'

const RPC_URL = "https://rpc-mainnet.maticvigil.com";
const API_URL = `https://api.polygonscan.com/api?module=contract&action=getabi&address=0x0184316f58B9A44aCDD3e683257259dC0CF2202a&apikey=Tu_api_key`
var abiContract = null;

function App() {

  const httpProvider = new Web3.providers.HttpProvider(RPC_URL, {
    timeout: 10000,
  });
  
  /**
   * Provides a web3 instance using our own private provider httpProver
   */
  const getWeb3 = () => {
    const web3 = new Web3(httpProvider);
    return web3;
  };
  
  const getContract = () => {
    const web3 = getWeb3();

    const myContract = new web3.eth.Contract(JSON.parse(abiContract), '0x0184316f58B9A44aCDD3e683257259dC0CF2202a');
    console.log('contract -> ', myContract)
    return myContract;
  };

  useEffect( () => {
      getABI()
  }, [])

  async function getABI() {
    try {
      const response = await axios.get(API_URL);
      const status = response.data.status;
      if (status == 0) {
        // traer el abi del json
        abiContract = plantilla
      }
      abiContract = response.data.result
    } catch (error) {
      console.error(error);
    }
  }

  const totalSupply = async () => {
    const supply = await getContract();
    const total = await supply.methods.totalSupply().call()
    console.log('Total ', total)
  }
  
  return (
    <div className="App">
      <input placeholder="Address Contract "/>
      <button onClick={getContract}>Get Contract</button>
      <button onClick={totalSupply}>Get Supply</button>
      <p>Total: </p>
    </div>
  );
}

export default App;