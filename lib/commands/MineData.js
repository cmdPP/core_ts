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
var command = new decorator_1.CommandClass("mineData");
var MineData = (function (_super) {
    __extends(MineData, _super);
    function MineData() {
        _super.apply(this, arguments);
    }
    MineData.prototype.func = function () {
        var response = [];
        if (this.checkStorage()) {
            response = ['Data mined.'];
            this.addData(this.increment);
        }
        else {
            response = ["Your storage is full. Please upgrade storage to continue."];
        }
        this.respond.apply(this, response);
    };
    MineData.prototype.desc = function () {
        return "Increments data by your increment amount. You current increment is {" + this.formatToString(this.increment) + "}";
    };
    MineData.prototype.usage = function () { return "mineData"; };
    MineData = __decorate([
        command.cls(), 
        __metadata('design:paramtypes', [])
    ], MineData);
    return MineData;
}(index_1.Command));
exports.MineData = MineData;
