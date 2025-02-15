const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");


describe("Snaps", function () {
  let user1, user2,user3, dApp;
  beforeEach(async () => {
    //get users adrress
    [user1, user2,user3] = await ethers.getSigners();
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
    let myFirstSnap, snapCountBefore, snapCountAfter;
    beforeEach(async () => {
      snapCountBefore = await dApp.snapCount();
      myFirstSnap = await dApp.connect(user2).captureSnap("https://ipfs.io/ipfs/QmTYEboq8raiBs7GTUg2yLXB3PMz6HuBNgNfSZBx5Msztg/camera.jpg");
      await myFirstSnap.wait();
      snapCountAfter = await dApp.snapCount();
    })
    it("Check if snapCount is working properly :", async () => {
      console.log("Old snap Count : ", snapCountBefore);
      console.log("New snap Count:", snapCountAfter);

      expect(snapCountAfter).to.equal(snapCountBefore + BigInt(1));
    })
    it("Check snapCaptured working :", async () => {
      const mostRecentBlock = await ethers.provider.getBlock("latest");
      const timestamp = mostRecentBlock.timestamp;
      await expect(myFirstSnap).to.emit(dApp, "SnapCaptured").withArgs(snapCountAfter, user2.address, "https://ipfs.io/ipfs/QmTYEboq8raiBs7GTUg2yLXB3PMz6HuBNgNfSZBx5Msztg/camera.jpg", timestamp);
    })
  });

  describe("Checking functioning of like snap",() => {
    let myFirstSnap,mySecondSnap,like1;
    beforeEach(async () => {
      myFirstSnap = await dApp.connect(user2).captureSnap("https://ipfs.io/ipfs/QmTYEboq8raiBs7GTUg2yLXB3PMz6HuBNgNfSZBx5Msztg/camera.jpg");
      await myFirstSnap.wait();
      mySecondSnap = await dApp.connect(user1).captureSnap("https://ipfs.io/ipfs/QmTYEboq8raiBs7GTUg2yLXB3PMz6HuBNgNfSZBx5Msztg/camera.jpg");
      await mySecondSnap.wait();
      
      like1 =  await dApp.connect(user1).likeSnap(1);
      await like1.wait();

      // const like2 = await dApp.connect(user2).likeSnap(2);
      // await like2.wait();
    })
    it("checking value of for snap 1: ", async ()=>{

      //user 1 likes snap of id 1
      const snaps1 = await dApp.snaps(1);
      console.log("Total likes for snapID 1 : ", snaps1);
      console.log("Total likes for snapID 1 : ", snaps1.likes);
      expect(snaps1.likes).to.equal(BigInt(1));
    })
    it("checking value of for snap 2: ", async ()=>{

      //user 1 likes snap of id 1
      const snaps2 = await dApp.snaps(2);
      console.log("Total likes for snapID 2 : ", snaps2);
      console.log("Total likes for snapID 1 : ", snaps2.likes);
      expect(snaps2.likes).to.equal(BigInt(0));
    })
    it("checking events functioning : ", async ()=>{

      await expect(like1).to.emit(dApp, "SnapLikeEvent").withArgs(1, user1.address,1);

      const like1again = await dApp.connect(user1).likeSnap(1);
      await like1again.wait();
      const snap1 = await dApp.snaps(1);
      console.log(snap1);
      await expect(like1again).to.emit(dApp, "SnapRemoveLikeEvent").withArgs(1, user1.address,0);
    })
  })

})