import { StorageContainer } from './storage';
import { version } from './ver';

export interface ICMDSaveObject {
	data: number;
	money: number;
	increment: number;
	autoIncrement: number;
	storage: string;
	unlocked: string[];
}

export interface ICMD {

	/* Game Properties */

	data: number;
	money: number;
	increment: number;
	autoIncrement: number;
	isAutoMining: boolean;
	counter: number;
	storage: StorageContainer;
	playerAliases: { [name: string]: string };
	cmdAliases: { [name: string]: string };

	commands: { [name: string]: ICommand };
	version: string;
	debug: boolean;
	gameLoopInterval: number;

	gameLoop(): void;

	respond(...txt: string[]): void;
	checkStorage(increment?: number): boolean;
	command(str: string): void;
	// runCommand(cmd: string): void;
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

export class _CMD implements ICMD {
// class _CMD {
	data: number = 0;
	money: number = 0;
	increment: number = 1;
	autoIncrement: number = 1;
	isAutoMining: boolean = false;
	counter: number = 0;
	storage: StorageContainer = StorageContainer.getInstance();
	playerAliases: { [name: string]: string } = {};
	cmdAliases: { [name: string]: string } = {};

	commands: { [name: string]: Command } = {};
	version: string = version;
	debug: boolean;
	gameLoopInterval: number = undefined;

	respondFunc: (...txt: any[]) => void;
	saveFunc: (cmdData: ICMDSaveObject) => void|Error;
	loadFunc: () => ICMDSaveObject;
	updateFunc: (cmdObj: ICMD) => void;
	errorHandlerFunc: (err: Error) => void = (err: Error) => { console.error(err); };

	gameLoop() {
		if (this.gameLoopInterval) throw new Error("Game loop has already been started.");
		this.gameLoopInterval = setInterval(() => {
			this.counter++;
			if (this.counter % 10 === 0) this.save();
			if (this.isAutoMining) {
				if (this.checkStorage(this.autoIncrement)) {
					this.addData(this.autoIncrement);
				} else {
					this.respond("Please upgrade your storage with upgradeStorage.");
					this.respond("Forcing autoMine to stop...");
					this.isAutoMining = false;
				}
				this.update();
			}
		}, 1000);
	}

	respond(...txt: any[]): void { this.respondFunc(...txt); }
	save(): void {
		let saveObj = {
			data: this.data,
			money: this.money,
			increment: this.increment,
			autoIncrement: this.autoIncrement,
			storage: this.storage.name,
			unlocked: []
		};
		for (let cmdName in this.commands) {
			let cmd = this.commands[cmdName];
			if ('price' in cmd && cmd.price !== 0 && cmd.unlocked) {
				saveObj.unlocked.push(cmdName);
			}
		}
		this.saveFunc(saveObj);
	}
	load(): void {
		let loadData: ICMDSaveObject = this.loadFunc();
		let previousSave: boolean = true;
		if (!loadData) {
			previousSave = false;
		}
		for (let k in loadData) {
			if (loadData[k] === null) {
				previousSave = false;
				break;
			}
		}
		if (previousSave) {
			if (this.debug) {
				console.log('Loaded data:', loadData);
			}
			this.data = loadData.data;
			this.money = loadData.money;
			this.increment = loadData.increment;
			this.storage.current = loadData.storage;
			for (let cmdName in this.commands) {
				let cmd = this.commands[cmdName];
				if (loadData.unlocked.indexOf(cmdName) === -1 && 'price' in cmd && cmd.price !== 0) {
					this.commands[cmdName].unlocked = false;
				} else {
					this.commands[cmdName].unlocked = true;
				}
			}
			this.respond('Save loaded.');
		} else {
			this.respond('No save found.');
		}
		this.update();
	}
	update(): void {
		// this.updateFunc(this);
	}

	checkStorage(increment: number = this.increment): boolean {
		let check = this.storage.checkStorage(this.data, increment);
		if (this.debug) {
			console.log('Current data:', this.data);
			console.log('Increment:', increment);
			console.log('Check storage:', check);
		}
		return check;
	}

	command(str: string): void {
		this.runCommand(str);
	}

	runCommand(cmd: string): void {
		if (this.debug) {
			console.log('Command:', cmd);
		}
		if (cmd.indexOf(' ') !== 1 && cmd[cmd.indexOf(' ')+1] === undefined) {
			this.respond('Command not found.');
			if (this.debug) {
				console.log('Command not found.');
			}
		} else {
			let cmdWArgs: string[] = cmd.split(' ');
			if (cmdWArgs[0] in this.cmdAliases) {
				cmdWArgs[0] = this.cmdAliases[cmdWArgs[0]];
			}
			if (!(cmdWArgs[0] in this.commands)) {
				this.respond('Command not found.');
			} else {
				if (this.commands[cmdWArgs[0]].unlocked) {
					// this.commands[cmdWArgs[0]].func(...cmdWArgs.slice(1));
					this.commands[cmdWArgs[0]].func.apply(CMD.instance, cmdWArgs.slice(1));
				}
			}
		}
	}

	addData(amt: number): boolean {
		let hasRoom: boolean = false;
		if (this.checkStorage(amt)) {
			this.data += amt;
			hasRoom = true;
		}
		this.update();
		return hasRoom;
	}

