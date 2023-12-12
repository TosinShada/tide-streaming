import * as SorobanClient from 'soroban-client';
import { ContractSpec, Address } from 'soroban-client';
import { Buffer } from "buffer";
import { invoke } from './invoke.js';
import type { ResponseTypes, Wallet, ClassOptions } from './method-options.js'

export * from './invoke.js'
export * from './method-options.js'

export type u32 = number;
export type i32 = number;
export type u64 = bigint;
export type i64 = bigint;
export type u128 = bigint;
export type i128 = bigint;
export type u256 = bigint;
export type i256 = bigint;
export type Option<T> = T | undefined;
export type Typepoint = bigint;
export type Duration = bigint;
export {Address};

/// Error interface containing the error message
export interface Error_ { message: string };

export interface Result<T, E extends Error_> {
    unwrap(): T,
    unwrapErr(): E,
    isOk(): boolean,
    isErr(): boolean,
};

export class Ok<T, E extends Error_ = Error_> implements Result<T, E> {
    constructor(readonly value: T) { }
    unwrapErr(): E {
        throw new Error('No error');
    }
    unwrap(): T {
        return this.value;
    }

    isOk(): boolean {
        return true;
    }

    isErr(): boolean {
        return !this.isOk()
    }
}

export class Err<E extends Error_ = Error_> implements Result<any, E> {
    constructor(readonly error: E) { }
    unwrapErr(): E {
        return this.error;
    }
    unwrap(): never {
        throw new Error(this.error.message);
    }

    isOk(): boolean {
        return false;
    }

    isErr(): boolean {
        return !this.isOk()
    }
}

if (typeof window !== 'undefined') {
    //@ts-ignore Buffer exists
    window.Buffer = window.Buffer || Buffer;
}

