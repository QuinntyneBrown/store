"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Store = (function (_super) {
    __extends(Store, _super);
    function Store(initialState, localStorageManager, reducers) {
        var _this = this;
        _super.call(this, initialState || {});
        this.localStorageManager = localStorageManager;
        this.reducers = reducers;
        this.dispatch = function (action) {
            _this.state = _this.state || _this.localStorageManager.get({ name: "state" }) || {};
            _this.state = _this.setLastTriggeredByActionId(_this.state, action);
            for (var i = 0; i < _this.reducers.length; i++) {
                _this.state = _this.reducers[i].call(null, _this.state, action);
            }
            _this.localStorageManager.put({ name: "state", value: _this.state });
            _this.onNext(_this.state);
        };
        this.setLastTriggeredByActionId = function (state, action) {
            state.lastTriggeredByActionId = action.id;
            state.lastTriggeredByAction = action;
            state.lastTriggeredByActionType = action.constructor.type;
            return state;
        };
        this.state = initialState || {};
    }
    return Store;
}(Rx.BehaviorSubject));
exports.Store = Store;
//# sourceMappingURL=store.js.map