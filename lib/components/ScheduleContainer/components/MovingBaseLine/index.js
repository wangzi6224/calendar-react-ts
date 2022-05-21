"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _index = _interopRequireDefault(require("../../index.less"));

var MovingBaseLine = function MovingBaseLine(_ref) {
  var movingTop = _ref.movingTop,
      scrollHeight = _ref.scrollHeight,
      color = _ref.color;

  var calcHoursText = function calcHoursText() {
    var __movingTop = Math.floor(movingTop / 30);

    if (__movingTop < 10) {
      return "0" + (__movingTop <= 0 ? 0 : __movingTop);
    }

    return __movingTop;
  };

  var calcMinutesText = function calcMinutesText() {
    var __movingTop = Math.floor(movingTop / 30 * 60 % 60);

    if (__movingTop < 10) {
      return "0" + (__movingTop <= 0 ? 0 : __movingTop);
    }

    return __movingTop;
  };

  return /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      display: movingTop + scrollHeight <= 0 ? 'none' : 'block',
      top: movingTop + scrollHeight <= 0 ? 0 : movingTop + scrollHeight,
      borderTop: "2px dashed " + color
    },
    className: _index["default"].WT_Calendar_ScheduleItem_CursorLine
  }, /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      color: color
    },
    className: _index["default"].WT_Calendar_ScheduleItem_timeText
  }, calcHoursText() + ":" + calcMinutesText()));
};

var _default = MovingBaseLine;
exports["default"] = _default;
//# sourceMappingURL=index.js.map