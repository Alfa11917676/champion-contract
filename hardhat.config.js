// hardhat.config.js
require("@nomiclabs/hardhat-ethers");
require('@openzeppelin/hardhat-upgrades');
const { mnemonic } = require('./secrets.json');
require("hardhat-abi-exporter");
require('dotenv').config()
require("@nomiclabs/hardhat-etherscan");


/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {


  mocha: {
      reporter: 'eth-gas-reporter',
      reporterOptions : {
          
      }
    },
  
  abiExporter: {
    path: './abi/pretty',
    pretty : false
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    testnet :{
      url:"https://api.s0.b.hmny.io", 
      accounts: {
        mnemonic : process.env.MNEMONIC
      },
      chainId:1666700000,
    },
    mainnet : {
      url: "https://harmony-0-rpc.gateway.pokt.network",
      //rl:"https://api.harmony.one",
      accounts: {mnemonic : mnemonic},
      chainId:1666600000,
    }
  },
  solidity: {

    compilers: [
        {
          version: "0.8.3",
        },
      ]
    },
    mocha:{
      timeout:1000000
    }, 
  etherscan: {
    apiKey: {
      harmony: '9NFEI7SP376EANMKFIGREZ2C5UBAWJNC95'
    }
  }
    
  
  };

