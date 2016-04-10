"use strict";
var Storage = (function () {
    function Storage(name, idx, prev) {
        this.prev = undefined;
        this.name = name;
        this.idx = idx;
        this.capacity = Math.pow(1024, idx + 1);
        this.price = Math.pow(1024, idx) - 1;
        this.prev = prev;
    }
    return Storage;
}());
exports.Storage = Storage;
var storageNames = [
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
var StorageContainer = (function () {
    function StorageContainer(storages) {
        this._storages = {};
        if (StorageContainer._instance) {
            throw new Error("Error: Instantiation failed: Use StorageContainer.getInstance() instead.");
        }
        var _storages = {};
        var _storageArr = [];
        for (var i = 0; i < storages.length; i++) {
            var name_1 = storages[i];
            var prev = null;
            if (i > 0) {
                prev = storages[i - 1];
            }
            var storage = new Storage(name_1, i, prev);
            _storageArr.push(storage);
            _storages[name_1] = storage;
        }
        this._storages = _storages;
        this._storageNames = storages;
        _storageArr.sort(function (a, b) { return a.idx - b.idx; });
        this._storageArr = _storageArr;
        this._current = _storageArr[0];
        StorageContainer._instance = this;
    }
    StorageContainer.getInstance = function () {
        return this._instance;
    };
    Object.defineProperty(StorageContainer.prototype, "name", {
        get: function () { return this._current.name; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StorageContainer.prototype, "capacity", {
        get: function () { return this._current.capacity; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StorageContainer.prototype, "price", {
        get: function () { return this._current.price; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StorageContainer.prototype, "idx", {
        get: function () { return this._current.idx; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StorageContainer.prototype, "current", {
        get: function () { return this._current; },
        set: function (v) {
            if (typeof v === "string") {
                this._current = this._storages[v];
            }
            else if (typeof v === "object" && 'name' in v && v.name in this._storages) {
                this._current = this._storages[v.name];
            }
            else {
                throw new Error("Invalid Storage.");
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StorageContainer.prototype, "upgrade", {
        get: function () {
            var _this = this;
            return this._storageArr.filter(function (e) { return e.prev === _this._current.name; })[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StorageContainer.prototype, "otherNames", {
        get: function () {
            var _this = this;
            return this._storageNames.filter(function (e) { return e !== _this._current.name; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StorageContainer.prototype, "others", {
        get: function () {
            var _this = this;
            var initial = {};
            return this.otherNames.reduce(function (o, v) {
                o[v] = _this._storages[v];
                return o;
            }, initial);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StorageContainer.prototype, "allNames", {
        get: function () { return this._storageNames; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StorageContainer.prototype, "all", {
        get: function () { return this._storages; },
        enumerable: true,
        configurable: true
    });
    StorageContainer.prototype.checkStorage = function (data, increment) { return ((data + increment) <= this._current.capacity); };
    StorageContainer._instance = new StorageContainer(storageNames);
    return StorageContainer;
}());
exports.StorageContainer = StorageContainer;
