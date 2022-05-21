"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _index = _interopRequireDefault(require("../../index.less"));

var TimeScale = function TimeScale(_ref) {
  var HoursList = _ref.HoursList,
      scrollHeight = _ref.scrollHeight;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _index["default"].WT_Calendar_scale,
    style: {
      height: HoursList.length * 30 + "px",
      top: scrollHeight
    }
  }, /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      position: 'relative'
    }
  }, HoursList.map(function (h, index) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: _index["default"].WT_Calendar_scale_item,
      key: index
    }, /*#__PURE__*/_react["default"].createElement("span", {
      className: _index["default"].WT_Calendar_scale_text,
      style: {
        top: index === 0 && -5
      }
    }, (h < 10 ? "0" + h : h) + ":00"));
  })));
};

var _default = TimeScale;
exports["default"] = _default;
//# sourceMappingURL=index.js.map