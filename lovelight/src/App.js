import React, { useState } from 'react';
import { ethers } from 'ethers';
import './App.css';

function App() {
  const [address, setAddress] = useState('');
  const [abi, setAbi] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const provider = new ethers.providers.JsonRpcProvider("https://eth.llamarpc.com"); // free public node
      const code = await provider.getCode(address);
      if (code === '0x') {
        setError('No contract found at this address.');
        return;
      }

      const abiResponse = await fetch(`https://api.etherscan.io/api?module=contract&action=getabi&address=${address}&apikey=73PMW9VTSWC6S7B5ZQBXMU8W6D7IURK7NX`);
      const abiData = await abiResponse.json();

      if (abiData.status !== "1") {
        setError('Unable to fetch ABI.');
        return;
      }

      setAbi(JSON.parse(abiData.result));
    } catch (err) {
      setError('Invalid address or network error.');
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="enter ethereum contract address"
        />
        <button type="submit">Reveal</button>
      </form>

      {error && <p className="error">{error}</p>}
      {abi && <p className="success">ABI fetched. Layer Ø is humming.</p>}
    </div>
  );
}

export default App;
