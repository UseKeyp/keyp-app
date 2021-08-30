// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { OwnableUpgradeable } from '@openzeppelin/contracts/access/Ownable.sol';
import { ERC721Upgradeable } from '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import { ERC721URIStorageUpgradeable } from '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import { CountersUpgradeable } from '@openzeppelin/contracts/utils/Counters.sol';

//Only used for rescues.
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";


contract NiftyCheckers is ERC721URIStorageUpgradeable, OwnableUpgradeable {
  using CountersUpgradeable for CountersUpgradeable.Counter;
  CountersUpgradeable.Counter private _tokenIds;

  //State Storage
  bool private initialized;

  //Access Storage
  mapping(address => bool) admins;

  //Treasure Storage
  struct Game {
    bytes32 movesHash;
    uint8 level;
    uint16 achievement1; //65,000 types should be more than enough forever.
    uint16 achievement2; //If these are onchain, it can be something that future gov token...
    uint16 achievement3; //...holders can vote on later.
    bool color; //0 white, 1 black
    address originalPlayer;
  }

  mapping(uint256 => Game) public games;

  //Events
  event GameMinted(address to, uint256 id, string uri, bytes32 movesHash);
  event AdminAdded(address addedBy, address newAdmin);
  event AdminRemoved(address addedBy, address newAdmin);

  constructor() {
    //TODO remove constructor function. use initializer instead
    admins[msg.sender] = true;
  }

  modifier onlyAdmin() {
    require(admins[msg.sender], 'Only admins can call this function.');
    _;
  }

  function mint(
    address player,
    string memory tokenURI,
    bytes _moveHash,
    uint8 _level,
    uint16 _achievement1,
    uint16 _achievement2,
    uint16 _achievement3,
    bool _color
  ) public onlyAdmin returns (uint256) {
    _tokenIds.increment();

    uint256 newItemId = _tokenIds.current();
    _mint(player, newItemId);
    _setTokenURI(newItemId, tokenURI);

    Game newGame = Game(_moveHash, _level, _achievement1, _achievement2, _achievement3, _color, player);
    games.add(newGame);

    emit GameMinted(player, newItemId, tokenURI, _moveHash);
    return newItemId;
  }

  function getTotalGames() public view returns (uint256) {
    return _tokenIds.current();
  }

  function addAdmin(address _admin) public onlyOwner {
    admins[_admin] = true;
    AdminAdded(msg.sender, _admin);
  }

  function removeAdmin(address _admin) public onlyOwner {
    admins[_admin] = false;
    AdminRemoved(msg.sender, _admin);
  }

  /*
      Rescue ERC20s and ERC721s mistakingly sent to the contract
  */
  function rescueEtherOwner(address payable to, uint256 amount) public onlyOwner {
    to.send(amount);
  }

  function rescueERC20Owner(address _token, address to, uint amount) public onlyOwner{

  }
}
