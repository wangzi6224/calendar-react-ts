import React, { useContext, useEffect, useState } from 'react';
import style from "./index.less";
import DailyOptions from "./components/DailyOptions";
import WeeklyOptions from "./components/WeeklyOptions";
import { weekDay } from "../../utils";
import { GlobalData } from "../Container";

var CalendarHeader = function CalendarHeader(_ref) {
  var businessRender = _ref.businessRender;

  var _useContext = useContext(GlobalData),
      targetDay = _useContext.targetDay,
      setTargetDay = _useContext.setTargetDay,
      switchWeekendDay = _useContext.switchWeekendDay,
      _setSwitchWeekendDay = _useContext.setSwitchWeekendDay;

  var _useState = useState([]),
      dateTextList = _useState[0],
      setDateTextList = _useState[1];

  var _useState2 = useState(targetDay),
      currTime = _useState2[0],
      setCurrTime = _useState2[1];

  useEffect(function () {
    setDateTextList(calcWeekDayList(targetDay));
  }, [targetDay]);

  var calcWeekDayList = function calcWeekDayList(params) {
    var result = [];

    for (var i = 1; i < weekDay(params); i++) {
      result.unshift(params - 3600 * 1000 * 24 * i);
    }

    for (var _i = 0; _i < 7 - weekDay(params) + 1; _i++) {
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

  return /*#__PURE__*/React.createElement("div", {
    className: style.Calendar_Header
  }, /*#__PURE__*/React.createElement(DailyOptions, {
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
  }), switchWeekendDay === 'week' && /*#__PURE__*/React.createElement(WeeklyOptions, {
    dateTextList: dateTextList
  }), /*#__PURE__*/React.createElement("div", {
    className: style.Calendar_Header_Zone
  }, "GMT+8"), /*#__PURE__*/React.createElement("div", {
    className: style.Calendar_Header_businessRender
  }, businessRender(targetDay)));
};

export default CalendarHeader;
//# sourceMappingURL=index.js.map