"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _index = _interopRequireDefault(require("./index.less"));

var _DailyOptions = _interopRequireDefault(require("./components/DailyOptions"));

var _WeeklyOptions = _interopRequireDefault(require("./components/WeeklyOptions"));

var _utils = require("../../utils");

var _Container = require("../Container");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var CalendarHeader = function CalendarHeader(_ref) {
  var businessRender = _ref.businessRender;

  var _useContext = (0, _react.useContext)(_Container.GlobalData),
      targetDay = _useContext.targetDay,
      setTargetDay = _useContext.setTargetDay,
      switchWeekendDay = _useContext.switchWeekendDay,
      _setSwitchWeekendDay = _useContext.setSwitchWeekendDay;

  var _useState = (0, _react.useState)([]),
      dateTextList = _useState[0],
      setDateTextList = _useState[1];

  var _useState2 = (0, _react.useState)(targetDay),
      currTime = _useState2[0],
      setCurrTime = _useState2[1];

  (0, _react.useEffect)(function () {
    setDateTextList(calcWeekDayList(targetDay));
  }, [targetDay]);

  var calcWeekDayList = function calcWeekDayList(params) {
    var result = [];

    for (var i = 1; i < (0, _utils.weekDay)(params); i++) {
      result.unshift(params - 3600 * 1000 * 24 * i);
    }

    for (var _i = 0; _i < 7 - (0, _utils.weekDay)(params) + 1; _i++) {
      result.push(params + 3600 * 1000 * 24 * _i);
    }

    return [].concat(result);
  };

  var _onChangeWeek = function onChangeWeek(type, switchWay) {
    if (switchWay === 'week') {
      var calcWeekTime = type === 'prevWeek' ? currTime - 3600 * 1000 * 24 * 7 : currTime + 3600 * 1000 * 24 * 7;
      setCurrTime(calcWeekTime);
      setDateTextList([].concat(calcWeekDayList(calcWeekTime)));
    }

    if (switchWay === 'day') {
      var _calcWeekTime = type === 'prevWeek' ? targetDay - 3600 * 1000 * 24 : targetDay + 3600 * 1000 * 24;

      setCurrTime(_calcWeekTime);
      setTargetDay(_calcWeekTime);
    }
  };

  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _index["default"].WT_Calendar_Header
  }, /*#__PURE__*/_react["default"].createElement(_DailyOptions["default"], {
    setCurrTime: setCurrTime,
    dateTextList: dateTextList,
    setSwitchWeekendDay: function setSwitchWeekendDay(value) {
      _setSwitchWeekendDay(value);

      if (value === 'week') {
        setDateTextList(calcWeekDayList(targetDay));
      }
    },
    onChangeWeek: function onChangeWeek(type) {
      return _onChangeWeek(type, switchWeekendDay);
    }
  }), switchWeekendDay === 'week' && /*#__PURE__*/_react["default"].createElement(_WeeklyOptions["default"], {
    dateTextList: dateTextList
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: _index["default"].WT_Calendar_Header_Zone
  }, "GMT+8"), /*#__PURE__*/_react["default"].createElement("div", {
    className: _index["default"].WT_Calendar_Header_businessRender
  }, businessRender(targetDay)));
};

var _default = CalendarHeader;
exports["default"] = _default;
//# sourceMappingURL=index.js.map