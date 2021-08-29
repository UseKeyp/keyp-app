// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { OwnableUpgradeable } from '@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol';
import { PausableUpgradable } from '@openzeppelin/contracts-upgradeable/access/PausableUpgradeable.sol';

//Includes BaseRelayRecipient, for meta transactions.
import "@openzeppelin/contracts/metatx/ERC2771Context.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

import "Treasure.sol";
import "SignatureChecker.sol";

contract TreasureMarket is
  PausableUpgradable, // pausable by owner.
  OwnableUpgradeable, //owned by deployer.
  ERC2771Context, // meta transactions enabled.
  ReentrancyGuard
{
  //Time of last meta transaction by this user.
  mapping(address => uint) private lastSignedMetaTransaction;
  uint public gasLessRateLimit;

  uint feePercentagePoint; //out of 1000. 25/1000 = 2.5%
  uint royaltyPercentagePoint; //out of 1000.

  //sale storage
  mapping (uint => bool) public isForSaleById;
  mapping (uint => uint) public priceById;
  mapping (uint => address) public seller;

  Treasure treasure;

  constructor(
    uint256 _gasLessRateLimit,
    address _treasureDeployedAddress,
    address _forwarder,
    uint _feePercentagePoint,
    uint _royaltyPercentagePoint
  ) {
    gasLessRateLimit = _gasLessRateLimit;
    treasure = Treasure(_treasureDeployedAddress);
    trustedForwarder = _forwarder;
    feePercentagePoint = _feePercentagePoint;
    royaltyPercentagePoint = _royaltyPercentagePoint;
  }

  //signature validation can be checked in SignatureChecker.sol
  //assets are listed offchain using eth-sig-util to sign messages
  function instantBuy(
    uint _id
  ) public payable nonReentrant() {
    //check SignatureChecker of sale. if its invalid, remove it.
    require(isForSaleById[_id]);
    require(msg.value == priceById[_id]);

    //Split profits
    bool sentRoyalty, bytes memory data = treasure.games[_id].originalPlayer.call{value: msg.value * royaltyPercentagePoint / 1000}("");
    require(sentRoyalty, "Failed to send royalty. Transaction fails.");


    bool sentFunds, data = seller.call{value: msg.value * (1000 - royaltyPercentagePoint - feePercentagePoint) / 1000}("");
    require(sentRoyalty, "Failed to send funds to seller. Transaction fails.");
    //remaining funds (msg.value*feePercentagePoint/1000) are held in this contract until owner wants to withdraw.

    treasure.safeTransferFrom(treasure.ownerOf(_id), _msgSender(), _id);
  }

  //User can transfer their NFT for free using a metaTransaction that just calls basic safeTransferFrom in the Treasure contract.
  //Other checks in safeTransferFrom should still protect the asset.
  function metaTransfer(address _to, uint _id) public {
    require(_msgSender() == treasure.ownerOf(_id));
    treasure.safeTransferFrom(_msgSender(), _to, _id);
  }

  //User signs a message using Signature
  function startAuction(uint startTime, uint endTime, uint _id, uint minPrice) public pure{
    //TODO
  }

  //Marketplace Owner can withdraw fees.
  function ownerWithdrawFees(address payable to, uint256 amount) public onlyOwner {
    //use `call` here to pass on gas, so you can do more stuff when this is called.
    bool sent, bytes memory data = to.call{value: amount}("");
    require(sent, "Failed to send ETH. Transaction fails.");
  }

}
