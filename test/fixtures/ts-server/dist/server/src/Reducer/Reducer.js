"use strict";
exports.__esModule = true;
var immutable_1 = require("immutable");
var Reducer = /** @class */ (function () {
    function Reducer(name, store, defaultState) {
        var _this = this;
        this.reducerMethods = {};
        this.reduce = function (previousState, action) {
            var nextState = previousState || _this.defaultState;
            if (!_this.reducerMethods.hasOwnProperty(action.type)) {
                return nextState;
            }
            else {
                return _this.reducerMethods[action.type](nextState, action.payload);
            }
        };
        Object.defineProperty(this, 'name', {
            value: name,
            writable: false
        });
        this.store = store;
        this.defaultState = defaultState || immutable_1.Iterable({}); // todo: this might be bad :/
    }
    Reducer.prototype.register = function (key, fn) {
        this.reducerMethods[key] = fn;
    };
    return Reducer;
}());
exports["default"] = Reducer;
//# sourceMappingURL=Reducer.js.map