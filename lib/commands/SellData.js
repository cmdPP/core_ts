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
var command = new decorator_1.CommandClass("sellData");
var SellData = (function (_super) {
    __extends(SellData, _super);
    function SellData() {
        _super.apply(this, arguments);
        this.price = 250;
    }
    SellData.prototype.func = function (amt, unit) {
        if (unit === void 0) { unit = "B"; }
        var numAmt = this.formatToNumber(amt, unit);
        if (!numAmt) {
            this.respond("Error.");
            this.command("help sellData");
            return;
        }
        var response = [];
        if (this.data >= numAmt && numAmt >= 100) {
            var loss = Math.floor(Math.random() * 15 + 10);
            var transfer = Math.round(numAmt * (1 - loss / 100));
            this.addMoney(transfer);
            this.removeData(transfer);
            response = [(loss + "% data integrity lost in transfer."), ("Data sold: " + amt + ". Money gained: $" + transfer + ".")];
        }
        else {
            response = ["You must sell at least 100 data. Please make sure you have 100 data."];
        }
        this.respond.apply(this, response);
    };
    SellData.prototype.desc = function () {
        return "Converts data to money. The conversion is 1 byte for $1, but the data deteriorates during the process.";
    };
    SellData.prototype.usage = function () { return "sellData {amt} [unit]"; };
    SellData = __decorate([
        command.cls(), 
        __metadata('design:paramtypes', [])
    ], SellData);
    return SellData;
}(index_1.Command));
exports.SellData = SellData;
