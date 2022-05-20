"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _index = _interopRequireDefault(require("../index.less"));

var MovingBaseLine = function MovingBaseLine(_ref) {
  var movingTop = _ref.movingTop,
      scrollHeight = _ref.scrollHeight,
      isShow = _ref.isShow;
  return isShow && /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      display: movingTop + scrollHeight <= 0 ? 'none' : 'block',
      top: movingTop + scrollHeight <= 0 ? 0 : movingTop + scrollHeight
    },
    className: _index["default"].WT_Calendar_ScheduleItem_CursorLine
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _index["default"].WT_Calendar_ScheduleItem_timeText
  }, (Math.floor(movingTop / 30) < 10 ? "0" + (Math.floor(movingTop / 30) <= 0 ? 0 : Math.floor(movingTop / 30)) : Math.floor(movingTop / 30)) + ":" + (Math.floor(movingTop / 30 * 60 % 60) < 10 ? "0" + (Math.floor(movingTop / 30 * 60 % 60) <= 0 ? 0 : Math.floor(movingTop / 30 * 60 % 60)) : Math.floor(movingTop / 30 * 60 % 60))));
};

var _default = MovingBaseLine;
exports["default"] = _default;
//# sourceMappingURL=index.js.map