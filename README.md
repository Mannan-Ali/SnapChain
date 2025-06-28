#  📸SnapChain
A decentralized space to preserve and share meaningful moments—forever. SnapChain uses blockchain and IPFS to ensure every memory remains verifiable,vtamper-proof, and yours. It's not just storage, it's permanence.

## 🚀 Installation and Setup

Follow these steps to get the **SnapChain** up and running locally:

### Prerequisites:
- **Node.js** (v14 or above):  
  A JavaScript runtime required for building and running the application.  
  [📥 Download Node.js from here](https://nodejs.org/en/download)

- **npm**:  
  Node.js's package manager, typically installed alongside Node.js.  
  [📘 Learn more about npm](https://docs.npmjs.com/)

- **Metamask** or another Ethereum wallet extension:  
  A browser extension for interacting with the Ethereum blockchain.  
  [📥 Download Metamask from here](https://metamask.io/)

- **Hardhat**:  
  A development environment to compile, deploy, test, and debug Ethereum software.  
  [📘 Learn more and get started with Hardhat here](https://hardhat.org/getting-started/)


- **IPFS via Pinata**:  
  A development environment to compile, deploy, test, and debug Ethereum software. A user-friendly IPFS pinning service to upload and manage media files securely on the distributed web..  
  [📥 Sign up and get started with Pinata](https://pinata.cloud/)


## Setup Locally

Clone the project

```bash
git clone https://github.com/Mannan-Ali/SnapChain
```

### Configure the Frontend

```bash
cd frontend
```

Install dependencies

```bash
npm install
```

Start the Frontend Server

```bash
 npm run dev
```

### Configure the Smart Contract

- Navigate to the **Smart Contract** folder in another terminal :

```bash
 cd "Smart Contract"
```
- Install the dependencies for the smart contract:

```bash
 npm install
```
- In one terminal or bash window, start the Hardhat local node:

```bash
 npx hardhat node
```
- In another terminal or bash window, deploy the smart contract using Hardhat Ignition:

```bash
 npx hardhat ignition deploy ignition/modules/Snaps.js --network localhost
```

**Run Tests(Optional for testing)** 

Navigate to the **Smart Contract** folder and run the following command if you want to test the Smart Contract before deployment.  

```bash
npx hardhat test
```

