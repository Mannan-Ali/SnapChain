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
        //visibility
        bool hideVisibility;
    }

    //mappings
    mapping(uint256 => Snap) public snaps;
    uint256 public snapCount; // this is to assign new unit256 values to Snaps

    //to keep track of every users uploads.
    mapping(address => uint256[]) public userSnaps;

    //track likes per user per snap: basically if the user has liked this snap or not
    mapping(address => mapping(uint256 => bool)) public hasLiked;

    //events
    //index snapId and uploader as it allows us for faster search through frontend
    event SnapCaptured(uint256 indexed _snapId, address indexed uploader, string ipfsHash, uint256 timestamp);
    // event SnapLiked(uint256 indexed snapId, address liker, uint256 newLikes);
    // event SnapDisliked(uint256 indexed snapId, address disliker, uint256 newLikes);

    //modifiers
    modifier checkValidity(uint256 _snapId) {
        require(_snapId > 0 && _snapId <= snapCount, "Invalid snap ID");
        require(
            userSnaps[msg.sender].length > 0,
            "To like or toggleVisibility of snaps, you should have shared a memory"
        );
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    //functions

    //to upload memory or snap
    function captureSnap(string memory _ipfsHash) public {
        snapCount++;
        Snap memory singleSnap = Snap(
            msg.sender,
            _ipfsHash,
            0,
            block.timestamp,
            false
        );
        snaps[snapCount] = singleSnap;
        userSnaps[msg.sender].push(snapCount);
        emit SnapCaptured(snapCount,msg.sender,_ipfsHash,block.timestamp);
    }

    //to like or not like a liked snap
function likeSnap(uint256 _snapId) public checkValidity(_snapId) {
        if (hasLiked[msg.sender][_snapId]) {
            // If already - remove like
            snaps[_snapId].likes--;
            hasLiked[msg.sender][_snapId] = false;
        } else {
            // If not liked, like it
            snaps[_snapId].likes++;
            hasLiked[msg.sender][_snapId] = true;
        }
    }
    /* >>>>>>  NOT SURE ON WHAT CRITERIA SHOULD THE AWARD OR PINNING SHOULD BE GIVEN  <<<<<<< */
    // function rewardUploader(uint256 _snapId) public payable {
    //     uint256 amount = 0.0001 ether;
    //     require(
    //         snaps[_snapId].likes == 786,
    //         "Your likes does not match the lottery number."
    //     );
    //     require(
    //         address(this).balance >= amount,
    //         "Insufficient contract balance:Due to technical error your reward will be sent within 7 days"
    //     );
    //     require(
    //         snaps[_snapId].uploader != address(0),
    //         "Invalid recipient address"
    //     );

    //     (bool success, ) = snaps[_snapId].uploader.call{value: amount}(""); // Send exactly 0.0001 Ether
    //     require(success, "Transfer failed");
    // }

    function toggleHideSnap(uint256 _snapId) public checkValidity(_snapId){
        Snap storage snap = snaps[_snapId];
        require(
            msg.sender == snap.uploader,
            "You can only hide your own snaps"
        );

        snap.hideVisibility = !snap.hideVisibility; // Toggle the hidden status
        // emit SnapVisibilityChanged(_snapId, snap.hidden); // Emit an event for the frontend to track changes
    }
}
