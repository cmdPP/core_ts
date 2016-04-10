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
var command = new decorator_1.CommandClass("autoMine");
var AutoMine = (function (_super) {
    __extends(AutoMine, _super);
    function AutoMine() {
        _super.apply(this, arguments);
        this.price = 20;
    }
    AutoMine.prototype.func = function (action) {
        if (['start', 'stop'].indexOf(action) === -1) {
            this.respond("Unrecognized parameter.");
            this.command("help autoMine");
            return;
        }
        var response = [];
        if (action === "start") {
            if (this.checkStorage()) {
                this.isAutoMining = true;
                response = [("Automatic mining beginning at a rate of " + this.formatToString(this.autoIncrement) + " byte(s)per second.")];
            }
            else {
                response = ['Your storage is full. Please upgrade storage to continue.'];
            }
        }
        else if (action === "stop") {
            this.isAutoMining = false;
            response = ['Automatic mining has been stopped.'];
        }
        this.respond.apply(this, response);
    };
    AutoMine.prototype.desc = function () { return "Increments your data every second by {" + this.formatToString(this.autoIncrement) + "}."; };
    AutoMine.prototype.usage = function () { return "autoMine (start | stop)"; };
    AutoMine = __decorate([
        command.cls(), 
        __metadata('design:paramtypes', [])
    ], AutoMine);
    return AutoMine;
}(index_1.Command));
exports.AutoMine = AutoMine;
