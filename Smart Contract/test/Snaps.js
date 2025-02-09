const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");


describe("Snaps", function () {
  let user1, user2, dApp;
  beforeEach(async () => {
    //get users adrress
    [user1, user2] = await ethers.getSigners();
    // console.log("User 1 address : ", user1.address);
    // console.log("User 2 address : ", user2.address);

    //deploying the contract
    const Dapp = await ethers.getContractFactory("Snaps_Contract");
    dApp = await Dapp.deploy();
    // dAppaddress = await dApp.owner();
    // console.log(dAppaddress);

  });
  describe("Deployment Check : ", () => {
    it("Cheking the owner : ", async () => {
      expect(await dApp.owner()).to.equal(user1.address); //as hardhat assgins the owner of the contract as the first account from signers if not specified
    })
  });
  describe("Capturing Snaps :", () => {
    let transaction;
    beforeEach(async () => {
      // List a item
      //if you change deployer to buyer it wont work 
      // as we speiced in the modifier that only the deployer acc 
      // or more specifically the 1st acc that gets set when calling dApp.deploy() from hardhat netwrok
      //is stored in owner and owner == 1st acc (deployer) or else break 
      transaction = await dApp.connect(deployer).list(ID, NAME, CATEGORY, IMAGE, COST, RATING, STOCK);
      await transaction.wait();
    })
  });

})