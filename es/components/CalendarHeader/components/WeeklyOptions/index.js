import React, { useContext } from 'react';
import style from "./index.less";
import { getDay, getMonth, getYear } from "../../../../utils";
import { GlobalData } from "../../../Container";

var WeeklyOptions = function WeeklyOptions(_ref) {
  var dateTextList = _ref.dateTextList;

  var _useContext = useContext(GlobalData),
      targetDay = _useContext.targetDay,
      setTargetDay = _useContext.setTargetDay,
      switchWeekendDay = _useContext.switchWeekendDay;

  return /*#__PURE__*/React.createElement("div", {
    className: style.WT_Calendar_WeeklyOptions
  }, /*#__PURE__*/React.createElement("div", {
    className: style.WT_Calendar_WeeklyOptions_weekText
  }, ['一', '二', '三', '四', '五', '六', '日'].map(function (w, index) {
    return /*#__PURE__*/React.createElement("div", {
      className: style.WT_Calendar_WeeklyOptions_weekItem,
      key: index
    }, "\u661F\u671F", w);
  })), /*#__PURE__*/React.createElement("div", {
    className: style.WT_Calendar_WeeklyOptions_DateText
  }, dateTextList.map(function (d, index) {
    return /*#__PURE__*/React.createElement("div", {
      onClick: function onClick() {
        return setTargetDay(d);
      },
      key: index,
      style: {
        color: getYear(d) + "-" + getMonth(d) + "-" + getDay(d) === getYear(new Date().getTime()) + "-" + getMonth(new Date().getTime()) + "-" + getDay(new Date().getTime()) && 'red'
      },
      className: style.WT_Calendar_WeeklyOptions_DateItem + " " + (d === targetDay && style.WT_Calendar_WeeklyOptions_DateItem_active)
    }, getDay(d));
  })));
};

export default WeeklyOptions;
//# sourceMappingURL=index.js.map