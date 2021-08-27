// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { OwnableUpgradeable } from '@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol';
import { PausableUpgradable } from '@openzeppelin/contracts-upgradeable/access/PausableUpgradeable.sol';

import '@opengsn/contracts/src/BaseRelayRecipient.sol';

import 'Treasure.sol';

contract TreasureMarket is
  PausableUpgradable,
  OwnableUpgradeable,
  BaseRelayRecipient
{
  //Time of last meta transaction by this user.
  mapping(address => uint256) private lastSignedMetaTransaction;
  uint256 public gasLessRateLimit;

  mapping(uint256 => bool) public isForSaleById;
  mapping(uint256 => uint256) public priceById;

  Treasure treasure;

  constructor(
    uint256 _gasLessRateLimit,
    address _treasureDeployedAddress,
    address _forwarder
  ) {
    gasLessRateLimit = _gasLessRateLimit;
    treasure = Treasure(_treasureDeployedAddress);
    trustedForwarder = _forwarder;
  }

  function listAsset(
    uint256 weiPrice,
    bool isForSale,
    uint256 _id
  ) {
    require(msg.sender == treasure.ownerOf(_id));

    if (isForSale) {
      isForSaleById[_id] = true;
      priceById[_id] = weiPrice;
    } else {
      isForSaleById[_id] = false;
      priceById[_id] = 0;
    }
  }

  function metaListAsset(
    uint256 weiPrice,
    bool isForSale,
    uint256 _id
  ) {
    require(_msgSender() == treasure.ownerOf(_id));
  }

  function instantBuy(uint256 _id) public payable {
    require(isForSaleById[_id]);
    require(msg.value == priceById[_id]);

    treasure.safeTransferFrom(treasure.ownerOf(_id), msg.sender, _id);
  }

  function metaInstantBuy() public payable {
    require(isForSaleById[_id]);
    require(msg.value == priceById[_id]);

    treasure.safeTransferFrom(treasure.ownerOf(_id), _msgSender(), _id);
  }

  function metaTransfer() public {
    require(_msgSender() == treasure.ownerOf(_id));
  }
}
