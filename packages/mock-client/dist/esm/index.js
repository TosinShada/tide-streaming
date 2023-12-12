import { ContractSpec, Address } from 'soroban-client';
import { Buffer } from "buffer";
import { invoke } from './invoke.js';
export * from './invoke.js';
export * from './method-options.js';
export { Address };
;
;
export class Ok {
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
export class Err {
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
if (typeof window !== 'undefined') {
    //@ts-ignore Buffer exists
    window.Buffer = window.Buffer || Buffer;
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
export const networks = {
    futurenet: {
        networkPassphrase: "Test SDF Future Network ; October 2022",
        contractId: "CCAZKAF6JE4FHTG2B7DMRK5SBOIXFQXWQGJ7HTMRR6MRG5CBL4C2MIWV",
    }
};
const Errors = {};
export class Contract {
    options;
    spec;
    constructor(options) {
        this.options = options;
        this.spec = new ContractSpec([
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
        return await invoke({
            method: 'initialize',
            args: this.spec.funcArgsToScVals("initialize", { admin: new Address(admin), decimal, name, symbol }),
            ...options,
            ...this.options,
            parseResultXdr: () => { },
        });
    };
    mint = async ({ to, amount }, options = {}) => {
        return await invoke({
            method: 'mint',
            args: this.spec.funcArgsToScVals("mint", { to: new Address(to), amount }),
            ...options,
            ...this.options,
            parseResultXdr: () => { },
        });
    };
    setAdmin = async ({ new_admin }, options = {}) => {
        return await invoke({
            method: 'set_admin',
            args: this.spec.funcArgsToScVals("set_admin", { new_admin: new Address(new_admin) }),
            ...options,
            ...this.options,
            parseResultXdr: () => { },
        });
    };
    allowance = async ({ from, spender }, options = {}) => {
        return await invoke({
            method: 'allowance',
            args: this.spec.funcArgsToScVals("allowance", { from: new Address(from), spender: new Address(spender) }),
            ...options,
            ...this.options,
            parseResultXdr: (xdr) => {
                return this.spec.funcResToNative("allowance", xdr);
            },
        });
    };
    approve = async ({ from, spender, amount, expiration_ledger }, options = {}) => {
        return await invoke({
            method: 'approve',
            args: this.spec.funcArgsToScVals("approve", { from: new Address(from), spender: new Address(spender), amount, expiration_ledger }),
            ...options,
            ...this.options,
            parseResultXdr: () => { },
        });
    };
    balance = async ({ id }, options = {}) => {
        return await invoke({
            method: 'balance',
            args: this.spec.funcArgsToScVals("balance", { id: new Address(id) }),
            ...options,
            ...this.options,
            parseResultXdr: (xdr) => {
                return this.spec.funcResToNative("balance", xdr);
            },
        });
    };
    transfer = async ({ from, to, amount }, options = {}) => {
        return await invoke({
            method: 'transfer',
            args: this.spec.funcArgsToScVals("transfer", { from: new Address(from), to: new Address(to), amount }),
            ...options,
            ...this.options,
            parseResultXdr: () => { },
        });
    };
    transferFrom = async ({ spender, from, to, amount }, options = {}) => {
        return await invoke({
            method: 'transfer_from',
            args: this.spec.funcArgsToScVals("transfer_from", { spender: new Address(spender), from: new Address(from), to: new Address(to), amount }),
            ...options,
            ...this.options,
            parseResultXdr: () => { },
        });
    };
    burn = async ({ from, amount }, options = {}) => {
        return await invoke({
            method: 'burn',
            args: this.spec.funcArgsToScVals("burn", { from: new Address(from), amount }),
            ...options,
            ...this.options,
            parseResultXdr: () => { },
        });
    };
    burnFrom = async ({ spender, from, amount }, options = {}) => {
        return await invoke({
            method: 'burn_from',
            args: this.spec.funcArgsToScVals("burn_from", { spender: new Address(spender), from: new Address(from), amount }),
            ...options,
            ...this.options,
            parseResultXdr: () => { },
        });
    };
    decimals = async (options = {}) => {
        return await invoke({
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
        return await invoke({
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
        return await invoke({
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
