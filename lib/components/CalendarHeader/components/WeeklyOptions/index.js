"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _index = _interopRequireDefault(require("./index.less"));

var _utils = require("../../../../utils");

var _Container = require("../../../Container");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var WeeklyOptions = function WeeklyOptions(_ref) {
  var dateTextList = _ref.dateTextList;

  var _useContext = (0, _react.useContext)(_Container.GlobalData),
      targetDay = _useContext.targetDay,
      setTargetDay = _useContext.setTargetDay,
      switchWeekendDay = _useContext.switchWeekendDay;

  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _index["default"].Calendar_WeeklyOptions
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _index["default"].Calendar_WeeklyOptions_weekText
  }, ['一', '二', '三', '四', '五', '六', '日'].map(function (w, index) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: _index["default"].Calendar_WeeklyOptions_weekItem,
      key: index
    }, "\u661F\u671F", w);
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: _index["default"].Calendar_WeeklyOptions_DateText
  }, dateTextList.map(function (d, index) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      onClick: function onClick() {
        return setTargetDay(d);
      },
      key: index,
      style: {
        color: (0, _utils.getYear)(d) + "-" + (0, _utils.getMonth)(d) + "-" + (0, _utils.getDay)(d) === (0, _utils.getYear)(new Date().getTime()) + "-" + (0, _utils.getMonth)(new Date().getTime()) + "-" + (0, _utils.getDay)(new Date().getTime()) && 'red'
      },
      className: _index["default"].Calendar_WeeklyOptions_DateItem + " " + (d === targetDay && _index["default"].Calendar_WeeklyOptions_DateItem_active)
    }, (0, _utils.getDay)(d));
  })));
};

var _default = WeeklyOptions;
exports["default"] = _default;
//# sourceMappingURL=index.js.map