	removeData(amt: number): boolean {
		let hasEnough: boolean = false;
		if (this.data >= amt) {
			this.data -= amt;
			hasEnough = true;
		}
		this.update();
		return hasEnough;
	}

	addMoney(amt: number): void {
		this.money += amt;
		this.update();
	}

	removeMoney(amt: number): boolean {
		let hasEnough: boolean = false;
		if (this.money >= amt) {
			this.money -= amt;
			hasEnough = true;
		}
		this.update();
		return hasEnough;
	}

	/* Implemented based on a post on http://scratch99.com. */
	/* See: {http://scratch99.com/web-development/javascript/convert-bytes-to-mb-kb/} */
	formatToString(size: number = this.data): string {
		// TODO: Implement file sizing.
		// return 'not yet implemented.';
		let sizes = [
			'B',
			'KB',
			'MB',
			'GB',
			'TB',
			'PB',
			'EB',
			'ZB',
			'YB'
		];
		if (size === 0) return '0 B';
		let i: number = Math.floor(Math.log(size) / Math.log(1024));
		if (i === 0) return `${size} ${sizes[i]}`;
		return (size / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i];
	}

	formatToNumber(amt: string, unit: string = "B"): number {
		if (!amt) return null;
		let newNum: number = parseInt(amt);
		let sizes = [
			'B',
			'KB',
			'MB',
			'GB',
			'TB',
			'PB',
			'EB',
			'ZB',
			'YB'
		];
		let unitI: number = sizes.indexOf(unit);
		if (unitI === -1) return null;
		return newNum * Math.pow(1024, unitI);
	}

	reset(): void {
		this.saveFunc({
			data: 0,
			money: 0,
			increment: 1,
			autoIncrement: 1,
			storage: "selectronTube",
			unlocked: []
		});
		this.load();
	}
}



export class CMD extends _CMD {

	// private static customCommands: { [name: string]: Command };
	// private static commands: { [name: string]: Type };
	private static commands: { [name: string]: any } = {};
	static instance: CMD;

	constructor(
		respondFunc: (...txt: any[]) => void,
		saveFunc: (cmdData: ICMDSaveObject) => void|Error,
		loadFunc: () => ICMDSaveObject,
		updateFunc: (cmdObj: ICMD) => void,
		customCommandNames: string[] = [],
		errorHandlerFunc?: (err: Error) => void,
		debug?: boolean
	) {
		super();
		this.respondFunc = respondFunc;
		this.saveFunc = saveFunc;
		this.loadFunc = loadFunc;
		this.updateFunc = updateFunc;
		this.errorHandlerFunc = errorHandlerFunc;
		this.debug = debug || false;
		// for (let customName in CMD.customCommands) {
		// 	this.commands[customName] = CMD.customCommands[customName];
		// }
		for (let commandName in CMD.commands) {
			// this.commands[customName] = CMD.commands[customName];
			let newCommand: any = new CMD.commands[commandName];
			newCommand.unlocked = newCommand.price === 0;
			this.commands[commandName] = newCommand;
		}
		CMD.instance = this;
	}

	update(): void {
		super.update();
		CMD.instance = this;
	}

	static addCommand(name: string, cls: any) {
		// this.commands[name] = new cls();
		this.commands[name] = cls;
	}

	static addCommands(cmds: { [name: string]: any }) {
		for (let name in cmds) {
			this.addCommand(name, cmds[name]);
		}
	}
}

export interface ICommand {
	price: number;
	unlocked: boolean;
	aliases?: string[];
	func(...args: any[]): void;
	desc(): string|string[];
	usage(): string|string[];
}

export abstract class Command extends _CMD implements ICommand {
// export abstract class Command extends _CMD {
	price: number = 0;
	unlocked: boolean;
	aliases: string[] = [];

	// constructor() {
	// 	super();
	// 	this.unlocked = this.price === 0;
	// }

	abstract func(...args: any[]): void;
	abstract desc(): string|string[];
	abstract usage(): string|string[];
	
	// get usage(): string {
	// 	throw new Error("Usage must be overridden by a command (for now).");
	// }
	
	// abstract desc(): string|string[];
	// usage(): string {
	// 	return 'not yet implemented.';
	// }
	// abstract usage(): string|string[];
}

export class CommandClass {
	name: string;
	constructor(name: string) {
		this.name = name;
	}

	cls(): Function {
		return (target: any) => {
			let original = target;
			function construct(constructor, args) {
				let c: any = function() {
					// return constructor.apply(, args);
					
				}
			}


			CMD.addCommand(this.name, target);
			return target;
		}
	}

	func(): Function {
		return function(target: any, key: string, desc: PropertyDescriptor) {
			let original = desc.value;
			desc.value = function(...args: any[]) {
				return original.apply(CMD.instance, args);
			};
			return desc;
		};
	}

	desc(): Function {
		return function(target: any, key: string, desc: PropertyDescriptor) {
			let original = desc.value;
			desc.value = function() {
				return original.apply(CMD.instance, []);
			};
			return desc;
		};
	}

	usage(): Function {
		return function(target: any, key: string, desc: PropertyDescriptor) {
			let original = desc.value;
			desc.value = function() {
				return original.apply(CMD.instance, []);
			};
			return desc;
		};
	}
}

import './commands';