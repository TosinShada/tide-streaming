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
        contractId: "CAGNADVAEZ4UV3AFMWR6D2E2SLJXUIBSLTMZAOTITESOQBO5S3ZDTNPE",
    }
};
const Errors = {};
class Contract {
    options;
    spec;
    constructor(options) {
        this.options = options;
        this.spec = new soroban_client_1.ContractSpec([
            "AAAAAQAAAAAAAAAAAAAABlN0cmVhbQAAAAAACwAAAAAAAAAHZGVwb3NpdAAAAAALAAAAAAAAAAJpZAAAAAAABAAAAAAAAAAMaXNfY2FuY2VsbGVkAAAAAQAAAAAAAAAJcmVjaXBpZW50AAAAAAAAEwAAAAAAAAAGc2VuZGVyAAAAAAATAAAAAAAAAApzdGFydF90aW1lAAAAAAAGAAAAAAAAAAlzdG9wX3RpbWUAAAAAAAAGAAAAAAAAAA10b2tlbl9hZGRyZXNzAAAAAAAAEwAAAAAAAAAOdG9rZW5fZGVjaW1hbHMAAAAAAAQAAAAAAAAADHRva2VuX3N5bWJvbAAAABAAAAAAAAAACXdpdGhkcmF3bgAAAAAAAAs=",
            "AAAAAgAAAAAAAAAAAAAAB0RhdGFLZXkAAAAABAAAAAAAAAAAAAAABVRva2VuAAAAAAAAAAAAAAAAAAAMTmV4dFN0cmVhbUlkAAAAAQAAAAAAAAAHU3RyZWFtcwAAAAABAAAABAAAAAEAAAAAAAAAC1VzZXJTdHJlYW1zAAAAAAEAAAAT",
            "AAAAAAAAAAAAAAAKaW5pdGlhbGl6ZQAAAAAAAQAAAAAAAAAFdG9rZW4AAAAAAAATAAAAAA==",
            "AAAAAAAAAAAAAAAKZ2V0X3N0cmVhbQAAAAAAAQAAAAAAAAAJc3RyZWFtX2lkAAAAAAAABAAAAAEAAAfQAAAABlN0cmVhbQAA",
            "AAAAAAAAAAAAAAATZ2V0X3N0cmVhbXNfYnlfdXNlcgAAAAABAAAAAAAAAAZjYWxsZXIAAAAAABMAAAABAAAD6gAAB9AAAAAGU3RyZWFtAAA=",
            "AAAAAAAAAQlSZXR1cm5zIHRoZSBhbW91bnQgb2YgdG9rZW5zIHRoYXQgaGF2ZSBhbHJlYWR5IGJlZW4gcmVsZWFzZWQgdG8gdGhlIHJlY2lwaWVudC4KUGFuaWNzIGlmIHRoZSBpZCBkb2VzIG5vdCBwb2ludCB0byBhIHZhbGlkIHN0cmVhbS4KQHBhcmFtIHN0cmVhbV9pZCBUaGUgaWQgb2YgdGhlIHN0cmVhbQpAcGFyYW0gd2hvIFRoZSBhZGRyZXNzIG9mIHRoZSBjYWxsZXIKQHJldHVybiBUaGUgYW1vdW50IG9mIHRva2VucyB0aGF0IGhhdmUgYWxyZWFkeSBiZWVuIHJlbGVhc2VkAAAAAAAAD3N0cmVhbWVkX2Ftb3VudAAAAAABAAAAAAAAAAlzdHJlYW1faWQAAAAAAAAEAAAAAQAAAAs=",
            "AAAAAAAAAAAAAAANY3JlYXRlX3N0cmVhbQAAAAAAAAYAAAAAAAAABnNlbmRlcgAAAAAAEwAAAAAAAAAJcmVjaXBpZW50AAAAAAAAEwAAAAAAAAAGYW1vdW50AAAAAAALAAAAAAAAAA10b2tlbl9hZGRyZXNzAAAAAAAAEwAAAAAAAAAKc3RhcnRfdGltZQAAAAAABgAAAAAAAAAJc3RvcF90aW1lAAAAAAAABgAAAAEAAAAE",
            "AAAAAAAAAAAAAAAUd2l0aGRyYXdfZnJvbV9zdHJlYW0AAAAEAAAAAAAAAAZjYWxsZXIAAAAAABMAAAAAAAAACXJlY2lwaWVudAAAAAAAABMAAAAAAAAACXN0cmVhbV9pZAAAAAAAAAQAAAAAAAAABmFtb3VudAAAAAAACwAAAAA=",
            "AAAAAAAAAUlDYW5jZWxzIHRoZSBzdHJlYW0gYW5kIHRyYW5zZmVycyB0aGUgdG9rZW5zIGJhY2sgb24gYSBwcm8gcmF0YSBiYXNpcy4KVGhyb3dzIGlmIHRoZSBpZCBkb2VzIG5vdCBwb2ludCB0byBhIHZhbGlkIHN0cmVhbS4KVGhyb3dzIGlmIHRoZSBjYWxsZXIgaXMgbm90IHRoZSBzZW5kZXIgb3IgdGhlIHJlY2lwaWVudCBvZiB0aGUgc3RyZWFtLgpUaHJvd3MgaWYgdGhlcmUgaXMgYSB0b2tlbiB0cmFuc2ZlciBmYWlsdXJlLgpAcGFyYW0gc3RyZWFtX2lkIFRoZSBpZCBvZiB0aGUgc3RyZWFtIHRvIGNhbmNlbC4KQHJldHVybiBib29sIHRydWU9c3VjY2Vzcywgb3RoZXJ3aXNlIGZhbHNlLgAAAAAAAA1jYW5jZWxfc3RyZWFtAAAAAAAAAgAAAAAAAAAGY2FsbGVyAAAAAAATAAAAAAAAAAlzdHJlYW1faWQAAAAAAAAEAAAAAA=="
        ]);
    }
    async initialize({ token }, options = {}) {
        return await (0, invoke_js_1.invoke)({
            method: 'initialize',
            args: this.spec.funcArgsToScVals("initialize", { token }),
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
 * Returns the amount of tokens that have already been released to the recipient.
 * Panics if the id does not point to a valid stream.
 * @param stream_id The id of the stream
 * @param who The address of the caller
 * @return The amount of tokens that have already been released
 */
    async streamedAmount({ stream_id }, options = {}) {
        return await (0, invoke_js_1.invoke)({
            method: 'streamed_amount',
            args: this.spec.funcArgsToScVals("streamed_amount", { stream_id }),
            ...options,
            ...this.options,
            parseResultXdr: (xdr) => {
                return this.spec.funcResToNative("streamed_amount", xdr);
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
    async withdrawFromStream({ caller, recipient, stream_id, amount }, options = {}) {
        return await (0, invoke_js_1.invoke)({
            method: 'withdraw_from_stream',
            args: this.spec.funcArgsToScVals("withdraw_from_stream", { caller, recipient, stream_id, amount }),
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
