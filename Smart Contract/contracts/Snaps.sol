// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Snaps_Contract {
    //owner of contract
    address public owner;

    //addresses
    struct Snap {
        ///address of the person uploading there snap
        address uploader;
        //meta deta like img link and description from pinata(ipfs)
        string ipfsHash;
        //feature for helping people to intreact with each other by liking each other memory or snaps.
        uint256 likes;
        //setting directly from block when it gets mined.
        uint256 timestamp;
    }

    //mappings
    mapping(uint256 => Snap) public snaps;
    uint256 public snapCount; // this is to assign new unit256 values to Snaps

    //to keep track of uploads on basis of their uploads.
    mapping(address => uint256[]) public userSnaps;

    //track likes per user per snap: basically if the user has liked this snap or not 
    mapping(address => mapping(uint256 => bool)) public hasLiked; 
    constructor() {
        owner = msg.sender;
    }
    //functions

    //to upload memory or snap
    function captureSnap(string memory _ipfsHash) public{
        snapCount++;
        Snap memory singleSnap = Snap(msg.sender,_ipfsHash,0,block.timestamp);
        snaps[snapCount] = singleSnap;
        userSnaps[msg.sender].push(snapCount);
    }

    //to like or not like a liked snap
    function likeSnap(uint256 _snapId) public {
        require(_snapId > 0 && _snapId <= snapCount, "Invalid snap ID");
        require(userSnaps[msg.sender].length > 0, "To like, you should have shared a memory");

        if (hasLiked[msg.sender][_snapId]) {
            //If already - remove like
            snaps[_snapId].likes--;
            hasLiked[msg.sender][_snapId] = false;
        } else {
            //If not liked, like it
            snaps[_snapId].likes++;
            hasLiked[msg.sender][_snapId] = true;
        }
    }

}
