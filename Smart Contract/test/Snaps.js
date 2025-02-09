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
  describe("Checking function captureSnap :", () => {
    let myFirstSnap, snapCountBefore,snapCountAfter;
    beforeEach(async () => {
      snapCountBefore = await dApp.snapCount();
      myFirstSnap = await dApp.connect(user2).captureSnap("https://ipfs.io/ipfs/QmTYEboq8raiBs7GTUg2yLXB3PMz6HuBNgNfSZBx5Msztg/camera.jpg");
      await myFirstSnap.wait();
      snapCountAfter = await dApp.snapCount();
    })
    it("Check if snapCount is working properly :", async () => {
      console.log("Old snap Count : ", snapCountBefore);
      console.log("New snap Count:", snapCountAfter);

      expect(snapCountAfter).to.equal(snapCountBefore+ BigInt(1));
    })
    it("Check snapCaptured working :", async () => {
      const mostRecentBlock = await ethers.provider.getBlock("latest");
      const timestamp = mostRecentBlock.timestamp;
      await expect(myFirstSnap).to.emit(dApp, "SnapCaptured").withArgs(snapCountAfter, user2.address, "https://ipfs.io/ipfs/QmTYEboq8raiBs7GTUg2yLXB3PMz6HuBNgNfSZBx5Msztg/camera.jpg", timestamp);
    })
  });

})