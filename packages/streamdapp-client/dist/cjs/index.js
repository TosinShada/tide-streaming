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
        contractId: "CDSQFWPHBASD2BBQTQJS4KIMBMFTR63YEPIBIFSACVVNIMFI3IQT36O4",
    }
};
const Errors = {};
class Contract {
    options;
    spec;
    constructor(options) {
        this.options = options;
        this.spec = new soroban_client_1.ContractSpec([
            "AAAAAQAAAAAAAAAAAAAABlN0cmVhbQAAAAAACwAAAAAAAAAHZGVwb3NpdAAAAAALAAAAAAAAAAJpZAAAAAAABAAAAAAAAAAPcmF0ZV9wZXJfc2Vjb25kAAAAAAYAAAAAAAAACXJlY2lwaWVudAAAAAAAABMAAAAAAAAAEXJlbWFpbmluZ19iYWxhbmNlAAAAAAAACwAAAAAAAAAGc2VuZGVyAAAAAAATAAAAAAAAAApzdGFydF90aW1lAAAAAAAGAAAAAAAAAAlzdG9wX3RpbWUAAAAAAAAGAAAAAAAAAA10b2tlbl9hZGRyZXNzAAAAAAAAEwAAAAAAAAAOdG9rZW5fZGVjaW1hbHMAAAAAAAQAAAAAAAAADHRva2VuX3N5bWJvbAAAABA=",
            "AAAAAQAAAAAAAAAAAAAADExvY2FsQmFsYW5jZQAAAAMAAAAAAAAAEXJlY2lwaWVudF9iYWxhbmNlAAAAAAAACwAAAAAAAAAOc2VuZGVyX2JhbGFuY2UAAAAAAAsAAAAAAAAAEXdpdGhkcmF3YWxfYW1vdW50AAAAAAAACw==",
            "AAAAAQAAAAAAAAAAAAAADENyZWF0ZVN0cmVhbQAAAAIAAAAAAAAACGR1cmF0aW9uAAAABgAAAAAAAAAPcmF0ZV9wZXJfc2Vjb25kAAAAAAY=",
            "AAAAAgAAAAAAAAAAAAAAB0RhdGFLZXkAAAAABAAAAAAAAAAAAAAABVRva2VuAAAAAAAAAAAAAAAAAAAMTmV4dFN0cmVhbUlkAAAAAQAAAAAAAAAHU3RyZWFtcwAAAAABAAAABAAAAAEAAAAAAAAAC1VzZXJTdHJlYW1zAAAAAAEAAAAT",
            "AAAAAAAAAAAAAAAKaW5pdGlhbGl6ZQAAAAAAAgAAAAAAAAAFdG9rZW4AAAAAAAATAAAAAAAAAAhzdGFydF9pZAAAAAQAAAAA",
            "AAAAAAAAAAAAAAAKZ2V0X3N0cmVhbQAAAAAAAQAAAAAAAAAJc3RyZWFtX2lkAAAAAAAABAAAAAEAAAfQAAAABlN0cmVhbQAA",
            "AAAAAAAAAAAAAAATZ2V0X3N0cmVhbXNfYnlfdXNlcgAAAAABAAAAAAAAAAZjYWxsZXIAAAAAABMAAAABAAAD6gAAB9AAAAAGU3RyZWFtAAA=",
            "AAAAAAAAAPdSZXR1cm5zIGVpdGhlciB0aGUgZGVsdGEgaW4gc2Vjb25kcyBiZXR3ZWVuIGBsZWRnZXIudGltZXN0YW1wYCBhbmQgYHN0YXJ0VGltZWAgb3IgYmV0d2VlbiBgc3RvcFRpbWVgIGFuZCBgc3RhcnRUaW1lLCB3aGljaGV2ZXIgaXMgc21hbGxlci4KSWYgYGJsb2NrLnRpbWVzdGFtcGAgaXMgYmVmb3JlIGBzdGFydFRpbWVgLCBpdCByZXR1cm5zIDAuClBhbmljcyBpZiB0aGUgaWQgZG9lcyBub3QgcG9pbnQgdG8gYSB2YWxpZCBzdHJlYW0uAAAAAAhkZWx0YV9vZgAAAAEAAAAAAAAACXN0cmVhbV9pZAAAAAAAAAQAAAABAAAABg==",
            "AAAAAAAAAQlSZXR1cm5zIHRoZSBhbW91bnQgb2YgdG9rZW5zIHRoYXQgaGF2ZSBhbHJlYWR5IGJlZW4gcmVsZWFzZWQgdG8gdGhlIHJlY2lwaWVudC4KUGFuaWNzIGlmIHRoZSBpZCBkb2VzIG5vdCBwb2ludCB0byBhIHZhbGlkIHN0cmVhbS4KQHBhcmFtIHN0cmVhbV9pZCBUaGUgaWQgb2YgdGhlIHN0cmVhbQpAcGFyYW0gd2hvIFRoZSBhZGRyZXNzIG9mIHRoZSBjYWxsZXIKQHJldHVybiBUaGUgYW1vdW50IG9mIHRva2VucyB0aGF0IGhhdmUgYWxyZWFkeSBiZWVuIHJlbGVhc2VkAAAAAAAACmJhbGFuY2Vfb2YAAAAAAAIAAAAAAAAACXN0cmVhbV9pZAAAAAAAAAQAAAAAAAAABmNhbGxlcgAAAAAAEwAAAAEAAAAL",
            "AAAAAAAAAAAAAAANY3JlYXRlX3N0cmVhbQAAAAAAAAYAAAAAAAAABnNlbmRlcgAAAAAAEwAAAAAAAAAJcmVjaXBpZW50AAAAAAAAEwAAAAAAAAAGYW1vdW50AAAAAAALAAAAAAAAAA10b2tlbl9hZGRyZXNzAAAAAAAAEwAAAAAAAAAKc3RhcnRfdGltZQAAAAAABgAAAAAAAAAJc3RvcF90aW1lAAAAAAAABgAAAAEAAAAE",
            "AAAAAAAAAAAAAAAUd2l0aGRyYXdfZnJvbV9zdHJlYW0AAAADAAAAAAAAAAlyZWNpcGllbnQAAAAAAAATAAAAAAAAAAlzdHJlYW1faWQAAAAAAAAEAAAAAAAAAAZhbW91bnQAAAAAAAsAAAAA",
            "AAAAAAAAAUlDYW5jZWxzIHRoZSBzdHJlYW0gYW5kIHRyYW5zZmVycyB0aGUgdG9rZW5zIGJhY2sgb24gYSBwcm8gcmF0YSBiYXNpcy4KVGhyb3dzIGlmIHRoZSBpZCBkb2VzIG5vdCBwb2ludCB0byBhIHZhbGlkIHN0cmVhbS4KVGhyb3dzIGlmIHRoZSBjYWxsZXIgaXMgbm90IHRoZSBzZW5kZXIgb3IgdGhlIHJlY2lwaWVudCBvZiB0aGUgc3RyZWFtLgpUaHJvd3MgaWYgdGhlcmUgaXMgYSB0b2tlbiB0cmFuc2ZlciBmYWlsdXJlLgpAcGFyYW0gc3RyZWFtX2lkIFRoZSBpZCBvZiB0aGUgc3RyZWFtIHRvIGNhbmNlbC4KQHJldHVybiBib29sIHRydWU9c3VjY2Vzcywgb3RoZXJ3aXNlIGZhbHNlLgAAAAAAAA1jYW5jZWxfc3RyZWFtAAAAAAAAAgAAAAAAAAAGY2FsbGVyAAAAAAATAAAAAAAAAAlzdHJlYW1faWQAAAAAAAAEAAAAAA=="
        ]);
    }
    async initialize({ token, start_id }, options = {}) {
        return await (0, invoke_js_1.invoke)({
            method: 'initialize',
            args: this.spec.funcArgsToScVals("initialize", { token, start_id }),
            ...options,
            ...this.options,
            parseResultXdr: () => { },
        });
    }
    async getStream({ stream_id }, options = {}) {
        return await (0, invoke_js_1.invoke)({
            method: 'get_stream',
            args: this.spec.funcArgsToScVals("get_stream", { stream_id }),
            ...options,
            ...this.options,
            parseResultXdr: (xdr) => {
                return this.spec.funcResToNative("get_stream", xdr);
            },
        });
    }
    async getStreamsByUser({ caller }, options = {}) {
        return await (0, invoke_js_1.invoke)({
            method: 'get_streams_by_user',
            args: this.spec.funcArgsToScVals("get_streams_by_user", { caller }),
            ...options,
            ...this.options,
            parseResultXdr: (xdr) => {
                return this.spec.funcResToNative("get_streams_by_user", xdr);
            },
        });
    }
    /**
 * Returns either the delta in seconds between `ledger.timestamp` and `startTime` or between `stopTime` and `startTime, whichever is smaller.
 * If `block.timestamp` is before `startTime`, it returns 0.
 * Panics if the id does not point to a valid stream.
 */
    async deltaOf({ stream_id }, options = {}) {
        return await (0, invoke_js_1.invoke)({
            method: 'delta_of',
            args: this.spec.funcArgsToScVals("delta_of", { stream_id }),
            ...options,
            ...this.options,
            parseResultXdr: (xdr) => {
                return this.spec.funcResToNative("delta_of", xdr);
            },
        });
    }
    /**
 * Returns the amount of tokens that have already been released to the recipient.
 * Panics if the id does not point to a valid stream.
 * @param stream_id The id of the stream
 * @param who The address of the caller
 * @return The amount of tokens that have already been released
 */
    async balanceOf({ stream_id, caller }, options = {}) {
        return await (0, invoke_js_1.invoke)({
            method: 'balance_of',
            args: this.spec.funcArgsToScVals("balance_of", { stream_id, caller }),
            ...options,
            ...this.options,
            parseResultXdr: (xdr) => {
                return this.spec.funcResToNative("balance_of", xdr);
            },
        });
    }
    async createStream({ sender, recipient, amount, token_address, start_time, stop_time }, options = {}) {
        return await (0, invoke_js_1.invoke)({
            method: 'create_stream',
            args: this.spec.funcArgsToScVals("create_stream", { sender, recipient, amount, token_address, start_time, stop_time }),
            ...options,
            ...this.options,
            parseResultXdr: (xdr) => {
                return this.spec.funcResToNative("create_stream", xdr);
            },
        });
    }
    async withdrawFromStream({ recipient, stream_id, amount }, options = {}) {
        return await (0, invoke_js_1.invoke)({
            method: 'withdraw_from_stream',
            args: this.spec.funcArgsToScVals("withdraw_from_stream", { recipient, stream_id, amount }),
            ...options,
            ...this.options,
            parseResultXdr: () => { },
        });
    }
    /**
 * Cancels the stream and transfers the tokens back on a pro rata basis.
 * Throws if the id does not point to a valid stream.
 * Throws if the caller is not the sender or the recipient of the stream.
 * Throws if there is a token transfer failure.
 * @param stream_id The id of the stream to cancel.
 * @return bool true=success, otherwise false.
 */
    async cancelStream({ caller, stream_id }, options = {}) {
        return await (0, invoke_js_1.invoke)({
            method: 'cancel_stream',
            args: this.spec.funcArgsToScVals("cancel_stream", { caller, stream_id }),
            ...options,
            ...this.options,
            parseResultXdr: () => { },
        });
    }
}
exports.Contract = Contract;
