"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _moment = _interopRequireDefault(require("moment"));

var ScheduleRender = function ScheduleRender(_ref) {
  var data = _ref.data,
      timestampRange = _ref.timestampRange;
  console.log(data);
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      width: '90px',
      fontSize: "14px"
    }
  }, /*#__PURE__*/_react["default"].createElement("span", {
    style: {
      fontSize: "12px"
    }
  }, "\u65F6\u95F4\u8303\u56F4"), /*#__PURE__*/_react["default"].createElement("div", null, (0, _moment["default"])(data.startTime).format('HH:mm:ss')), /*#__PURE__*/_react["default"].createElement("div", null, (0, _moment["default"])(data.endTime).format('HH:mm:ss')));
};

var _default = ScheduleRender;
exports["default"] = _default;
//# sourceMappingURL=index.js.map