const regex = /Error\(Contract, #(\d+)\)/;

function parseError(message: string): Err | undefined {
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

export const networks = {
    futurenet: {
        networkPassphrase: "Test SDF Future Network ; October 2022",
        contractId: "CB4LMZE3AYMUSBLRJPIJ5IEKV3KPVVODYQWOKT2BGZVY62XZ7AI2MTQF",
    }
} as const

export interface Stream {
  deposit: i128;
  id: u32;
  is_cancelled: boolean;
  recipient: string;
  sender: string;
  start_time: u64;
  stop_time: u64;
  token_address: string;
  token_decimals: u32;
  token_symbol: string;
  withdrawn: i128;
}

export type DataKey = {tag: "Token", values: void} | {tag: "NextStreamId", values: void} | {tag: "Streams", values: readonly [u32]} | {tag: "UserStreams", values: readonly [string]};

const Errors = {

}

export class Contract {
            spec: ContractSpec;
    constructor(public readonly options: ClassOptions) {
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
    initialize = async <R extends ResponseTypes = undefined>({token}: {token: string}, options: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number
        /**
         * What type of response to return.
         *
         *   - `undefined`, the default, parses the returned XDR as `void`. Runs preflight, checks to see if auth/signing is required, and sends the transaction if so. If there's no error and `secondsToWait` is positive, awaits the finalized transaction.
         *   - `'simulated'` will only simulate/preflight the transaction, even if it's a change/set method that requires auth/signing. Returns full preflight info.
         *   - `'full'` return the full RPC response, meaning either 1. the preflight info, if it's a view/read method that doesn't require auth/signing, or 2. the `sendTransaction` response, if there's a problem with sending the transaction or if you set `secondsToWait` to 0, or 3. the `getTransaction` response, if it's a change method with no `sendTransaction` errors and a positive `secondsToWait`.
         */
        responseType?: R
        /**
         * If the simulation shows that this invocation requires auth/signing, `invoke` will wait `secondsToWait` seconds for the transaction to complete before giving up and returning the incomplete {@link SorobanClient.SorobanRpc.GetTransactionResponse} results (or attempting to parse their probably-missing XDR with `parseResultXdr`, depending on `responseType`). Set this to `0` to skip waiting altogether, which will return you {@link SorobanClient.SorobanRpc.SendTransactionResponse} more quickly, before the transaction has time to be included in the ledger. Default: 10.
         */
        secondsToWait?: number
    } = {}) => {
                    return await invoke({
            method: 'initialize',
            args: this.spec.funcArgsToScVals("initialize", {token: new Address(token)}),
            ...options,
            ...this.options,
            parseResultXdr: () => {},
        });
    }


    getStream = async <R extends ResponseTypes = undefined>({stream_id}: {stream_id: u32}, options: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number
        /**
         * What type of response to return.
         *
         *   - `undefined`, the default, parses the returned XDR as `Stream`. Runs preflight, checks to see if auth/signing is required, and sends the transaction if so. If there's no error and `secondsToWait` is positive, awaits the finalized transaction.
         *   - `'simulated'` will only simulate/preflight the transaction, even if it's a change/set method that requires auth/signing. Returns full preflight info.
         *   - `'full'` return the full RPC response, meaning either 1. the preflight info, if it's a view/read method that doesn't require auth/signing, or 2. the `sendTransaction` response, if there's a problem with sending the transaction or if you set `secondsToWait` to 0, or 3. the `getTransaction` response, if it's a change method with no `sendTransaction` errors and a positive `secondsToWait`.
         */
        responseType?: R
        /**
         * If the simulation shows that this invocation requires auth/signing, `invoke` will wait `secondsToWait` seconds for the transaction to complete before giving up and returning the incomplete {@link SorobanClient.SorobanRpc.GetTransactionResponse} results (or attempting to parse their probably-missing XDR with `parseResultXdr`, depending on `responseType`). Set this to `0` to skip waiting altogether, which will return you {@link SorobanClient.SorobanRpc.SendTransactionResponse} more quickly, before the transaction has time to be included in the ledger. Default: 10.
         */
        secondsToWait?: number
    } = {}) => {
                    return await invoke({
            method: 'get_stream',
            args: this.spec.funcArgsToScVals("get_stream", {stream_id}),
            ...options,
            ...this.options,
            parseResultXdr: (xdr): Stream => {
                return this.spec.funcResToNative("get_stream", xdr);
            },
        });
    }


    getStreamsByUser = async <R extends ResponseTypes = undefined>({caller}: {caller: string}, options: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number
        /**
         * What type of response to return.
         *
         *   - `undefined`, the default, parses the returned XDR as `Array<Stream>`. Runs preflight, checks to see if auth/signing is required, and sends the transaction if so. If there's no error and `secondsToWait` is positive, awaits the finalized transaction.
         *   - `'simulated'` will only simulate/preflight the transaction, even if it's a change/set method that requires auth/signing. Returns full preflight info.
         *   - `'full'` return the full RPC response, meaning either 1. the preflight info, if it's a view/read method that doesn't require auth/signing, or 2. the `sendTransaction` response, if there's a problem with sending the transaction or if you set `secondsToWait` to 0, or 3. the `getTransaction` response, if it's a change method with no `sendTransaction` errors and a positive `secondsToWait`.
         */
        responseType?: R
        /**
         * If the simulation shows that this invocation requires auth/signing, `invoke` will wait `secondsToWait` seconds for the transaction to complete before giving up and returning the incomplete {@link SorobanClient.SorobanRpc.GetTransactionResponse} results (or attempting to parse their probably-missing XDR with `parseResultXdr`, depending on `responseType`). Set this to `0` to skip waiting altogether, which will return you {@link SorobanClient.SorobanRpc.SendTransactionResponse} more quickly, before the transaction has time to be included in the ledger. Default: 10.
         */
        secondsToWait?: number
    } = {}) => {
                    return await invoke({
            method: 'get_streams_by_user',
            args: this.spec.funcArgsToScVals("get_streams_by_user", {caller: new Address(caller)}),
            ...options,
            ...this.options,
            parseResultXdr: (xdr): Array<Stream> => {
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
streamedAmount = async <R extends ResponseTypes = undefined>({stream_id}: {stream_id: u32}, options: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number
        /**
         * What type of response to return.
         *
         *   - `undefined`, the default, parses the returned XDR as `i128`. Runs preflight, checks to see if auth/signing is required, and sends the transaction if so. If there's no error and `secondsToWait` is positive, awaits the finalized transaction.
         *   - `'simulated'` will only simulate/preflight the transaction, even if it's a change/set method that requires auth/signing. Returns full preflight info.
         *   - `'full'` return the full RPC response, meaning either 1. the preflight info, if it's a view/read method that doesn't require auth/signing, or 2. the `sendTransaction` response, if there's a problem with sending the transaction or if you set `secondsToWait` to 0, or 3. the `getTransaction` response, if it's a change method with no `sendTransaction` errors and a positive `secondsToWait`.
         */
        responseType?: R
        /**
         * If the simulation shows that this invocation requires auth/signing, `invoke` will wait `secondsToWait` seconds for the transaction to complete before giving up and returning the incomplete {@link SorobanClient.SorobanRpc.GetTransactionResponse} results (or attempting to parse their probably-missing XDR with `parseResultXdr`, depending on `responseType`). Set this to `0` to skip waiting altogether, which will return you {@link SorobanClient.SorobanRpc.SendTransactionResponse} more quickly, before the transaction has time to be included in the ledger. Default: 10.
         */
        secondsToWait?: number
    } = {}) => {
                    return await invoke({
            method: 'streamed_amount',
            args: this.spec.funcArgsToScVals("streamed_amount", {stream_id}),
            ...options,
            ...this.options,
            parseResultXdr: (xdr): i128 => {
                return this.spec.funcResToNative("streamed_amount", xdr);
            },
        });
    }


    createStream = async <R extends ResponseTypes = undefined>({sender, recipient, amount, token_address, start_time, stop_time}: {sender: string, recipient: string, amount: i128, token_address: string, start_time: u64, stop_time: u64}, options: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number
        /**
         * What type of response to return.
         *
         *   - `undefined`, the default, parses the returned XDR as `u32`. Runs preflight, checks to see if auth/signing is required, and sends the transaction if so. If there's no error and `secondsToWait` is positive, awaits the finalized transaction.
         *   - `'simulated'` will only simulate/preflight the transaction, even if it's a change/set method that requires auth/signing. Returns full preflight info.
         *   - `'full'` return the full RPC response, meaning either 1. the preflight info, if it's a view/read method that doesn't require auth/signing, or 2. the `sendTransaction` response, if there's a problem with sending the transaction or if you set `secondsToWait` to 0, or 3. the `getTransaction` response, if it's a change method with no `sendTransaction` errors and a positive `secondsToWait`.
         */
        responseType?: R
        /**
         * If the simulation shows that this invocation requires auth/signing, `invoke` will wait `secondsToWait` seconds for the transaction to complete before giving up and returning the incomplete {@link SorobanClient.SorobanRpc.GetTransactionResponse} results (or attempting to parse their probably-missing XDR with `parseResultXdr`, depending on `responseType`). Set this to `0` to skip waiting altogether, which will return you {@link SorobanClient.SorobanRpc.SendTransactionResponse} more quickly, before the transaction has time to be included in the ledger. Default: 10.
         */
        secondsToWait?: number
    } = {}) => {
                    return await invoke({
            method: 'create_stream',
            args: this.spec.funcArgsToScVals("create_stream", {sender: new Address(sender), recipient: new Address(recipient), amount, token_address: new Address(token_address), start_time, stop_time}),
            ...options,
            ...this.options,
            parseResultXdr: (xdr): u32 => {
                return this.spec.funcResToNative("create_stream", xdr);
            },
        });
    }


    withdrawFromStream = async <R extends ResponseTypes = undefined>({caller, recipient, stream_id, amount}: {caller: string, recipient: string, stream_id: u32, amount: i128}, options: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number
        /**
         * What type of response to return.
         *
         *   - `undefined`, the default, parses the returned XDR as `void`. Runs preflight, checks to see if auth/signing is required, and sends the transaction if so. If there's no error and `secondsToWait` is positive, awaits the finalized transaction.
         *   - `'simulated'` will only simulate/preflight the transaction, even if it's a change/set method that requires auth/signing. Returns full preflight info.
         *   - `'full'` return the full RPC response, meaning either 1. the preflight info, if it's a view/read method that doesn't require auth/signing, or 2. the `sendTransaction` response, if there's a problem with sending the transaction or if you set `secondsToWait` to 0, or 3. the `getTransaction` response, if it's a change method with no `sendTransaction` errors and a positive `secondsToWait`.
         */
        responseType?: R
        /**
         * If the simulation shows that this invocation requires auth/signing, `invoke` will wait `secondsToWait` seconds for the transaction to complete before giving up and returning the incomplete {@link SorobanClient.SorobanRpc.GetTransactionResponse} results (or attempting to parse their probably-missing XDR with `parseResultXdr`, depending on `responseType`). Set this to `0` to skip waiting altogether, which will return you {@link SorobanClient.SorobanRpc.SendTransactionResponse} more quickly, before the transaction has time to be included in the ledger. Default: 10.
         */
        secondsToWait?: number
    } = {}) => {
                    return await invoke({
            method: 'withdraw_from_stream',
            args: this.spec.funcArgsToScVals("withdraw_from_stream", {caller: new Address(caller), recipient: new Address(recipient), stream_id, amount}),
            ...options,
            ...this.options,
            parseResultXdr: () => {},
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
cancelStream = async <R extends ResponseTypes = undefined>({caller, stream_id}: {caller: string, stream_id: u32}, options: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number
        /**
         * What type of response to return.
         *
         *   - `undefined`, the default, parses the returned XDR as `void`. Runs preflight, checks to see if auth/signing is required, and sends the transaction if so. If there's no error and `secondsToWait` is positive, awaits the finalized transaction.
         *   - `'simulated'` will only simulate/preflight the transaction, even if it's a change/set method that requires auth/signing. Returns full preflight info.
         *   - `'full'` return the full RPC response, meaning either 1. the preflight info, if it's a view/read method that doesn't require auth/signing, or 2. the `sendTransaction` response, if there's a problem with sending the transaction or if you set `secondsToWait` to 0, or 3. the `getTransaction` response, if it's a change method with no `sendTransaction` errors and a positive `secondsToWait`.
         */
        responseType?: R
        /**
         * If the simulation shows that this invocation requires auth/signing, `invoke` will wait `secondsToWait` seconds for the transaction to complete before giving up and returning the incomplete {@link SorobanClient.SorobanRpc.GetTransactionResponse} results (or attempting to parse their probably-missing XDR with `parseResultXdr`, depending on `responseType`). Set this to `0` to skip waiting altogether, which will return you {@link SorobanClient.SorobanRpc.SendTransactionResponse} more quickly, before the transaction has time to be included in the ledger. Default: 10.
         */
        secondsToWait?: number
    } = {}) => {
                    return await invoke({
            method: 'cancel_stream',
            args: this.spec.funcArgsToScVals("cancel_stream", {caller: new Address(caller), stream_id}),
            ...options,
            ...this.options,
            parseResultXdr: () => {},
        });
    }

}