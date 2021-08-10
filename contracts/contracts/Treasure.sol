// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import {ERC721Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import {ERC721URIStorageUpgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol";
import {CountersUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";

contract NiftyCheckers is ERC721URIStorageUpgradeable, OwnableUpgradeable{

    using CountersUpgradeable for CountersUpgradeable.Counter;
    CountersUpgradeable.Counter private _tokenIds;

    //State Storage
    bool private initialized;

    //Access Storage
    mapping (address => bool) admins;
    address marketplace;

    //Treasure Storage
    struct Game {
      bytes32 movesHash;
      uint8 level;
      uint16 achievement1; //65,000 types should be more than enough forever.
      uint16 achievement2; //If these are onchain, it can be something that future gov token...
      uint16 achievement3; //...holders can vote on later.
    }

    mapping (uint => Game) public games;

    //Events
    event GameMinted(address to, uint id, string uri, bytes32 movesHash);
    event AdminAdded(address addedBy, address newAdmin);
    event AdminRemoved(address addedBy, address newAdmin);

    constructor(){
      //TODO remove constructor function. use initializer instead
      admins[msg.sender] = true;
    }
    /* //TODO use initializer if upgradeable
    function initialize() initializer public {
      require(!initialized, "Contract instance has already been initialized");
      __ERC721_init("Nifty Checkers", "CHECK");
      admins[msg.sender] = true;
    }*/

     modifier onlyAdmin() {
       require(
             admins[msg.sender],
             "Only admins can call this function."
         );
         _;
     }

    function mint(address player, string memory tokenURI, bytes _moveHash, uint8 _level, uint16 _achievement1, uint16 _achievement2, uint16 _achievement3)
        public onlyAdmin
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(player, newItemId);
        _setTokenURI(newItemId, tokenURI);

        emit GameMinted(player, newItemId, tokenURI, _moveHash);
        return newItemId;
    }

    function getTotalGames() public view returns (uint) {
        return _tokenIds.current();
    }

    function addAdmin(address _admin) public onlyOwner{
      admins[_admin] = true;
      AdminAdded(msg.sender, _admin);
    }

    function removeAdmin(address _admin) public onlyOwner{
      admins[_admin] = false;
      AdminRemoved(msg.sender, _admin);
    }
    /**
    @dev used to set the marketplace contract so users can use it without a first transaction to approve it
    **/
    function updateTreasureMarket(address _newMarket) public onlyOwner{
      marketplace = _newMarket;
    }

    //TODO override approved for all function to check for contract being our marketplace.

    /*
      Rescue ERC20s and ERC721s mistakingly sent to the contract
    */

    function rescueEther(address to, uint amount) public onlyOwner{
      to.send(amount);
    }

}
