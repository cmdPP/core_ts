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
var command = new decorator_1.CommandClass("currentStorage");
var CurrentStorage = (function (_super) {
    __extends(CurrentStorage, _super);
    function CurrentStorage() {
        _super.apply(this, arguments);
    }
    CurrentStorage.prototype.func = function () {
        this.respond.apply(this, [
            'Your current storage is:',
            ("\tName: " + this.storage.name),
            ("\tCapacity: " + this.storage.capacity)
        ]);
    };
    CurrentStorage.prototype.desc = function () { return "Responds with your current storage."; };
    CurrentStorage.prototype.usage = function () { return "currentStorage"; };
    CurrentStorage = __decorate([
        command.cls(), 
        __metadata('design:paramtypes', [])
    ], CurrentStorage);
    return CurrentStorage;
}(index_1.Command));
exports.CurrentStorage = CurrentStorage;
