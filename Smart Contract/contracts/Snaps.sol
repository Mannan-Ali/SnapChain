// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Snaps_Contract {
    address public owner;

    struct Snap {
        ///address of the person uploading there snap
        address uploader;
        //meta deta like img link and description from pinata(ipfs)
        string ipfsHash;
        uint256 likes;
        //setting directly from block when it gets mined.
        uint256 timestamp;
    }
    mapping(uint256 => Snap) public snaps;
    uint256 public snapCount; // this is to assign new unit256 values to Snaps

    //to keep track of uploads on basis of their uploads.
    mapping(address => uint256[]) public userSnaps;

    constructor() {
        owner = msg.sender;
    }
    //functions
    function captureSnap(string memory _ipfsHash) public{
        snapCount++;
        Snap memory singleSnap = Snap(msg.sender,_ipfsHash,0,block.timestamp);
        snaps[snapCount] = singleSnap;
        userSnaps[msg.sender].push(snapCount);
    }
}
