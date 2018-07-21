"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var immutable_1 = require("immutable");
var re_store_1 = require("re-store");
var DEFAULT_STATE = immutable_1.Map({
    num: 0
});
var IncDecReducer = /** @class */ (function (_super) {
    __extends(IncDecReducer, _super);
    function IncDecReducer(store) {
        var _this = _super.call(this, 'incdec', store, DEFAULT_STATE) || this;
        _this.register('INCREMENT', _this.inc);
        _this.register('DECREMENT', _this.dec);
        return _this;
    }
    IncDecReducer.prototype.inc = function (state) {
        return state.set('num', state.get('num') + 1);
    };
    IncDecReducer.prototype.dec = function (state) {
        return state.set('num', state.get('num') - 1);
    };
    return IncDecReducer;
}(re_store_1.Reducer));
exports["default"] = IncDecReducer;
//# sourceMappingURL=IncDecReducer.js.map