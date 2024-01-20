import { ContractSpec, Address } from 'stellar-sdk';
import { Buffer } from "buffer";
import { AssembledTransaction } from './assembled-tx.js';
export * from './assembled-tx.js';
export * from './method-options.js';
if (typeof window !== 'undefined') {
    //@ts-ignore Buffer exists
    window.Buffer = window.Buffer || Buffer;
}
export const networks = {
    testnet: {
        networkPassphrase: "Test SDF Network ; September 2015",
        contractId: "CAATXU6OCY3BHIIY44NN73LM3PRAQSEU2ASNZ43XNAFECAENPVSRJEBJ",
    }
};
/**
    
    */
export const Errors = {};
export class Contract {
    options;
    spec;
    constructor(options) {
        this.options = options;
        this.spec = new ContractSpec([
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
    parsers = {
        initialize: () => { },
        getStream: (result) => this.spec.funcResToNative("get_stream", result),
        getStreamsByUser: (result) => this.spec.funcResToNative("get_streams_by_user", result),
        streamedAmount: (result) => this.spec.funcResToNative("streamed_amount", result),
        createStream: (result) => this.spec.funcResToNative("create_stream", result),
        withdrawFromStream: () => { },
        cancelStream: () => { }
    };
    txFromJSON = (json) => {
        const { method, ...tx } = JSON.parse(json);
        return AssembledTransaction.fromJSON({
            ...this.options,
            method,
            parseResultXdr: this.parsers[method],
        }, tx);
    };
    fromJSON = {
        initialize: (this.txFromJSON),
        getStream: (this.txFromJSON),
        getStreamsByUser: (this.txFromJSON),
        streamedAmount: (this.txFromJSON),
        createStream: (this.txFromJSON),
        withdrawFromStream: (this.txFromJSON),
        cancelStream: (this.txFromJSON)
    };
    /**
* Construct and simulate a initialize transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    initialize = async ({ token }, options = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'initialize',
            args: this.spec.funcArgsToScVals("initialize", { token: new Address(token) }),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['initialize'],
        });
    };
    /**
* Construct and simulate a get_stream transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    getStream = async ({ stream_id }, options = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'get_stream',
            args: this.spec.funcArgsToScVals("get_stream", { stream_id }),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['getStream'],
        });
    };
    /**
* Construct and simulate a get_streams_by_user transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    getStreamsByUser = async ({ caller }, options = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'get_streams_by_user',
            args: this.spec.funcArgsToScVals("get_streams_by_user", { caller: new Address(caller) }),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['getStreamsByUser'],
        });
    };
    /**
* Construct and simulate a streamed_amount transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.Returns the amount of tokens that have already been released to the recipient.
* Panics if the id does not point to a valid stream.
* @param stream_id The id of the stream
* @param who The address of the caller
* @return The amount of tokens that have already been released
*/
    streamedAmount = async ({ stream_id }, options = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'streamed_amount',
            args: this.spec.funcArgsToScVals("streamed_amount", { stream_id }),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['streamedAmount'],
        });
    };
    /**
* Construct and simulate a create_stream transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    createStream = async ({ sender, recipient, amount, token_address, start_time, stop_time }, options = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'create_stream',
            args: this.spec.funcArgsToScVals("create_stream", { sender: new Address(sender), recipient: new Address(recipient), amount, token_address: new Address(token_address), start_time, stop_time }),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['createStream'],
        });
    };
    /**
* Construct and simulate a withdraw_from_stream transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    withdrawFromStream = async ({ caller, recipient, stream_id, amount }, options = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'withdraw_from_stream',
            args: this.spec.funcArgsToScVals("withdraw_from_stream", { caller: new Address(caller), recipient: new Address(recipient), stream_id, amount }),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['withdrawFromStream'],
        });
    };
    /**
* Construct and simulate a cancel_stream transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.Cancels the stream and transfers the tokens back on a pro rata basis.
* Throws if the id does not point to a valid stream.
* Throws if the caller is not the sender or the recipient of the stream.
* Throws if there is a token transfer failure.
* @param stream_id The id of the stream to cancel.
* @return bool true=success, otherwise false.
*/
    cancelStream = async ({ caller, stream_id }, options = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'cancel_stream',
            args: this.spec.funcArgsToScVals("cancel_stream", { caller: new Address(caller), stream_id }),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['cancelStream'],
        });
    };
}
