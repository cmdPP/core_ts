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
var command = new decorator_1.CommandClass("buyCommand");
var SellData = (function (_super) {
    __extends(SellData, _super);
    function SellData() {
        _super.apply(this, arguments);
        this.aliases = ['apt-get'];
    }
    SellData.prototype.func = function (cmdName) {
        var response = [];
        if (cmdName && cmdName in this.commands) {
            var cmd = this.commands[cmdName];
            if (this.data >= cmd.price) {
                if (!cmd.unlocked) {
                    cmd.unlocked = true;
                    this.removeData(cmd.price);
                    response = [("Unlocked \"" + cmdName + "\" for " + this.formatToString(cmd.price) + ".")];
                }
                else {
                    response = ["Command has already been unlocked."];
                }
            }
            else {
                response = ["You don't have enough data to purchase that command."];
            }
        }
        else {
            response = ['Command not found for purchase.'];
        }
        this.respond.apply(this, response);
    };
    SellData.prototype.desc = function () {
        var cmds = [];
        for (var cmdName in this.commands) {
            var cmd = this.commands[cmdName];
            if (!cmd.unlocked && cmd.price !== 0) {
                cmds.push("\t" + cmdName + ": " + this.formatToString(cmd.price));
            }
        }
        return [
            "Purchases and unlocks a command.",
            "Available commands:"
        ].concat(cmds);
    };
    SellData.prototype.usage = function () { return "buyCommand {command}"; };
    SellData = __decorate([
        command.cls(), 
        __metadata('design:paramtypes', [])
    ], SellData);
    return SellData;
}(index_1.Command));
exports.SellData = SellData;
