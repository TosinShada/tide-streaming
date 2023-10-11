"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RPC_URL = exports.NETWORK_PASSPHRASE = exports.CONTRACT_ID_HEX = exports.CONTRACT_ID = void 0;
const soroban_client_1 = require("soroban-client");
/**
 * The Soroban contract ID for the @tide/stream-contract contract.
 */
exports.CONTRACT_ID = 'CDBS3W4TEDT75FMXCST4VJ3XPM7LPX7HSKSVGU5Q6JWABNE4WSKDXS2I';
/**
 * The Soroban contract ID for the @tide/stream-contract contract, in hex.
 * If {@link CONTRACT_ID} is a new-style `C…` string, you will need this hex
 * version when making calls to RPC for now.
 */
exports.CONTRACT_ID_HEX = new soroban_client_1.Contract(exports.CONTRACT_ID).contractId('hex');
/**
 * The Soroban network passphrase used to initialize this library.
 */
exports.NETWORK_PASSPHRASE = 'Test SDF Future Network ; October 2022';
/**
 * The Soroban RPC endpoint used to initialize this library.
 */
exports.RPC_URL = 'https://rpc-futurenet.stellar.org:443';
