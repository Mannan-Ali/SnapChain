// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

// $ npx hardhat ignition deploy ignition/modules/Snaps.js --network localhost
module.exports = buildModule("SnapsApp", (m) => {
  
  const snaps = m.contract("Snaps_Contract")
  return { snaps };
});
