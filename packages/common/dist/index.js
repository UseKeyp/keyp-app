"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LOGIN_ENABLED_PROVIDERS = exports.AVAILABLE_NETWORKS = void 0;
exports.getAlchemyApiKey = getAlchemyApiKey;
exports.getAlchemyNetworkEnum = getAlchemyNetworkEnum;
exports.getBlockExplorerUrl = getBlockExplorerUrl;
exports.getExplorerBaseUrlFromName = getExplorerBaseUrlFromName;
exports.getNativeCoinInfo = getNativeCoinInfo;
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/web.url.js");
require("core-js/modules/web.url-search-params.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.regexp.to-string.js");
var _alchemySdk = require("alchemy-sdk");
/* global URL */

function getAlchemyApiKey(network) {
  switch (network) {
    case 'MAINNET':
      return 'KR8BI-RsEwbcBdUB316_gSBfPpuoT2Hd';
    case 'GOERLI':
      return 'FMY9aah4T71_0hkokeDVvojsSfWmfNFN';
    case 'SEPOLIA':
      return 'rpf9LC8Wxb6Ectl1QLdEH0q3_Etk-LfB';
    case 'OPTIMISM':
      return 'k0FLpfopdra9P_NPL3RzIGPCcSNhFv94';
    case 'OPTIMISM-GOERLI':
      return 'Y5qkpgDrHHIbgDFkpFHa0fhE2KT5vcvL';
    case 'ARBITRUM':
      return 'igTAP7BSlZkRZmuRknBp8d-Gi7PvFAEw';
    case 'POLYGON':
      return 'fyPrFn7ANSvPqCDEfCeVgys0sCS1YB8E';
    case 'MUMBAI':
      return 'Q0xBisBKR-94kP-PmJaIfaCPQKsK6k2d';
    default:
      throw new Error("Unsupported network: ".concat(network));
  }
}
function getAlchemyNetworkEnum(network) {
  switch (network) {
    case 'MAINNET':
      return _alchemySdk.Network.ETH_MAINNET;
    case 'GOERLI':
      return _alchemySdk.Network.ETH_GOERLI;
    case 'SEPOLIA':
      return _alchemySdk.Network.ETH_SEPOLIA;
    case 'OPTIMISM':
      return _alchemySdk.Network.OPT_MAINNET;
    case 'OPTIMISM-GOERLI':
      return _alchemySdk.Network.OPT_GOERLI;
    case 'ARBITRUM':
      return _alchemySdk.Network.ARB_MAINNET;
    case 'ARBITRUM-NOVA':
      return _alchemySdk.Network.ARB_GOERLI;
    case 'POLYGON':
      return _alchemySdk.Network.MATIC_MAINNET;
    case 'MUMBAI':
      return _alchemySdk.Network.MATIC_MUMBAI;
    default:
      throw new Error("Unsupported network: ".concat(network));
  }
}
function getNativeCoinInfo(network) {
  var NATIVE_COIN_ABBREVIATIONS = {
    MAINNET: 'ETH',
    POLYGON: 'MATIC',
    MUMBAI: 'MATIC',
    GNOSIS: 'xDAI',
    GOERLI: 'ETH',
    OPTIMISM: 'ETH',
    'OPTIMISM-GOERLI': 'ETH',
    ARBITRUM: 'ETH',
    'ARBITRUM-NOVA': 'ETH',
    SEPOLIA: 'ETH',
    AVALANCHE: 'AVAX',
    'AVALANCHE-FUJI': 'AVAX'
  };
  var NATIVE_COIN_NAMES = {
    MAINNET: 'ETH',
    POLYGON: 'MATIC',
    MUMBAI: 'Mumbai MATIC',
    GNOSIS: 'xDAI',
    GOERLI: 'Goerli ETH',
    OPTIMISM: 'Optimism ETH',
    'OPTIMISM-GOERLI': 'Optimism Goerli ETH',
    ARBITRUM: 'Arbitrum ETH',
    'ARBITRUM-NOVA': 'Arbitrum Nova ETH',
    SEPOLIA: 'Sepolia ETH',
    AVALANCHE: 'AVAX',
    'AVALANCHE-FUJI': 'Fuji AVAX'
  };
  var abbreviation = NATIVE_COIN_ABBREVIATIONS[network] || 'UNKNOWN';
  var name = NATIVE_COIN_NAMES[network] || 'Unknown Network';
  return {
    symbol: abbreviation,
    name: name
  };
}
var LOGIN_ENABLED_PROVIDERS = ['CHESS', 'DISCORD', 'NODE_OIDC', 'GOOGLE', 'TWITTER', 'TWITCH',
// 'EPIC_GAMES',
'REDDIT', 'MICROSOFT', 'FACEBOOK', 'SPOTIFY'];
exports.LOGIN_ENABLED_PROVIDERS = LOGIN_ENABLED_PROVIDERS;
var AVAILABLE_NETWORKS = ['MAINNET', 'POLYGON', 'MUMBAI', 'GNOSIS', 'GOERLI', 'OPTIMISM', 'OPTIMISM-GOERLI', 'ARBITRUM', 'ARBITRUM-NOVA', 'SEPOLIA', 'AVALANCHE', 'AVALANCHE-FUJI', 'MANTLE-WADSLEY'];
exports.AVAILABLE_NETWORKS = AVAILABLE_NETWORKS;
function getExplorerBaseUrlFromName(name) {
  if (AVAILABLE_NETWORKS.includes(name)) {
    switch (name) {
      case 'MAINNET':
        return 'https://etherscan.io/';
      case 'POLYGON':
        return 'https://polygonscan.com/';
      case 'GOERLI':
        return "https://goerli.etherscan.io/";
      case 'SEPOLIA':
        return "https://sepolia.etherscan.io/";
      case 'GNOSIS':
        return "https://blockscout.com/xdai/mainnet/";
      case 'MATIC':
        return "https://polygonscan.com/";
      case 'MUMBAI':
        return "https://mumbai.polygonscan.com/";
      case 'AVALANCHE':
        return "https://avascan.info/";
      // not working but on https://avascan.info/blockchain/dfk/
      case 'AVALANCHE-FUJI':
        return "https://testnet.snowtrace.io/";
      case 'ARBITRUM':
        return "https://arbiscan.io/";
      case 'OPTIMISM':
        return "https://optimistic.etherscan.io/";
      case 'OPTIMISM-GOERLI':
        return "https://goerli-optimism.etherscan.io/";
      case 'ARBITRUM-NOVA':
        return "https://testnet.arbiscan.io/";
      case 'MANTLE-WADSLEY':
        return "https://explorer.testnet.mantle.xyz/";
    }
  } else {
    return "https://".concat(name, ".etherscan.io/");
  }
}
function getBlockExplorerUrl(name, hash) {
  var baseUrl = getExplorerBaseUrlFromName(name);
  var url = new URL('tx/' + hash, baseUrl);
  return url.toString();
}