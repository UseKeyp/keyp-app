// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { OwnableUpgradeable } from '@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol';
import { PausableUpgradable } from '@openzeppelin/contracts-upgradeable/access/PausableUpgradeable.sol';

//Includes BaseRelayRecipient, for meta transactions.
import "@openzeppelin/contracts-upgradeable/metatx/ERC2771ContextUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";

import "Treasure.sol";
import "SignatureChecker.sol";

contract TreasureMarket is
  PausableUpgradable, // pausable by owner.
  OwnableUpgradeable, //owned by deployer.
  ERC2771ContextUpgradeable, // meta transactions enabled.
  ReentrancyGuardUpgradeable
{
  //Time of last meta transaction by this user.
  mapping(address => uint) private lastSignedMetaTransaction;
  uint public gasLessRateLimit;

  uint public feePercentagePoint; //out of 1000. 25/1000 = 2.5%
  uint public royaltyPercentagePoint; //out of 1000.

  //sale storage
  mapping (uint => bool) public isForSaleById;
  mapping (uint => uint) public priceById;
  mapping (uint => address) public seller;
  mapping (uint => uint) public endTime

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

  function listItem(uint _id, uint price, uint duration){
    require(treasure.ownerOf(_id) == _msgSender(), "You can not list assets you dont own.");
    require(price != 0, "Price can not be set to 0.");
    require(duration > 1, "Duration of the sale must be longer");

    isForSaleById[_id] = true;
    priceById[_id] = price;
    seller[_id] = _msgSender()
    endTime[_id] = block.timestamp + duration;

    treasure.safeTransferFrom(_msgSender(), address(this), _tokenId);
  }

  //signature validation can be checked in SignatureChecker.sol
  //assets are listed offchain using eth-sig-util to sign messages
  function instantBuy(
    uint _id
  ) public payable nonReentrant() {
    //check SignatureChecker of sale. if its invalid, remove it.
    require(isForSaleById[_id], "Item not for sale.");
    require(msg.value == priceById[_id], "Incorrect amount of value sent.");
    require(block.timestamp < endTime[_id], "Auction has ended.")

    //Split profits
    bool sentRoyalty, bytes memory data = treasure.games[_id].originalPlayer.call{value: msg.value * royaltyPercentagePoint / 1000}("");
    require(sentRoyalty, "Failed to send royalty. Transaction fails.");


    bool sentFunds, data = seller.call{value: msg.value * (1000 - royaltyPercentagePoint - feePercentagePoint) / 1000}("");
    require(sentRoyalty, "Failed to send funds to seller. Transaction fails.");
    //remaining funds (msg.value*feePercentagePoint/1000) are held in this contract until owner wants to withdraw.

    isForSaleById[_id] = false;
    treasure.safeTransferFrom(treasure.ownerOf(_id), _msgSender(), _id);
  }

  //Marketplace Owner can withdraw fees.
  function ownerWithdrawFees(address payable to, uint256 amount) public onlyOwner {
    //use `call` here to pass on gas, so you can do more stuff when this is called.
    bool sent, bytes memory data = to.call{value: amount}("");
    require(sent, "Failed to send ETH. Transaction fails.");
  }

  function setRoyalty(uint _points) public onlyOwner{
    royaltyPercentagePoint = _points;
  }

  function setFee(uint _points) public onlyOwner{
    feePercentagePoint = _points;
  }

}
