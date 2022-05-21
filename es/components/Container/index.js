import _extends from "@babel/runtime/helpers/esm/extends";
import style from "./index.less";
import React, { createContext, useState } from 'react';
import CalendarHeader from "../CalendarHeader";
import ScheduleContainer from "../ScheduleContainer";
export var GlobalData = /*#__PURE__*/createContext(null);

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
  var _useState = useState(initDay),
      targetDay = _useState[0],
      setTargetDay = _useState[1]; // 日程数据


  var _useState2 = useState(data),
      scheduleData = _useState2[0],
      setScheduleData = _useState2[1]; // 切换日和周


  var _useState3 = useState(mode),
      switchWeekendDay = _useState3[0],
      setSwitchWeekendDay = _useState3[1];

  var setTargetDayHandle = function setTargetDayHandle(timestamp) {
    onChange(timestamp);
    setTargetDay(timestamp);
  };

  var changeScheduleDataHandle = function changeScheduleDataHandle(currTimestamp, data) {
    setScheduleData(scheduleData.map(function (item) {
      if (item.id === data.id) {
        return _extends({}, item, {
          startTime: currTimestamp[0],
          endTime: currTimestamp[1]
        });
      }

      return item;
    }));
  };

  return /*#__PURE__*/React.createElement(GlobalData.Provider, {
    value: {
      isDraggable: isDraggable,
      height: height,
      targetDay: targetDay,
      switchWeekendDay: switchWeekendDay,
      setSwitchWeekendDay: setSwitchWeekendDay,
      changeScheduleDataHandle: changeScheduleDataHandle,
      setTargetDay: setTargetDayHandle
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: style.WT_Calendar_Container
  }, /*#__PURE__*/React.createElement(CalendarHeader, {
    businessRender: businessRender
  }), /*#__PURE__*/React.createElement(ScheduleContainer, {
    data: scheduleData,
    scheduleRender: scheduleRender,
    rangeStartAndEndKey: rangeStartAndEndKey
  })));
};

export default Container;
//# sourceMappingURL=index.js.map