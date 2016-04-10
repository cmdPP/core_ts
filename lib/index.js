"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var storage_1 = require('./storage');
var ver_1 = require('./ver');
var _CMD = (function () {
    function _CMD() {
        this.data = 0;
        this.money = 0;
        this.increment = 1;
        this.autoIncrement = 1;
        this.isAutoMining = false;
        this.counter = 0;
        this.storage = storage_1.StorageContainer.getInstance();
        this.playerAliases = {};
        this.cmdAliases = {};
        this.commands = {};
        this.version = ver_1.version;
        this.gameLoopInterval = undefined;
        this.errorHandlerFunc = function (err) { console.error(err); };
    }
    _CMD.prototype.gameLoop = function () {
        var _this = this;
        if (this.gameLoopInterval)
            throw new Error("Game loop has already been started.");
        this.gameLoopInterval = setInterval(function () {
            _this.counter++;
            if (_this.counter % 10 === 0)
                _this.save();
            if (_this.isAutoMining) {
                if (_this.checkStorage(_this.autoIncrement)) {
                    _this.addData(_this.autoIncrement);
                }
                else {
                    _this.respond("Please upgrade your storage with upgradeStorage.");
                    _this.respond("Forcing autoMine to stop...");
                    _this.isAutoMining = false;
                }
                _this.update();
            }
        }, 1000);
    };
    _CMD.prototype.respond = function () {
        var txt = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            txt[_i - 0] = arguments[_i];
        }
        this.respondFunc.apply(this, txt);
    };
    _CMD.prototype.save = function () {
        var saveObj = {
            data: this.data,
            money: this.money,
            increment: this.increment,
            autoIncrement: this.autoIncrement,
            storage: this.storage.name,
            unlocked: []
        };
        for (var cmdName in this.commands) {
            var cmd = this.commands[cmdName];
            if ('price' in cmd && cmd.price !== 0 && cmd.unlocked) {
                saveObj.unlocked.push(cmdName);
            }
        }
        this.saveFunc(saveObj);
    };
    _CMD.prototype.load = function () {
        var loadData = this.loadFunc();
        var previousSave = true;
        if (!loadData) {
            previousSave = false;
        }
        for (var k in loadData) {
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
            for (var cmdName in this.commands) {
                var cmd = this.commands[cmdName];
                if (loadData.unlocked.indexOf(cmdName) === -1 && 'price' in cmd && cmd.price !== 0) {
                    this.commands[cmdName].unlocked = false;
                }
                else {
                    this.commands[cmdName].unlocked = true;
                }
            }
            this.respond('Save loaded.');
        }
        else {
            this.respond('No save found.');
        }
        this.update();
    };
    _CMD.prototype.update = function () {
    };
    _CMD.prototype.checkStorage = function (increment) {
        if (increment === void 0) { increment = this.increment; }
        var check = this.storage.checkStorage(this.data, increment);
        if (this.debug) {
            console.log('Current data:', this.data);
            console.log('Increment:', increment);
            console.log('Check storage:', check);
        }
        return check;
    };
    _CMD.prototype.command = function (str) {
        this.runCommand(str);
    };
    _CMD.prototype.runCommand = function (cmd) {
        if (this.debug) {
            console.log('Command:', cmd);
        }
        if (cmd.indexOf(' ') !== 1 && cmd[cmd.indexOf(' ') + 1] === undefined) {
            this.respond('Command not found.');
            if (this.debug) {
                console.log('Command not found.');
            }
        }
        else {
            var cmdWArgs = cmd.split(' ');
            if (cmdWArgs[0] in this.cmdAliases) {
                cmdWArgs[0] = this.cmdAliases[cmdWArgs[0]];
            }
            if (!(cmdWArgs[0] in this.commands)) {
                this.respond('Command not found.');
            }
            else {
                if (this.commands[cmdWArgs[0]].unlocked) {
                    this.commands[cmdWArgs[0]].func.apply(CMD.instance, cmdWArgs.slice(1));
                }
            }
        }
    };
    _CMD.prototype.addData = function (amt) {
        var hasRoom = false;
        if (this.checkStorage(amt)) {
            this.data += amt;
            hasRoom = true;
        }
        this.update();
        return hasRoom;
    };
    _CMD.prototype.removeData = function (amt) {
        var hasEnough = false;
        if (this.data >= amt) {
            this.data -= amt;
            hasEnough = true;
        }
        this.update();
        return hasEnough;
    };
    _CMD.prototype.addMoney = function (amt) {
        this.money += amt;
        this.update();
    };
    _CMD.prototype.removeMoney = function (amt) {
        var hasEnough = false;
        if (this.money >= amt) {
            this.money -= amt;
            hasEnough = true;
        }
        this.update();
        return hasEnough;
    };
    _CMD.prototype.formatToString = function (size) {
        if (size === void 0) { size = this.data; }
        var sizes = [
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
        if (size === 0)
            return '0 B';
        var i = Math.floor(Math.log(size) / Math.log(1024));
        if (i === 0)
            return size + " " + sizes[i];
        return (size / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i];
    };
    _CMD.prototype.formatToNumber = function (amt, unit) {
        if (unit === void 0) { unit = "B"; }
        if (!amt)
            return null;
        var newNum = parseInt(amt);
        var sizes = [
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
        var unitI = sizes.indexOf(unit);
        if (unitI === -1)
            return null;
        return newNum * Math.pow(1024, unitI);
    };
    _CMD.prototype.reset = function () {
        this.saveFunc({
            data: 0,
            money: 0,
            increment: 1,
            autoIncrement: 1,
            storage: "selectronTube",
            unlocked: []
        });
        this.load();
    };
    return _CMD;
}());
exports._CMD = _CMD;
var CMD = (function (_super) {
    __extends(CMD, _super);
    function CMD(respondFunc, saveFunc, loadFunc, updateFunc, customCommandNames, errorHandlerFunc, debug) {
        if (customCommandNames === void 0) { customCommandNames = []; }
        _super.call(this);
        this.respondFunc = respondFunc;
        this.saveFunc = saveFunc;
        this.loadFunc = loadFunc;
        this.updateFunc = updateFunc;
        this.errorHandlerFunc = errorHandlerFunc;
        this.debug = debug || false;
        for (var commandName in CMD.commands) {
            var newCommand = new CMD.commands[commandName];
            newCommand.unlocked = newCommand.price === 0;
            this.commands[commandName] = newCommand;
        }
        CMD.instance = this;
    }
    CMD.prototype.update = function () {
        _super.prototype.update.call(this);
        CMD.instance = this;
    };
    CMD.addCommand = function (name, cls) {
        this.commands[name] = cls;
    };
    CMD.addCommands = function (cmds) {
        for (var name_1 in cmds) {
            this.addCommand(name_1, cmds[name_1]);
        }
    };
    CMD.commands = {};
    return CMD;
}(_CMD));
exports.CMD = CMD;
var Command = (function (_super) {
    __extends(Command, _super);
    function Command() {
        _super.apply(this, arguments);
        this.price = 0;
        this.aliases = [];
    }
    return Command;
}(_CMD));
exports.Command = Command;
var CommandClass = (function () {
    function CommandClass(name) {
        this.name = name;
    }
    CommandClass.prototype.cls = function () {
        var _this = this;
        return function (target) {
            var original = target;
            function construct(constructor, args) {
                var c = function () {
                };
            }
            CMD.addCommand(_this.name, target);
            return target;
        };
    };
    CommandClass.prototype.func = function () {
        return function (target, key, desc) {
            var original = desc.value;
            desc.value = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                return original.apply(CMD.instance, args);
            };
            return desc;
        };
    };
    CommandClass.prototype.desc = function () {
        return function (target, key, desc) {
            var original = desc.value;
            desc.value = function () {
                return original.apply(CMD.instance, []);
            };
            return desc;
        };
    };
    CommandClass.prototype.usage = function () {
        return function (target, key, desc) {
            var original = desc.value;
            desc.value = function () {
                return original.apply(CMD.instance, []);
            };
            return desc;
        };
    };
    return CommandClass;
}());
exports.CommandClass = CommandClass;
require('./commands');
