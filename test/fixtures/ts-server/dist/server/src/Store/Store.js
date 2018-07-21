"use strict";
exports.__esModule = true;
var immutable_1 = require("immutable");
var redux_1 = require("redux");
function isNode() {
    return Object.prototype.toString.call(typeof process !== 'undefined' ? process : 0) === '[object process]';
}
var Store = /** @class */ (function () {
    function Store(options) {
        var _this = this;
        this.reducerObjects = {};
        this.reduce = function (previousState, action) {
            return Object.keys(_this.reducerObjects).reduce(function (nextState, key) {
                return nextState.updateIn([key], function (v) { return _this.reducerObjects[key].reduce(v, action); });
            }, previousState || immutable_1.Map());
        };
        // oop
        this.reduxStore = options && options.redux
            || this.createStore(options && options.preloadState);
        this.isNode = options && options.isNode !== undefined
            ? options.isNode
            : isNode();
        this.isDev = options && options.isDev !== undefined
            ? options.isDev
            : process && process.env && process.env.NODE_ENV === 'development';
        this.useRemoteDevtools = options && !!options.useRemoteDevtools;
    }
    Store.prototype.registerReducer = function (reducerClass) {
        var nReducer = new reducerClass(this);
        if (!this.reducerObjects.hasOwnProperty(nReducer.name)) {
            this.reducerObjects[nReducer.name] = nReducer;
        }
    };
    Store.prototype.getState = function (name) {
        if (name) {
            return this.reduxStore.getState().get(name);
        }
        else {
            return this.reduxStore.getState();
        }
    };
    Store.prototype.dispatch = function (type, payload) {
        this.reduxStore.dispatch({
            payload: payload,
            type: type
        });
    };
    Store.prototype.createStore = function (preloadState) {
        try {
            var rde = require('redux-devtools-extension');
            var rrd = require('remote-redux-devtools');
            if (this.isDev && !this.isNode) {
                var devTools = this.useRemoteDevtools ? rrd.devToolsEnhancer : rde.devToolsEnhancer;
                return redux_1.createStore(this.reduce, preloadState, devTools({}));
            }
            else {
                return redux_1.createStore(this.reduce, preloadState);
            }
        }
        catch (e) {
            return redux_1.createStore(this.reduce, preloadState);
        }
    };
    return Store;
}());
exports["default"] = Store;
//# sourceMappingURL=Store.js.map