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
var command = new decorator_1.CommandClass("alias");
var Alias = (function (_super) {
    __extends(Alias, _super);
    function Alias() {
        _super.apply(this, arguments);
    }
    Alias.prototype.func = function (action, name, command) {
        var response = [];
        if (!action || !name) {
            response = ['Insufficient parameters.'];
        }
        else if (action === "add" && !command) {
            response = ['Insufficient parameters.'];
        }
        else if (action !== "add" || action !== "remove") {
            response = ['Unrecognized action'];
        }
        else {
            if (action === "add") {
                this.playerAliases[name] = command;
                this.cmdAliases[name] = command;
                response = ['Alias added:', ("\t" + name + " -> " + command)];
            }
            else if (action === "remove") {
                if (name in this.playerAliases) {
                    delete this.playerAliases[name];
                    delete this.cmdAliases[name];
                }
                else {
                    response = ['Player alias does not exist.'];
                }
            }
        }
        this.respond.apply(this, response);
    };
    Alias.prototype.desc = function () {
        var aliases = [];
        for (var aliasName in this.playerAliases) {
            var alias = this.playerAliases[aliasName];
            aliases.push("\t" + aliasName + " -> " + alias);
        }
        return [
            "Creates aliases for commonly used commands.",
            "Current player aliases:"
        ].concat(aliases);
    };
    Alias.prototype.usage = function () { return "alias (add | remove) {name} {command}"; };
    Alias = __decorate([
        command.cls(), 
        __metadata('design:paramtypes', [])
    ], Alias);
    return Alias;
}(index_1.Command));
exports.Alias = Alias;
