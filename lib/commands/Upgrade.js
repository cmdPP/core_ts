"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var index_1 = require('../index');
var decorator_1 = require('../decorator');
var command = new decorator_1.CommandClass("upgrade");
var Upgrade = (function (_super) {
    __extends(Upgrade, _super);
    function Upgrade() {
        _super.apply(this, arguments);
    }
    Upgrade.prototype.func = function (command) {
        var response = [];
        if (command === "mineData") {
            var currentCost = Math.floor((this.increment + 1) * 1.5);
            if (this.removeMoney(currentCost)) {
                this.increment++;
                response = [("mineData upgraded to increment {" + this.formatToString(this.increment) + "} for {$" + currentCost + "}")];
            }
            else {
                response = [("You require $" + currentCost + " to purchase this upgrade.")];
            }
        }
        else if (command === "storage") {
            var target = this.storage.upgrade;
            if (!target) {
                this.respond("You already have the largest stoarge capacity.");
                return;
            }
            if (this.removeMoney(target.price)) {
                this.storage.current = target;
                response = [
                    ("Storage upgraded to {" + target.name + "} for {$" + target.price + "}"),
                    ("New capacity: {" + this.formatToString(target.capacity) + "}")
                ];
            }
            else {
                response = [("You require $" + target.price + " to purchase this upgrade.")];
            }
        }
        else {
            response = [("Command \"" + command + "\" either does not exist or cannot be upgraded.")];
        }
        this.respond.apply(this, response);
    };
    Upgrade.prototype.desc = function () {
        var response = [];
        var incVal = this.increment + 1;
        var incCost = Math.floor(incVal * 1.5);
        response.push.apply(response, [
            "mineData",
            ("\tCurrent value: {" + this.increment + "}"),
            "\tNext upgrade:",
            ("\t\tValue: {" + incVal + "}"),
            ("\t\tPrice: {$" + incCost + "}")
        ]);
        var target = this.storage.upgrade;
        if (target) {
            response.push.apply(response, [
                "storage:",
                ("\tCurrent name: {" + this.storage.name + "}"),
                ("\tCurrent capacity: {" + this.formatToString(this.storage.capacity) + "}"),
                "\tNext upgrade:",
                ("\t\tName: {" + target.name + "}"),
                ("\t\tCapacity: {" + this.formatToString(target.capacity) + "}"),
                ("\t\tPrice: {$" + target.price + "}")
            ]);
        }
        var newRes = [];
        for (var _i = 0, response_1 = response; _i < response_1.length; _i++) {
            var res = response_1[_i];
            newRes.push("\t" + res);
        }
        return [
            "Purchases command upgrades.",
            "Available upgrades:"
        ].concat(newRes);
    };
    Upgrade.prototype.usage = function () { return "upgrade {thing}"; };
    Upgrade = __decorate([
        command.cls(), 
        __metadata('design:paramtypes', [])
    ], Upgrade);
    return Upgrade;
}(index_1.Command));
exports.Upgrade = Upgrade;
