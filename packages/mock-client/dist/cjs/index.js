"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contract = exports.networks = exports.Err = exports.Ok = exports.Address = void 0;
const soroban_client_1 = require("soroban-client");
Object.defineProperty(exports, "Address", { enumerable: true, get: function () { return soroban_client_1.Address; } });
const buffer_1 = require("buffer");
const invoke_js_1 = require("./invoke.js");
__exportStar(require("./invoke.js"), exports);
__exportStar(require("./method-options.js"), exports);
;
;
class Ok {
    value;
    constructor(value) {
        this.value = value;
    }
    unwrapErr() {
        throw new Error('No error');
    }
    unwrap() {
        return this.value;
    }
    isOk() {
        return true;
    }
    isErr() {
        return !this.isOk();
    }
}
exports.Ok = Ok;
class Err {
    error;
    constructor(error) {
        this.error = error;
    }
    unwrapErr() {
        return this.error;
    }
    unwrap() {
        throw new Error(this.error.message);
    }
    isOk() {
        return false;
    }
    isErr() {
        return !this.isOk();
    }
}
exports.Err = Err;
if (typeof window !== 'undefined') {
    //@ts-ignore Buffer exists
    window.Buffer = window.Buffer || buffer_1.Buffer;
}
const regex = /Error\(Contract, #(\d+)\)/;
function parseError(message) {
    const match = message.match(regex);
    if (!match) {
        return undefined;
    }
    if (Errors === undefined) {
        return undefined;
    }
    let i = parseInt(match[1], 10);
    let err = Errors[i];
    if (err) {
        return new Err(err);
    }
    return undefined;
}
exports.networks = {
    futurenet: {
        networkPassphrase: "Test SDF Future Network ; October 2022",
        contractId: "CB2DXS52C6E252HEIGDY4DEKJWHKTBICED2PMILWHCEUT4ECQQEPAQK7",
    }
};
const Errors = {};
class Contract {
    options;
    spec;
    constructor(options) {
        this.options = options;
        this.spec = new soroban_client_1.ContractSpec([
            "AAAAAAAAAAAAAAAKaW5pdGlhbGl6ZQAAAAAABAAAAAAAAAAFYWRtaW4AAAAAAAATAAAAAAAAAAdkZWNpbWFsAAAAAAQAAAAAAAAABG5hbWUAAAAQAAAAAAAAAAZzeW1ib2wAAAAAABAAAAAA",
            "AAAAAAAAAAAAAAAEbWludAAAAAIAAAAAAAAAAnRvAAAAAAATAAAAAAAAAAZhbW91bnQAAAAAAAsAAAAA",
            "AAAAAAAAAAAAAAAJc2V0X2FkbWluAAAAAAAAAQAAAAAAAAAJbmV3X2FkbWluAAAAAAAAEwAAAAA=",
            "AAAAAAAAAAAAAAAJYWxsb3dhbmNlAAAAAAAAAgAAAAAAAAAEZnJvbQAAABMAAAAAAAAAB3NwZW5kZXIAAAAAEwAAAAEAAAAL",
            "AAAAAAAAAAAAAAAHYXBwcm92ZQAAAAAEAAAAAAAAAARmcm9tAAAAEwAAAAAAAAAHc3BlbmRlcgAAAAATAAAAAAAAAAZhbW91bnQAAAAAAAsAAAAAAAAAEWV4cGlyYXRpb25fbGVkZ2VyAAAAAAAABAAAAAA=",
            "AAAAAAAAAAAAAAAHYmFsYW5jZQAAAAABAAAAAAAAAAJpZAAAAAAAEwAAAAEAAAAL",
            "AAAAAAAAAAAAAAAIdHJhbnNmZXIAAAADAAAAAAAAAARmcm9tAAAAEwAAAAAAAAACdG8AAAAAABMAAAAAAAAABmFtb3VudAAAAAAACwAAAAA=",
            "AAAAAAAAAAAAAAANdHJhbnNmZXJfZnJvbQAAAAAAAAQAAAAAAAAAB3NwZW5kZXIAAAAAEwAAAAAAAAAEZnJvbQAAABMAAAAAAAAAAnRvAAAAAAATAAAAAAAAAAZhbW91bnQAAAAAAAsAAAAA",
            "AAAAAAAAAAAAAAAEYnVybgAAAAIAAAAAAAAABGZyb20AAAATAAAAAAAAAAZhbW91bnQAAAAAAAsAAAAA",
            "AAAAAAAAAAAAAAAJYnVybl9mcm9tAAAAAAAAAwAAAAAAAAAHc3BlbmRlcgAAAAATAAAAAAAAAARmcm9tAAAAEwAAAAAAAAAGYW1vdW50AAAAAAALAAAAAA==",
            "AAAAAAAAAAAAAAAIZGVjaW1hbHMAAAAAAAAAAQAAAAQ=",
            "AAAAAAAAAAAAAAAEbmFtZQAAAAAAAAABAAAAEA==",
            "AAAAAAAAAAAAAAAGc3ltYm9sAAAAAAAAAAAAAQAAABA=",
            "AAAAAQAAAAAAAAAAAAAAEEFsbG93YW5jZURhdGFLZXkAAAACAAAAAAAAAARmcm9tAAAAEwAAAAAAAAAHc3BlbmRlcgAAAAAT",
            "AAAAAQAAAAAAAAAAAAAADkFsbG93YW5jZVZhbHVlAAAAAAACAAAAAAAAAAZhbW91bnQAAAAAAAsAAAAAAAAAEWV4cGlyYXRpb25fbGVkZ2VyAAAAAAAABA==",
            "AAAAAgAAAAAAAAAAAAAAB0RhdGFLZXkAAAAABQAAAAEAAAAAAAAACUFsbG93YW5jZQAAAAAAAAEAAAfQAAAAEEFsbG93YW5jZURhdGFLZXkAAAABAAAAAAAAAAdCYWxhbmNlAAAAAAEAAAATAAAAAQAAAAAAAAAFTm9uY2UAAAAAAAABAAAAEwAAAAEAAAAAAAAABVN0YXRlAAAAAAAAAQAAABMAAAAAAAAAAAAAAAVBZG1pbgAAAA==",
            "AAAAAQAAAAAAAAAAAAAADVRva2VuTWV0YWRhdGEAAAAAAAADAAAAAAAAAAdkZWNpbWFsAAAAAAQAAAAAAAAABG5hbWUAAAAQAAAAAAAAAAZzeW1ib2wAAAAAABA="
        ]);
    }
    initialize = async ({ admin, decimal, name, symbol }, options = {}) => {
        return await (0, invoke_js_1.invoke)({
            method: 'initialize',
            args: this.spec.funcArgsToScVals("initialize", { admin: new soroban_client_1.Address(admin), decimal, name, symbol }),
            ...options,
            ...this.options,
            parseResultXdr: () => { },
        });
    };
    mint = async ({ to, amount }, options = {}) => {
        return await (0, invoke_js_1.invoke)({
            method: 'mint',
            args: this.spec.funcArgsToScVals("mint", { to: new soroban_client_1.Address(to), amount }),
            ...options,
            ...this.options,
            parseResultXdr: () => { },
        });
    };
    setAdmin = async ({ new_admin }, options = {}) => {
        return await (0, invoke_js_1.invoke)({
            method: 'set_admin',
            args: this.spec.funcArgsToScVals("set_admin", { new_admin: new soroban_client_1.Address(new_admin) }),
            ...options,
            ...this.options,
            parseResultXdr: () => { },
        });
    };
    allowance = async ({ from, spender }, options = {}) => {
        return await (0, invoke_js_1.invoke)({
            method: 'allowance',
            args: this.spec.funcArgsToScVals("allowance", { from: new soroban_client_1.Address(from), spender: new soroban_client_1.Address(spender) }),
            ...options,
            ...this.options,
            parseResultXdr: (xdr) => {
                return this.spec.funcResToNative("allowance", xdr);
            },
        });
    };
    approve = async ({ from, spender, amount, expiration_ledger }, options = {}) => {
        return await (0, invoke_js_1.invoke)({
            method: 'approve',
            args: this.spec.funcArgsToScVals("approve", { from: new soroban_client_1.Address(from), spender: new soroban_client_1.Address(spender), amount, expiration_ledger }),
            ...options,
            ...this.options,
            parseResultXdr: () => { },
        });
    };
    balance = async ({ id }, options = {}) => {
        return await (0, invoke_js_1.invoke)({
            method: 'balance',
            args: this.spec.funcArgsToScVals("balance", { id: new soroban_client_1.Address(id) }),
            ...options,
            ...this.options,
            parseResultXdr: (xdr) => {
                return this.spec.funcResToNative("balance", xdr);
            },
        });
    };
    transfer = async ({ from, to, amount }, options = {}) => {
        return await (0, invoke_js_1.invoke)({
            method: 'transfer',
            args: this.spec.funcArgsToScVals("transfer", { from: new soroban_client_1.Address(from), to: new soroban_client_1.Address(to), amount }),
            ...options,
            ...this.options,
            parseResultXdr: () => { },
        });
    };
    transferFrom = async ({ spender, from, to, amount }, options = {}) => {
        return await (0, invoke_js_1.invoke)({
            method: 'transfer_from',
            args: this.spec.funcArgsToScVals("transfer_from", { spender: new soroban_client_1.Address(spender), from: new soroban_client_1.Address(from), to: new soroban_client_1.Address(to), amount }),
            ...options,
            ...this.options,
            parseResultXdr: () => { },
        });
    };
    burn = async ({ from, amount }, options = {}) => {
        return await (0, invoke_js_1.invoke)({
            method: 'burn',
            args: this.spec.funcArgsToScVals("burn", { from: new soroban_client_1.Address(from), amount }),
            ...options,
            ...this.options,
            parseResultXdr: () => { },
        });
    };
    burnFrom = async ({ spender, from, amount }, options = {}) => {
        return await (0, invoke_js_1.invoke)({
            method: 'burn_from',
            args: this.spec.funcArgsToScVals("burn_from", { spender: new soroban_client_1.Address(spender), from: new soroban_client_1.Address(from), amount }),
            ...options,
            ...this.options,
            parseResultXdr: () => { },
        });
    };
    decimals = async (options = {}) => {
        return await (0, invoke_js_1.invoke)({
            method: 'decimals',
            args: this.spec.funcArgsToScVals("decimals", {}),
            ...options,
            ...this.options,
            parseResultXdr: (xdr) => {
                return this.spec.funcResToNative("decimals", xdr);
            },
        });
    };
    name = async (options = {}) => {
        return await (0, invoke_js_1.invoke)({
            method: 'name',
            args: this.spec.funcArgsToScVals("name", {}),
            ...options,
            ...this.options,
            parseResultXdr: (xdr) => {
                return this.spec.funcResToNative("name", xdr);
            },
        });
    };
    symbol = async (options = {}) => {
        return await (0, invoke_js_1.invoke)({
            method: 'symbol',
            args: this.spec.funcArgsToScVals("symbol", {}),
            ...options,
            ...this.options,
            parseResultXdr: (xdr) => {
                return this.spec.funcResToNative("symbol", xdr);
            },
        });
    };
}
exports.Contract = Contract;
