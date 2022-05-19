import React, { createContext, useState } from 'react';
import style from './index.less';
import ScheduleCantainer from '@/components/ScheduleCantainer';
import CalendarHeader from '@/components/CalendarHeader';
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
      setTargetDay = _useState[1]; // 切换日和周


  var _useState2 = useState(mode),
      switchWeekendDay = _useState2[0],
      setSwitchWeekendDay = _useState2[1];

  var setTargetDayHandle = function setTargetDayHandle(timestamp) {
    onChange(timestamp);
    setTargetDay(timestamp);
  };

  return /*#__PURE__*/React.createElement(GlobalData.Provider, {
    value: {
      isDraggable: isDraggable,
      height: height,
      targetDay: targetDay,
      switchWeekendDay: switchWeekendDay,
      setSwitchWeekendDay: setSwitchWeekendDay,
      setTargetDay: setTargetDayHandle
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: style.WT_Calendar_Container
  }, /*#__PURE__*/React.createElement(CalendarHeader, {
    businessRender: businessRender
  }), /*#__PURE__*/React.createElement(ScheduleCantainer, {
    data: data,
    onSlideChange: onSlideChange,
    scheduleRender: scheduleRender,
    rangeStartAndEndKey: rangeStartAndEndKey
  })));
};

export default Container;
//# sourceMappingURL=index.js.map