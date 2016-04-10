export interface IStorage {
	name: string;
	idx: number;
	capacity: number;
	price: number;
	prev?: string;
}

// interface IStorageContainer {
// 	name: string;
// 	capacity: number;
// 	price: number;
// 	idx: number;
// 	current: IStorage|string;
// 	upgrade: IStorage;

// 	otherNames: string[];
// 	others: { [name: string]: IStorage };
// 	allNames: string[];
// 	all: { [name: string]: IStorage };

// 	checkStorage(data: number, increment: number): boolean;
// }

export class Storage implements IStorage {
// export class Storage {
	name: string;
	idx: number;
	capacity: number;
	price: number;
	prev: string = undefined;

	constructor(name: string, idx: number, prev: string) {
		this.name = name;
		this.idx = idx;
		this.capacity = Math.pow(1024, idx + 1);
		this.price = Math.pow(1024, idx) - 1;
		this.prev = prev;
	}
}

let storageNames = [
	'selectronTube',
  'floppyDisk',
  'zipDrive',
  'DVD',
  'sdCard',
  'flashDrive',
  'SSD',
  'ssdArray',
  'serverRack',
  'serverRoom',
  'dataCenter',
  'multipleCenters',
  'smallAfricanCountry',
  'multipleCountries',
  'alienSpaceArray',
  'enslavedHumans'
];

// export class StorageContainer implements IStorageContainer {
export class StorageContainer {
	private _storages: { [name: string]: Storage } = {};
	// private _storageArr: Storage[];
	private _storageArr: Array<Storage>;
	private _storageNames: string[];
	private _current: Storage;

	private static _instance: StorageContainer = new StorageContainer(storageNames);

	constructor(storages: string[]) {
		if (StorageContainer._instance) {
			throw new Error("Error: Instantiation failed: Use StorageContainer.getInstance() instead.");
		}
		let _storages: { [name: string]: Storage } = {};
		let _storageArr: Storage[] = [];
		for (let i = 0; i < storages.length; i++) {
			let name = storages[i];
			let prev = null;
			if (i > 0) {
				prev = storages[i - 1];
			}
			let storage = new Storage(name, i, prev);
			_storageArr.push(storage);
			_storages[name] = storage;
		}
		this._storages = _storages;
		this._storageNames = storages;
		_storageArr.sort((a, b) => a.idx - b.idx);
		this._storageArr = _storageArr;
		this._current = _storageArr[0];

		StorageContainer._instance = this;
	}

	static getInstance(): StorageContainer {
		return this._instance;
	}

	get name(): string { return this._current.name; }
	get capacity(): number { return this._current.capacity; }
	get price(): number { return this._current.price; }
	get idx(): number { return this._current.idx; }

	get current(): IStorage|string { return this._current; }
	set current(v: IStorage|string) {
		if (typeof v === "string") {
			this._current = this._storages[v];
		} else if (typeof v === "object" && 'name' in v && v.name in this._storages) {
			this._current = this._storages[v.name];
		} else {
			throw new Error("Invalid Storage.");
		}
	}

	get upgrade(): Storage {
		return this._storageArr.filter((e) => e.prev === this._current.name)[0];
	}

	get otherNames(): string[] {
		return this._storageNames.filter((e) => e !== this._current.name);
	}

	get others(): { [name: string]: Storage } {
		let initial: { [name: string]: Storage } = {};
		return this.otherNames.reduce((o, v) => {
			o[v] = this._storages[v];
			return o;
		}, initial);
	}

	get allNames(): string[] { return this._storageNames; }
	get all(): { [name: string]: Storage } { return this._storages; }

	checkStorage(data: number, increment: number): boolean { return ((data + increment) <= this._current.capacity); }
}