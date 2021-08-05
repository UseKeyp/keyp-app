// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import {PausableUpgradable} from "@openzeppelin/contracts-upgradeable/access/PausableUpgradeable.sol";

import "@opengsn/contracts/src/BaseRelayRecipient.sol";

import "Treasure.sol";

contract TreasureMarket is PausableUpgradable, OwnableUpgradeable, BaseRelayRecipient{

    //Time of last meta transaction by this user.
    mapping (address => uint) private lastSignedMetaTransaction;
    uint public gasLessRateLimit;

    mapping (uint => bool) public isForSaleById;
    mapping (uint => uint) public priceById;

    Treasure treasure;

    constructor(uint _gasLessRateLimit, address _treasureDeployedAddress, address _forwarder){
      gasLessRateLimit = _gasLessRateLimit;
      treasure = Treasure(_treasureDeployedAddress);
      trustedForwarder = _forwarder;
    }

    function listAsset(uint weiPrice, bool isForSale, uint _id) {
      require(msg.sender == treasure.ownerOf(_id));

      if(isForSale)
      {
        isForSaleById[_id] = true;
        priceById[_id] = weiPrice;
      }
      else
      {
        isForSaleById[_id] = false;
        priceById[_id] = 0;
      }
    }

    function metaListAsset(uint weiPrice, bool isForSale, uint _id) {
      require(_msgSender() == treasure.ownerOf(_id));
    }

    function instantBuy(uint _id) public payable{
      require(isForSaleById[_id]);
      require(msg.value == priceById[_id]);

      treasure.safeTransferFrom(treasure.ownerOf(_id), msg.sender, _id);
    }

    function metaInstantBuy() public payable{
      require(isForSaleById[_id]);
      require(msg.value == priceById[_id]);

      treasure.safeTransferFrom(treasure.ownerOf(_id), _msgSender(), _id);
    }

    function metaTransfer() public{
      require(_msgSender() == treasure.ownerOf(_id));
    }


}
