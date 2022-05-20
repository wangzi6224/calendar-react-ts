"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _Container = _interopRequireDefault(require("../Container"));

var _initial = _interopRequireDefault(require("../../styles/initial.less"));

var Calendar = function Calendar(_ref) {
  var _ref$initDay = _ref.initDay,
      initDay = _ref$initDay === void 0 ? new Date().getTime() : _ref$initDay,
      data = _ref.data,
      onChange = _ref.onChange,
      scheduleRender = _ref.scheduleRender,
      businessRender = _ref.businessRender,
      mode = _ref.mode,
      onSlideChange = _ref.onSlideChange,
      _ref$isDraggable = _ref.isDraggable,
      isDraggable = _ref$isDraggable === void 0 ? false : _ref$isDraggable,
      _ref$rangeStartAndEnd = _ref.rangeStartAndEndKey,
      rangeStartAndEndKey = _ref$rangeStartAndEnd === void 0 ? ['startTime', 'endTime'] : _ref$rangeStartAndEnd;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _initial["default"].Calendar
  }, /*#__PURE__*/_react["default"].createElement(_Container["default"], {
    mode: mode,
    data: data,
    initDay: initDay,
    onChange: onChange,
    scheduleRender: scheduleRender,
    businessRender: businessRender,
    onSlideChange: onSlideChange,
    isDraggable: isDraggable,
    rangeStartAndEndKey: rangeStartAndEndKey
  }));
};

var _default = Calendar;
exports["default"] = _default;
//# sourceMappingURL=index.js.map