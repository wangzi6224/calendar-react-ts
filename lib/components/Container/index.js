"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = exports.GlobalData = void 0;

var _react = _interopRequireWildcard(require("react"));

var _index = _interopRequireDefault(require("./index.less"));

var _ScheduleCantainer = _interopRequireDefault(require("../ScheduleCantainer"));

var _CalendarHeader = _interopRequireDefault(require("../CalendarHeader"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var GlobalData = /*#__PURE__*/(0, _react.createContext)(null);
exports.GlobalData = GlobalData;

var Container = function Container(_ref) {
  var initDay = _ref.initDay,
      onChange = _ref.onChange,
      scheduleRender = _ref.scheduleRender,
      businessRender = _ref.businessRender,
      data = _ref.data,
      _ref$height = _ref.height,
      height = _ref$height === void 0 ? 560 : _ref$height,
      _ref$mode = _ref.mode,
      mode = _ref$mode === void 0 ? 'day' : _ref$mode,
      onSlideChange = _ref.onSlideChange,
      isDraggable = _ref.isDraggable,
      rangeStartAndEndKey = _ref.rangeStartAndEndKey;

  // 当前选择日期时间戳
  var _useState = (0, _react.useState)(initDay),
      targetDay = _useState[0],
      setTargetDay = _useState[1]; // 切换日和周


  var _useState2 = (0, _react.useState)(mode),
      switchWeekendDay = _useState2[0],
      setSwitchWeekendDay = _useState2[1];

  var setTargetDayHandle = function setTargetDayHandle(timestamp) {
    onChange(timestamp);
    setTargetDay(timestamp);
  };

  return /*#__PURE__*/_react["default"].createElement(GlobalData.Provider, {
    value: {
      isDraggable: isDraggable,
      height: height,
      targetDay: targetDay,
      switchWeekendDay: switchWeekendDay,
      setSwitchWeekendDay: setSwitchWeekendDay,
      setTargetDay: setTargetDayHandle
    }
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _index["default"].WT_Calendar_Container
  }, /*#__PURE__*/_react["default"].createElement(_CalendarHeader["default"], {
    businessRender: businessRender
  }), /*#__PURE__*/_react["default"].createElement(_ScheduleCantainer["default"], {
    data: data,
    onSlideChange: onSlideChange,
    scheduleRender: scheduleRender,
    rangeStartAndEndKey: rangeStartAndEndKey
  })));
};

var _default = Container;
exports["default"] = _default;
//# sourceMappingURL=index.js.map