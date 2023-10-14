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
        contractId: "CDSQFWPHBASD2BBQTQJS4KIMBMFTR63YEPIBIFSACVVNIMFI3IQT36O4",
    }
} as const

export interface Stream {
  deposit: i128;
  id: u32;
  rate_per_second: u64;
  recipient: Address;
  remaining_balance: i128;
  sender: Address;
  start_time: u64;
  stop_time: u64;
  token_address: Address;
  token_decimals: u32;
  token_symbol: string;
}

export interface LocalBalance {
  recipient_balance: i128;
  sender_balance: i128;
  withdrawal_amount: i128;
}

export interface CreateStream {
  duration: u64;
  rate_per_second: u64;
}

export type DataKey = {tag: "Token", values: void} | {tag: "NextStreamId", values: void} | {tag: "Streams", values: readonly [u32]} | {tag: "UserStreams", values: readonly [Address]};

const Errors = {

}

export class Contract {
            spec: ContractSpec;
    constructor(public readonly options: ClassOptions) {
        this.spec = new ContractSpec([
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
    async initialize<R extends ResponseTypes = undefined>({token, start_id}: {token: Address, start_id: u32}, options: {
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
    } = {}) {
                    return await invoke({
            method: 'initialize',
            args: this.spec.funcArgsToScVals("initialize", {token, start_id}),
            ...options,
            ...this.options,
            parseResultXdr: () => {},
        });
    }


    async getStream<R extends ResponseTypes = undefined>({stream_id}: {stream_id: u32}, options: {
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
    } = {}) {
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


    async getStreamsByUser<R extends ResponseTypes = undefined>({caller}: {caller: Address}, options: {
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
    } = {}) {
                    return await invoke({
            method: 'get_streams_by_user',
            args: this.spec.funcArgsToScVals("get_streams_by_user", {caller}),
            ...options,
            ...this.options,
            parseResultXdr: (xdr): Array<Stream> => {
                return this.spec.funcResToNative("get_streams_by_user", xdr);
            },
        });
    }


    /**
 * Returns either the delta in seconds between `ledger.timestamp` and `startTime` or between `stopTime` and `startTime, whichever is smaller.
 * If `block.timestamp` is before `startTime`, it returns 0.
 * Panics if the id does not point to a valid stream.
 */
async deltaOf<R extends ResponseTypes = undefined>({stream_id}: {stream_id: u32}, options: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number
        /**
         * What type of response to return.
         *
         *   - `undefined`, the default, parses the returned XDR as `u64`. Runs preflight, checks to see if auth/signing is required, and sends the transaction if so. If there's no error and `secondsToWait` is positive, awaits the finalized transaction.
         *   - `'simulated'` will only simulate/preflight the transaction, even if it's a change/set method that requires auth/signing. Returns full preflight info.
         *   - `'full'` return the full RPC response, meaning either 1. the preflight info, if it's a view/read method that doesn't require auth/signing, or 2. the `sendTransaction` response, if there's a problem with sending the transaction or if you set `secondsToWait` to 0, or 3. the `getTransaction` response, if it's a change method with no `sendTransaction` errors and a positive `secondsToWait`.
         */
        responseType?: R
        /**
         * If the simulation shows that this invocation requires auth/signing, `invoke` will wait `secondsToWait` seconds for the transaction to complete before giving up and returning the incomplete {@link SorobanClient.SorobanRpc.GetTransactionResponse} results (or attempting to parse their probably-missing XDR with `parseResultXdr`, depending on `responseType`). Set this to `0` to skip waiting altogether, which will return you {@link SorobanClient.SorobanRpc.SendTransactionResponse} more quickly, before the transaction has time to be included in the ledger. Default: 10.
         */
        secondsToWait?: number
    } = {}) {
                    return await invoke({
            method: 'delta_of',
            args: this.spec.funcArgsToScVals("delta_of", {stream_id}),
            ...options,
            ...this.options,
            parseResultXdr: (xdr): u64 => {
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
async balanceOf<R extends ResponseTypes = undefined>({stream_id, caller}: {stream_id: u32, caller: Address}, options: {
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
    } = {}) {
                    return await invoke({
            method: 'balance_of',
            args: this.spec.funcArgsToScVals("balance_of", {stream_id, caller}),
            ...options,
            ...this.options,
            parseResultXdr: (xdr): i128 => {
                return this.spec.funcResToNative("balance_of", xdr);
            },
        });
    }


    async createStream<R extends ResponseTypes = undefined>({sender, recipient, amount, token_address, start_time, stop_time}: {sender: Address, recipient: Address, amount: i128, token_address: Address, start_time: u64, stop_time: u64}, options: {
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
    } = {}) {
                    return await invoke({
            method: 'create_stream',
            args: this.spec.funcArgsToScVals("create_stream", {sender, recipient, amount, token_address, start_time, stop_time}),
            ...options,
            ...this.options,
            parseResultXdr: (xdr): u32 => {
                return this.spec.funcResToNative("create_stream", xdr);
            },
        });
    }


    async withdrawFromStream<R extends ResponseTypes = undefined>({recipient, stream_id, amount}: {recipient: Address, stream_id: u32, amount: i128}, options: {
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
    } = {}) {
                    return await invoke({
            method: 'withdraw_from_stream',
            args: this.spec.funcArgsToScVals("withdraw_from_stream", {recipient, stream_id, amount}),
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
async cancelStream<R extends ResponseTypes = undefined>({caller, stream_id}: {caller: Address, stream_id: u32}, options: {
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
    } = {}) {
                    return await invoke({
            method: 'cancel_stream',
            args: this.spec.funcArgsToScVals("cancel_stream", {caller, stream_id}),
            ...options,
            ...this.options,
            parseResultXdr: () => {},
        });
    }

}