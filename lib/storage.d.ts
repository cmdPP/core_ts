export interface IStorage {
    name: string;
    idx: number;
    capacity: number;
    price: number;
    prev?: string;
}
export declare class Storage implements IStorage {
    name: string;
    idx: number;
    capacity: number;
    price: number;
    prev: string;
    constructor(name: string, idx: number, prev: string);
}
export declare class StorageContainer {
    private _storages;
    private _storageArr;
    private _storageNames;
    private _current;
    private static _instance;
    constructor(storages: string[]);
    static getInstance(): StorageContainer;
    name: string;
    capacity: number;
    price: number;
    idx: number;
    current: IStorage | string;
    upgrade: Storage;
    otherNames: string[];
    others: {
        [name: string]: Storage;
    };
    allNames: string[];
    all: {
        [name: string]: Storage;
    };
    checkStorage(data: number, increment: number): boolean;
}
