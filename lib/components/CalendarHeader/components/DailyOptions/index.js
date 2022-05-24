"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _index = _interopRequireDefault(require("./index.less"));

var _moment = _interopRequireDefault(require("moment"));

var _utils = require("../../../../utils");

var _Container = require("../../../Container");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var DailyOptions = function DailyOptions(_ref) {
  var setCurrTime = _ref.setCurrTime,
      dateTextList = _ref.dateTextList,
      onChangeWeek = _ref.onChangeWeek,
      setSwitchWeekendDay = _ref.setSwitchWeekendDay;

  var _useContext = (0, _react.useContext)(_Container.GlobalData),
      targetDay = _useContext.targetDay,
      setTargetDay = _useContext.setTargetDay,
      switchWeekendDay = _useContext.switchWeekendDay;

  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _index["default"].Calendar_DailyOptions
  }, /*#__PURE__*/_react["default"].createElement("div", {
    onClick: function onClick() {
      setTargetDay(new Date().getTime());
    },
    className: (0, _moment["default"])(targetDay).format('YYYY年MM月DD日') === (0, _moment["default"])(new Date()).format('YYYY年MM月DD日') ? _index["default"].Calendar_DailyOptions_Btn : _index["default"].Calendar_DailyOptions_Btn_unActive
  }, "\u4ECA\u5929"), /*#__PURE__*/_react["default"].createElement("div", {
    className: _index["default"].Calendar_DailyOptions_DateShow
  }, /*#__PURE__*/_react["default"].createElement("div", {
    onClick: function onClick() {
      onChangeWeek('prevWeek');
    },
    className: _index["default"].Calendar_DailyOptions_ChangeBtn
  }, "<"), /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      fontFamily: 'sans-serif'
    }
  }, switchWeekendDay === 'week' && (0, _moment["default"])(dateTextList[0]).format('YYYY年MM月DD日') + " - " + (0, _utils.getDay)(dateTextList[dateTextList.length - 1]) + "\u65E5", switchWeekendDay === 'day' && ((0, _moment["default"])(targetDay).format('YYYY年MM月DD日') === (0, _moment["default"])(new Date()).format('YYYY年MM月DD日') ? '今天' : (0, _moment["default"])(targetDay).format('YYYY年MM月DD日'))), /*#__PURE__*/_react["default"].createElement("div", {
    onClick: function onClick() {
      onChangeWeek('nextWeek');
    },
    className: _index["default"].Calendar_DailyOptions_ChangeBtn
  }, ">")), /*#__PURE__*/_react["default"].createElement("div", {
    className: _index["default"].Calendar_DailyOptions_Checkout
  }, /*#__PURE__*/_react["default"].createElement("div", {
    onClick: function onClick() {
      setSwitchWeekendDay('day');
    },
    className: _index["default"].Calendar_DailyOptions_Btn + " " + _index["default"].Calendar_DailyOptions_DayBtn + " " + (switchWeekendDay === 'day' && _index["default"].Calendar_DailyOptions_Active)
  }, "\u65E5"), /*#__PURE__*/_react["default"].createElement("div", {
    onClick: function onClick() {
      setCurrTime(targetDay);
      setSwitchWeekendDay('week');
    },
    className: _index["default"].Calendar_DailyOptions_Btn + " " + _index["default"].Calendar_DailyOptions_WeekBtn + " " + (switchWeekendDay === 'week' && _index["default"].Calendar_DailyOptions_Active)
  }, "\u5468")));
};

var _default = DailyOptions;
exports["default"] = _default;
//# sourceMappingURL=index.js.map