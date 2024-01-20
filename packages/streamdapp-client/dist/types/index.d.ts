import { ContractSpec } from 'stellar-sdk';
import { AssembledTransaction } from './assembled-tx.js';
import type { u32, u64, i128 } from './assembled-tx.js';
import type { ClassOptions } from './method-options.js';
export * from './assembled-tx.js';
export * from './method-options.js';
export declare const networks: {
    readonly testnet: {
        readonly networkPassphrase: "Test SDF Network ; September 2015";
        readonly contractId: "CAATXU6OCY3BHIIY44NN73LM3PRAQSEU2ASNZ43XNAFECAENPVSRJEBJ";
    };
};
/**
    
    */
export interface Stream {
    /**
      
      */
    deposit: i128;
    /**
      
      */
    id: u32;
    /**
      
      */
    is_cancelled: boolean;
    /**
      
      */
    recipient: string;
    /**
      
      */
    sender: string;
    /**
      
      */
    start_time: u64;
    /**
      
      */
    stop_time: u64;
    /**
      
      */
    token_address: string;
    /**
      
      */
    token_decimals: u32;
    /**
      
      */
    token_symbol: string;
    /**
      
      */
    withdrawn: i128;
}
/**
    
    */
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
/**
    
    */
export declare const Errors: {};
export declare class Contract {
    readonly options: ClassOptions;
    spec: ContractSpec;
    constructor(options: ClassOptions);
    private readonly parsers;
    private txFromJSON;
    readonly fromJSON: {
        initialize: (json: string) => AssembledTransaction<void>;
        getStream: (json: string) => AssembledTransaction<Stream>;
        getStreamsByUser: (json: string) => AssembledTransaction<Stream[]>;
        streamedAmount: (json: string) => AssembledTransaction<bigint>;
        createStream: (json: string) => AssembledTransaction<number>;
        withdrawFromStream: (json: string) => AssembledTransaction<void>;
        cancelStream: (json: string) => AssembledTransaction<void>;
    };
    /**
* Construct and simulate a initialize transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    initialize: ({ token }: {
        token: string;
    }, options?: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number;
    }) => Promise<AssembledTransaction<void>>;
    /**
* Construct and simulate a get_stream transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    getStream: ({ stream_id }: {
        stream_id: u32;
    }, options?: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number;
    }) => Promise<AssembledTransaction<Stream>>;
    /**
* Construct and simulate a get_streams_by_user transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    getStreamsByUser: ({ caller }: {
        caller: string;
    }, options?: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number;
    }) => Promise<AssembledTransaction<Stream[]>>;
    /**
* Construct and simulate a streamed_amount transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.Returns the amount of tokens that have already been released to the recipient.
* Panics if the id does not point to a valid stream.
* @param stream_id The id of the stream
* @param who The address of the caller
* @return The amount of tokens that have already been released
*/
    streamedAmount: ({ stream_id }: {
        stream_id: u32;
    }, options?: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number;
    }) => Promise<AssembledTransaction<bigint>>;
    /**
* Construct and simulate a create_stream transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    createStream: ({ sender, recipient, amount, token_address, start_time, stop_time }: {
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
        fee?: number;
    }) => Promise<AssembledTransaction<number>>;
    /**
* Construct and simulate a withdraw_from_stream transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    withdrawFromStream: ({ caller, recipient, stream_id, amount }: {
        caller: string;
        recipient: string;
        stream_id: u32;
        amount: i128;
    }, options?: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number;
    }) => Promise<AssembledTransaction<void>>;
    /**
* Construct and simulate a cancel_stream transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.Cancels the stream and transfers the tokens back on a pro rata basis.
* Throws if the id does not point to a valid stream.
* Throws if the caller is not the sender or the recipient of the stream.
* Throws if there is a token transfer failure.
* @param stream_id The id of the stream to cancel.
* @return bool true=success, otherwise false.
*/
    cancelStream: ({ caller, stream_id }: {
        caller: string;
        stream_id: u32;
    }, options?: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number;
    }) => Promise<AssembledTransaction<void>>;
}
