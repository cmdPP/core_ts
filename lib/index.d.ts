import { StorageContainer } from './storage';
export interface ICMDSaveObject {
    data: number;
    money: number;
    increment: number;
    autoIncrement: number;
    storage: string;
    unlocked: string[];
}
export interface ICMD {
    data: number;
    money: number;
    increment: number;
    autoIncrement: number;
    isAutoMining: boolean;
    counter: number;
    storage: StorageContainer;
    playerAliases: {
        [name: string]: string;
    };
    cmdAliases: {
        [name: string]: string;
    };
    commands: {
        [name: string]: ICommand;
    };
    version: string;
    debug: boolean;
    gameLoopInterval: number;
    gameLoop(): void;
    respond(...txt: string[]): void;
    checkStorage(increment?: number): boolean;
    command(str: string): void;
    update(): void;
    save(): void;
    load(): void;
    addData(amt: number): boolean;
    removeData(amt: number): boolean;
    addMoney(amt: number): void;
    removeMoney(amt: number): boolean;
    formatToString(size: number): string;
    formatToNumber(size: string): number;
    reset(): void;
}
export declare class _CMD implements ICMD {
    data: number;
    money: number;
    increment: number;
    autoIncrement: number;
    isAutoMining: boolean;
    counter: number;
    storage: StorageContainer;
    playerAliases: {
        [name: string]: string;
    };
    cmdAliases: {
        [name: string]: string;
    };
    commands: {
        [name: string]: Command;
    };
    version: string;
    debug: boolean;
    gameLoopInterval: number;
    respondFunc: (...txt: any[]) => void;
    saveFunc: (cmdData: ICMDSaveObject) => void | Error;
    loadFunc: () => ICMDSaveObject;
    updateFunc: (cmdObj: ICMD) => void;
    errorHandlerFunc: (err: Error) => void;
    gameLoop(): void;
    respond(...txt: any[]): void;
    save(): void;
    load(): void;
    update(): void;
    checkStorage(increment?: number): boolean;
    command(str: string): void;
    runCommand(cmd: string): void;
    addData(amt: number): boolean;
    removeData(amt: number): boolean;
    addMoney(amt: number): void;
    removeMoney(amt: number): boolean;
    formatToString(size?: number): string;
    formatToNumber(amt: string, unit?: string): number;
    reset(): void;
}
export declare class CMD extends _CMD {
    private static commands;
    static instance: CMD;
    constructor(respondFunc: (...txt: any[]) => void, saveFunc: (cmdData: ICMDSaveObject) => void | Error, loadFunc: () => ICMDSaveObject, updateFunc: (cmdObj: ICMD) => void, customCommandNames?: string[], errorHandlerFunc?: (err: Error) => void, debug?: boolean);
    update(): void;
    static addCommand(name: string, cls: any): void;
    static addCommands(cmds: {
        [name: string]: any;
    }): void;
}
export interface ICommand {
    price: number;
    unlocked: boolean;
    aliases?: string[];
    func(...args: any[]): void;
    desc(): string | string[];
    usage(): string | string[];
}
export declare abstract class Command extends _CMD implements ICommand {
    price: number;
    unlocked: boolean;
    aliases: string[];
    abstract func(...args: any[]): void;
    abstract desc(): string | string[];
    abstract usage(): string | string[];
}
export declare class CommandClass {
    name: string;
    constructor(name: string);
    cls(): Function;
    func(): Function;
    desc(): Function;
    usage(): Function;
}
import './commands';
