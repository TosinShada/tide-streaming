import * as SorobanClient from 'soroban-client';
import { ContractSpec, Address } from 'soroban-client';
import type { ClassOptions } from './method-options.js';
export * from './invoke.js';
export * from './method-options.js';
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
export { Address };
export interface Error_ {
    message: string;
}
export interface Result<T, E extends Error_> {
    unwrap(): T;
    unwrapErr(): E;
    isOk(): boolean;
    isErr(): boolean;
}
export declare class Ok<T, E extends Error_ = Error_> implements Result<T, E> {
    readonly value: T;
    constructor(value: T);
    unwrapErr(): E;
    unwrap(): T;
    isOk(): boolean;
    isErr(): boolean;
}
export declare class Err<E extends Error_ = Error_> implements Result<any, E> {
    readonly error: E;
    constructor(error: E);
    unwrapErr(): E;
    unwrap(): never;
    isOk(): boolean;
    isErr(): boolean;
}
export declare const networks: {
    readonly futurenet: {
        readonly networkPassphrase: "Test SDF Future Network ; October 2022";
        readonly contractId: "CB4LMZE3AYMUSBLRJPIJ5IEKV3KPVVODYQWOKT2BGZVY62XZ7AI2MTQF";
    };
};
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
export type DataKey = {
    tag: "Token";
    values: void;
} | {
    tag: "NextStreamId";
    values: void;
} | {
    tag: "Streams";
    values: readonly [u32];
} | {
    tag: "UserStreams";
    values: readonly [string];
};
export declare class Contract {
    readonly options: ClassOptions;
    spec: ContractSpec;
    constructor(options: ClassOptions);
    initialize: <R extends "simulated" | "full" | undefined = undefined>({ token }: {
        token: string;
    }, options?: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number | undefined;
        /**
         * What type of response to return.
         *
         *   - `undefined`, the default, parses the returned XDR as `void`. Runs preflight, checks to see if auth/signing is required, and sends the transaction if so. If there's no error and `secondsToWait` is positive, awaits the finalized transaction.
         *   - `'simulated'` will only simulate/preflight the transaction, even if it's a change/set method that requires auth/signing. Returns full preflight info.
         *   - `'full'` return the full RPC response, meaning either 1. the preflight info, if it's a view/read method that doesn't require auth/signing, or 2. the `sendTransaction` response, if there's a problem with sending the transaction or if you set `secondsToWait` to 0, or 3. the `getTransaction` response, if it's a change method with no `sendTransaction` errors and a positive `secondsToWait`.
         */
        responseType?: R | undefined;
        /**
         * If the simulation shows that this invocation requires auth/signing, `invoke` will wait `secondsToWait` seconds for the transaction to complete before giving up and returning the incomplete {@link SorobanClient.SorobanRpc.GetTransactionResponse} results (or attempting to parse their probably-missing XDR with `parseResultXdr`, depending on `responseType`). Set this to `0` to skip waiting altogether, which will return you {@link SorobanClient.SorobanRpc.SendTransactionResponse} more quickly, before the transaction has time to be included in the ledger. Default: 10.
         */
        secondsToWait?: number | undefined;
    }) => Promise<R extends undefined ? void : R extends "simulated" ? SorobanClient.SorobanRpc.SimulateTransactionResponse : R extends "full" ? SorobanClient.SorobanRpc.SimulateTransactionResponse | SorobanClient.SorobanRpc.SendTransactionResponse | SorobanClient.SorobanRpc.GetTransactionResponse : void>;
    getStream: <R extends "simulated" | "full" | undefined = undefined>({ stream_id }: {
        stream_id: u32;
    }, options?: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number | undefined;
        /**
         * What type of response to return.
         *
         *   - `undefined`, the default, parses the returned XDR as `Stream`. Runs preflight, checks to see if auth/signing is required, and sends the transaction if so. If there's no error and `secondsToWait` is positive, awaits the finalized transaction.
         *   - `'simulated'` will only simulate/preflight the transaction, even if it's a change/set method that requires auth/signing. Returns full preflight info.
         *   - `'full'` return the full RPC response, meaning either 1. the preflight info, if it's a view/read method that doesn't require auth/signing, or 2. the `sendTransaction` response, if there's a problem with sending the transaction or if you set `secondsToWait` to 0, or 3. the `getTransaction` response, if it's a change method with no `sendTransaction` errors and a positive `secondsToWait`.
         */
        responseType?: R | undefined;
        /**
         * If the simulation shows that this invocation requires auth/signing, `invoke` will wait `secondsToWait` seconds for the transaction to complete before giving up and returning the incomplete {@link SorobanClient.SorobanRpc.GetTransactionResponse} results (or attempting to parse their probably-missing XDR with `parseResultXdr`, depending on `responseType`). Set this to `0` to skip waiting altogether, which will return you {@link SorobanClient.SorobanRpc.SendTransactionResponse} more quickly, before the transaction has time to be included in the ledger. Default: 10.
         */
        secondsToWait?: number | undefined;
    }) => Promise<R extends undefined ? Stream : R extends "simulated" ? SorobanClient.SorobanRpc.SimulateTransactionResponse : R extends "full" ? SorobanClient.SorobanRpc.SimulateTransactionResponse | SorobanClient.SorobanRpc.SendTransactionResponse | SorobanClient.SorobanRpc.GetTransactionResponse : Stream>;
    getStreamsByUser: <R extends "simulated" | "full" | undefined = undefined>({ caller }: {
        caller: string;
    }, options?: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number | undefined;
        /**
         * What type of response to return.
         *
         *   - `undefined`, the default, parses the returned XDR as `Array<Stream>`. Runs preflight, checks to see if auth/signing is required, and sends the transaction if so. If there's no error and `secondsToWait` is positive, awaits the finalized transaction.
         *   - `'simulated'` will only simulate/preflight the transaction, even if it's a change/set method that requires auth/signing. Returns full preflight info.
         *   - `'full'` return the full RPC response, meaning either 1. the preflight info, if it's a view/read method that doesn't require auth/signing, or 2. the `sendTransaction` response, if there's a problem with sending the transaction or if you set `secondsToWait` to 0, or 3. the `getTransaction` response, if it's a change method with no `sendTransaction` errors and a positive `secondsToWait`.
         */
        responseType?: R | undefined;
        /**
         * If the simulation shows that this invocation requires auth/signing, `invoke` will wait `secondsToWait` seconds for the transaction to complete before giving up and returning the incomplete {@link SorobanClient.SorobanRpc.GetTransactionResponse} results (or attempting to parse their probably-missing XDR with `parseResultXdr`, depending on `responseType`). Set this to `0` to skip waiting altogether, which will return you {@link SorobanClient.SorobanRpc.SendTransactionResponse} more quickly, before the transaction has time to be included in the ledger. Default: 10.
         */
        secondsToWait?: number | undefined;
    }) => Promise<R extends undefined ? Stream[] : R extends "simulated" ? SorobanClient.SorobanRpc.SimulateTransactionResponse : R extends "full" ? SorobanClient.SorobanRpc.SimulateTransactionResponse | SorobanClient.SorobanRpc.SendTransactionResponse | SorobanClient.SorobanRpc.GetTransactionResponse : Stream[]>;
    /**
     * Returns the amount of tokens that have already been released to the recipient.
 * Panics if the id does not point to a valid stream.
 * @param stream_id The id of the stream
 * @param who The address of the caller
 * @return The amount of tokens that have already been released
     */
    streamedAmount: <R extends "simulated" | "full" | undefined = undefined>({ stream_id }: {
        stream_id: u32;
    }, options?: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number | undefined;
        /**
         * What type of response to return.
         *
         *   - `undefined`, the default, parses the returned XDR as `i128`. Runs preflight, checks to see if auth/signing is required, and sends the transaction if so. If there's no error and `secondsToWait` is positive, awaits the finalized transaction.
         *   - `'simulated'` will only simulate/preflight the transaction, even if it's a change/set method that requires auth/signing. Returns full preflight info.
         *   - `'full'` return the full RPC response, meaning either 1. the preflight info, if it's a view/read method that doesn't require auth/signing, or 2. the `sendTransaction` response, if there's a problem with sending the transaction or if you set `secondsToWait` to 0, or 3. the `getTransaction` response, if it's a change method with no `sendTransaction` errors and a positive `secondsToWait`.
         */
        responseType?: R | undefined;
        /**
         * If the simulation shows that this invocation requires auth/signing, `invoke` will wait `secondsToWait` seconds for the transaction to complete before giving up and returning the incomplete {@link SorobanClient.SorobanRpc.GetTransactionResponse} results (or attempting to parse their probably-missing XDR with `parseResultXdr`, depending on `responseType`). Set this to `0` to skip waiting altogether, which will return you {@link SorobanClient.SorobanRpc.SendTransactionResponse} more quickly, before the transaction has time to be included in the ledger. Default: 10.
         */
        secondsToWait?: number | undefined;
    }) => Promise<R extends undefined ? bigint : R extends "simulated" ? SorobanClient.SorobanRpc.SimulateTransactionResponse : R extends "full" ? SorobanClient.SorobanRpc.SimulateTransactionResponse | SorobanClient.SorobanRpc.SendTransactionResponse | SorobanClient.SorobanRpc.GetTransactionResponse : bigint>;
    createStream: <R extends "simulated" | "full" | undefined = undefined>({ sender, recipient, amount, token_address, start_time, stop_time }: {
        sender: string;
        recipient: string;
        amount: i128;
        token_address: string;
        start_time: u64;
        stop_time: u64;
    }, options?: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number | undefined;
        /**
         * What type of response to return.
         *
         *   - `undefined`, the default, parses the returned XDR as `u32`. Runs preflight, checks to see if auth/signing is required, and sends the transaction if so. If there's no error and `secondsToWait` is positive, awaits the finalized transaction.
         *   - `'simulated'` will only simulate/preflight the transaction, even if it's a change/set method that requires auth/signing. Returns full preflight info.
         *   - `'full'` return the full RPC response, meaning either 1. the preflight info, if it's a view/read method that doesn't require auth/signing, or 2. the `sendTransaction` response, if there's a problem with sending the transaction or if you set `secondsToWait` to 0, or 3. the `getTransaction` response, if it's a change method with no `sendTransaction` errors and a positive `secondsToWait`.
         */
        responseType?: R | undefined;
        /**
         * If the simulation shows that this invocation requires auth/signing, `invoke` will wait `secondsToWait` seconds for the transaction to complete before giving up and returning the incomplete {@link SorobanClient.SorobanRpc.GetTransactionResponse} results (or attempting to parse their probably-missing XDR with `parseResultXdr`, depending on `responseType`). Set this to `0` to skip waiting altogether, which will return you {@link SorobanClient.SorobanRpc.SendTransactionResponse} more quickly, before the transaction has time to be included in the ledger. Default: 10.
         */
        secondsToWait?: number | undefined;
    }) => Promise<R extends undefined ? number : R extends "simulated" ? SorobanClient.SorobanRpc.SimulateTransactionResponse : R extends "full" ? SorobanClient.SorobanRpc.SimulateTransactionResponse | SorobanClient.SorobanRpc.SendTransactionResponse | SorobanClient.SorobanRpc.GetTransactionResponse : number>;
    withdrawFromStream: <R extends "simulated" | "full" | undefined = undefined>({ caller, recipient, stream_id, amount }: {
        caller: string;
        recipient: string;
        stream_id: u32;
        amount: i128;
    }, options?: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number | undefined;
        /**
         * What type of response to return.
         *
         *   - `undefined`, the default, parses the returned XDR as `void`. Runs preflight, checks to see if auth/signing is required, and sends the transaction if so. If there's no error and `secondsToWait` is positive, awaits the finalized transaction.
         *   - `'simulated'` will only simulate/preflight the transaction, even if it's a change/set method that requires auth/signing. Returns full preflight info.
         *   - `'full'` return the full RPC response, meaning either 1. the preflight info, if it's a view/read method that doesn't require auth/signing, or 2. the `sendTransaction` response, if there's a problem with sending the transaction or if you set `secondsToWait` to 0, or 3. the `getTransaction` response, if it's a change method with no `sendTransaction` errors and a positive `secondsToWait`.
         */
        responseType?: R | undefined;
        /**
         * If the simulation shows that this invocation requires auth/signing, `invoke` will wait `secondsToWait` seconds for the transaction to complete before giving up and returning the incomplete {@link SorobanClient.SorobanRpc.GetTransactionResponse} results (or attempting to parse their probably-missing XDR with `parseResultXdr`, depending on `responseType`). Set this to `0` to skip waiting altogether, which will return you {@link SorobanClient.SorobanRpc.SendTransactionResponse} more quickly, before the transaction has time to be included in the ledger. Default: 10.
         */
        secondsToWait?: number | undefined;
    }) => Promise<R extends undefined ? void : R extends "simulated" ? SorobanClient.SorobanRpc.SimulateTransactionResponse : R extends "full" ? SorobanClient.SorobanRpc.SimulateTransactionResponse | SorobanClient.SorobanRpc.SendTransactionResponse | SorobanClient.SorobanRpc.GetTransactionResponse : void>;
    /**
     * Cancels the stream and transfers the tokens back on a pro rata basis.
 * Throws if the id does not point to a valid stream.
 * Throws if the caller is not the sender or the recipient of the stream.
 * Throws if there is a token transfer failure.
 * @param stream_id The id of the stream to cancel.
 * @return bool true=success, otherwise false.
     */
    cancelStream: <R extends "simulated" | "full" | undefined = undefined>({ caller, stream_id }: {
        caller: string;
        stream_id: u32;
    }, options?: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number | undefined;
        /**
         * What type of response to return.
         *
         *   - `undefined`, the default, parses the returned XDR as `void`. Runs preflight, checks to see if auth/signing is required, and sends the transaction if so. If there's no error and `secondsToWait` is positive, awaits the finalized transaction.
         *   - `'simulated'` will only simulate/preflight the transaction, even if it's a change/set method that requires auth/signing. Returns full preflight info.
         *   - `'full'` return the full RPC response, meaning either 1. the preflight info, if it's a view/read method that doesn't require auth/signing, or 2. the `sendTransaction` response, if there's a problem with sending the transaction or if you set `secondsToWait` to 0, or 3. the `getTransaction` response, if it's a change method with no `sendTransaction` errors and a positive `secondsToWait`.
         */
        responseType?: R | undefined;
        /**
         * If the simulation shows that this invocation requires auth/signing, `invoke` will wait `secondsToWait` seconds for the transaction to complete before giving up and returning the incomplete {@link SorobanClient.SorobanRpc.GetTransactionResponse} results (or attempting to parse their probably-missing XDR with `parseResultXdr`, depending on `responseType`). Set this to `0` to skip waiting altogether, which will return you {@link SorobanClient.SorobanRpc.SendTransactionResponse} more quickly, before the transaction has time to be included in the ledger. Default: 10.
         */
        secondsToWait?: number | undefined;
    }) => Promise<R extends undefined ? void : R extends "simulated" ? SorobanClient.SorobanRpc.SimulateTransactionResponse : R extends "full" ? SorobanClient.SorobanRpc.SimulateTransactionResponse | SorobanClient.SorobanRpc.SendTransactionResponse | SorobanClient.SorobanRpc.GetTransactionResponse : void>;
}
