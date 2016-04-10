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
var _1 = require('../');
var decorator_1 = require('../decorator');
var command = new decorator_1.CommandClass("help");
var Help = (function (_super) {
    __extends(Help, _super);
    function Help() {
        _super.apply(this, arguments);
        this.aliases = ['?'];
    }
    Help.prototype.func = function (subject) {
        var response = [];
        if (subject) {
            if (!(subject in this.commands)) {
                response = ['Command not found or no help is available. Type "help" with no arguments to see a list of commands.'];
            }
            else {
                var cmd = this.commands[subject];
                var desc = cmd.desc.apply(this);
                var usage = cmd.usage.apply(this);
                var aliases = cmd.aliases;
                console.log('Desc:', desc);
                console.log('Usage:', usage);
                console.log('Aliases:', aliases);
                if (Array.isArray(desc)) {
                    response = [(subject + ": " + desc[0]), ("To use: " + usage + "\n\n")].concat(desc.slice(1));
                }
                else {
                    response = [(subject + ": " + desc), ("To use: " + usage)];
                }
                if (aliases.length > 0) {
                    response.splice(1, 0, "Aliases: " + aliases.join(' '));
                }
            }
        }
        else {
            var commands = [];
            for (var cmdName in this.commands) {
                var cmd = this.commands[cmdName];
                if (cmd.unlocked) {
                    commands.push("\t" + cmdName);
                }
            }
            response = [
                "List of commands:",
                ""
            ];
            response.push.apply(response, commands);
            response.push('\nFor specific command help type "help [command]"');
        }
        this.respond.apply(this, response);
    };
    Help.prototype.desc = function () {
        return ["Gives list of commands or specific instructions for commands.", ("Data: " + this.data)];
    };
    Help.prototype.usage = function () { return 'help {subject}'; };
    Help = __decorate([
        command.cls(), 
        __metadata('design:paramtypes', [])
    ], Help);
    return Help;
}(_1.Command));
exports.Help = Help;
