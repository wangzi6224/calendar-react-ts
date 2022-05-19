import React from 'react';
import Container from "../Container";
import styles from "../../styles/initial.less";

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
  return /*#__PURE__*/React.createElement("div", {
    className: styles.Calendar
  }, /*#__PURE__*/React.createElement(Container, {
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

export default Calendar;
//# sourceMappingURL=index.js.map