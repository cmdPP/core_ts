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
var command = new decorator_1.CommandClass("buyData");
var BuyData = (function (_super) {
    __extends(BuyData, _super);
    function BuyData() {
        _super.apply(this, arguments);
        this.price = 150;
    }
    BuyData.prototype.func = function (amt, unit) {
        if (unit === void 0) { unit = "B"; }
        var numAmt = this.formatToNumber(amt, unit);
        if (!numAmt) {
            this.respond("Error.");
            this.command("help buyData");
            return;
        }
        var response = [];
        var cost = numAmt * 2;
        if (this.money >= cost && this.checkStorage(numAmt)) {
            this.removeMoney(cost);
            this.addData(numAmt);
            response = [(amt + " data bought with $" + cost)];
        }
        else {
            response = ["You do not have enough money."];
        }
        this.respond.apply(this, response);
    };
    BuyData.prototype.desc = function () { return "Converts money to data. The conversion is 1 byte for $2."; };
    BuyData.prototype.usage = function () { return "buyData {amt} [unit]"; };
    BuyData = __decorate([
        command.cls(), 
        __metadata('design:paramtypes', [])
    ], BuyData);
    return BuyData;
}(index_1.Command));
exports.BuyData = BuyData;
