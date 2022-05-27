"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _index = _interopRequireDefault(require("../../index.less"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var MovingBaseLine = function MovingBaseLine(_ref) {
  var movingTop = _ref.movingTop,
      scrollHeight = _ref.scrollHeight,
      color = _ref.color,
      visibility = _ref.visibility;
  var calcHoursText = (0, _react.useMemo)(function () {
    var __movingTop = Math.floor(movingTop / 30);

    if (__movingTop < 10) {
      return "0" + (__movingTop <= 0 ? 0 : __movingTop);
    }

    return __movingTop;
  }, [movingTop]);
  var calcMinutesText = (0, _react.useMemo)(function () {
    var __movingTop = Math.floor(movingTop / 30 * 60 % 60);

    if (__movingTop < 10) {
      return "0" + (__movingTop <= 0 ? 0 : __movingTop);
    }

    return __movingTop;
  }, [movingTop]);
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      top: movingTop + scrollHeight <= 0 ? 0 : movingTop + scrollHeight,
      borderTop: "2px dashed " + color,
      visibility: visibility ? 'visible' : 'hidden'
    },
    className: _index["default"].Calendar_ScheduleItem_CursorLine
  }, /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      color: color
    },
    className: _index["default"].Calendar_ScheduleItem_timeText
  }, calcHoursText + ":" + calcMinutesText));
};

var _default = MovingBaseLine;
exports["default"] = _default;
//# sourceMappingURL=index.js.map