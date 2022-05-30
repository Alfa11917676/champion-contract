const { default: BigNumber } = require('bignumber.js');
const { expect, assert,emit } = require('chai');
var chai = require('chai');
const { ethers, upgrades } = require("hardhat");
//use default BigNumber
chai.use(require('chai-bignumber')());

// Start test block
describe('Token', function () {
  let owner;
  let addr1;
  let addr2;
  let addr3;
  const provider = ethers.provider
  let Token;
  beforeEach(async function () {
    hToken = await ethers.getContractFactory("Champion");
    
    [owner, addr1, addr2, addr3] = await ethers.getSigners();
    Token = await hre.upgrades.deployProxy(hToken,{initializer:'initialize'}, {kind: 'uups'});
    await Token.deployed();
    await Token.setMintActivity(true)
  });

  // Test case
  describe("Deployment", function() {
  it ('deploy new contract and check wheather the base uri has changed or not', async ()=>{
    await Token.safeMint(addr1.address,{value: ethers.utils.parseEther('750')})
    console.log('The balance of add1 before upgrade ',await Token.balanceOf(addr1.address))
    let address= Token.address
    const newChampion = await ethers.getContractFactory('ProxyChampion')
    proxy = await hre.upgrades.upgradeProxy(address,newChampion)
    await proxy.deployed();
    await proxy.setBaseURI('https://lol.com')
    console.log('The balance of add1 after upgrade ',await  proxy.balanceOf(addr1.address))
  })
  });

});