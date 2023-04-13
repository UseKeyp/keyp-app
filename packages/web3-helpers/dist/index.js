"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNetworkNameFromId = exports.getIdFromNetworkName = exports.getExplorerBaseUrlFromName = exports.EIP_155_NETWORK_SPEC = void 0;
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.array.includes.js");
var EIP_155_NETWORK_SPEC = [{
  name: 'mainnet',
  chainId: 1
}, {
  name: 'ropsten',
  chainId: 3
}, {
  name: 'rinkeby',
  chainId: 4
}, {
  name: 'goerli',
  chainId: 5
}, {
  name: 'kovan',
  chainId: 42
},
// Not provided by Infura
{
  name: 'xdai',
  chainId: 100
}, {
  name: 'matic',
  chainId: 137
}, {
  name: 'mumbai',
  chainId: 80001
}, {
  name: 'bsc-mainnet',
  chainId: 56
}, {
  name: 'bsc-testnet',
  chainId: 97
}];
exports.EIP_155_NETWORK_SPEC = EIP_155_NETWORK_SPEC;
var getNetworkNameFromId = function getNetworkNameFromId(chainId) {
  var network = EIP_155_NETWORK_SPEC.find(function (item) {
    return item.chainId === chainId;
  });
  if (!network) return {
    name: 'private',
    chainId: chainId
  };
  return network;
};
exports.getNetworkNameFromId = getNetworkNameFromId;
var getIdFromNetworkName = function getIdFromNetworkName(name) {
  return EIP_155_NETWORK_SPEC.find(function (item) {
    return item.name === name.toLowerCase();
  }).chainId;
};
exports.getIdFromNetworkName = getIdFromNetworkName;
var getExplorerBaseUrlFromName = function getExplorerBaseUrlFromName(name) {
  if (['ropsten', 'rinkeby', 'goerli', 'kovan', 'mainnet'].includes(name)) {
    if (name === 'mainnet') return 'https://etherscan.io/';
    return "https://".concat(name, ".etherscan.io/");
  } else if (name === 'xdai') {
    return 'https://blockscout.com/xdai/mainnet/';
  } else if (name === 'matic') {
    return "https://polygonscan.com/";
  } else if (name === 'mumbai') {
    return "https://mumbai.polygonscan.com/";
  } else if (name == 'avalanche') {
    return "https://snowtrace.io/";
  } else if (name == 'avalanche-fuji') {
    return "https://testnet.snowtrace.io/";
  }
};
exports.getExplorerBaseUrlFromName = getExplorerBaseUrlFromName;

