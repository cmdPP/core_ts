"use strict";
var _1 = require('./');
var CommandClass = (function () {
    function CommandClass(name) {
        this.name = name;
    }
    CommandClass.makeFunc = function () {
        return function (target, key, desc) {
            var original = desc.value;
            desc.value = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                return original.apply(_1.CMD.instance, args);
            };
            return desc;
        };
    };
    CommandClass.prototype.cls = function () {
        var _this = this;
        return function (target) {
            var original = target;
            _1.CMD.addCommand(_this.name, target);
            return target;
        };
    };
    CommandClass.prototype.func = function () {
        return CommandClass.makeFunc();
    };
    CommandClass.prototype.desc = function () {
        return CommandClass.makeFunc();
    };
    CommandClass.prototype.usage = function () {
        return CommandClass.makeFunc();
    };
    return CommandClass;
}());
exports.CommandClass = CommandClass;
