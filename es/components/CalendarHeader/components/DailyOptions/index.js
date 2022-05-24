import React, { useContext } from 'react';
import style from "./index.less";
import moment from 'moment';
import { getDay } from "../../../../utils";
import { GlobalData } from "../../../Container";

var DailyOptions = function DailyOptions(_ref) {
  var setCurrTime = _ref.setCurrTime,
      dateTextList = _ref.dateTextList,
      onChangeWeek = _ref.onChangeWeek,
      setSwitchWeekendDay = _ref.setSwitchWeekendDay;

  var _useContext = useContext(GlobalData),
      targetDay = _useContext.targetDay,
      setTargetDay = _useContext.setTargetDay,
      switchWeekendDay = _useContext.switchWeekendDay;

  return /*#__PURE__*/React.createElement("div", {
    className: style.Calendar_DailyOptions
  }, /*#__PURE__*/React.createElement("div", {
    onClick: function onClick() {
      setTargetDay(new Date().getTime());
    },
    className: moment(targetDay).format('YYYY年MM月DD日') === moment(new Date()).format('YYYY年MM月DD日') ? style.Calendar_DailyOptions_Btn : style.Calendar_DailyOptions_Btn_unActive
  }, "\u4ECA\u5929"), /*#__PURE__*/React.createElement("div", {
    className: style.Calendar_DailyOptions_DateShow
  }, /*#__PURE__*/React.createElement("div", {
    onClick: function onClick() {
      onChangeWeek('prevWeek');
    },
    className: style.Calendar_DailyOptions_ChangeBtn
  }, "<"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'sans-serif'
    }
  }, switchWeekendDay === 'week' && moment(dateTextList[0]).format('YYYY年MM月DD日') + " - " + getDay(dateTextList[dateTextList.length - 1]) + "\u65E5", switchWeekendDay === 'day' && (moment(targetDay).format('YYYY年MM月DD日') === moment(new Date()).format('YYYY年MM月DD日') ? '今天' : moment(targetDay).format('YYYY年MM月DD日'))), /*#__PURE__*/React.createElement("div", {
    onClick: function onClick() {
      onChangeWeek('nextWeek');
    },
    className: style.Calendar_DailyOptions_ChangeBtn
  }, ">")), /*#__PURE__*/React.createElement("div", {
    className: style.Calendar_DailyOptions_Checkout
  }, /*#__PURE__*/React.createElement("div", {
    onClick: function onClick() {
      setSwitchWeekendDay('day');
    },
    className: style.Calendar_DailyOptions_Btn + " " + style.Calendar_DailyOptions_DayBtn + " " + (switchWeekendDay === 'day' && style.Calendar_DailyOptions_Active)
  }, "\u65E5"), /*#__PURE__*/React.createElement("div", {
    onClick: function onClick() {
      setCurrTime(targetDay);
      setSwitchWeekendDay('week');
    },
    className: style.Calendar_DailyOptions_Btn + " " + style.Calendar_DailyOptions_WeekBtn + " " + (switchWeekendDay === 'week' && style.Calendar_DailyOptions_Active)
  }, "\u5468")));
};

export default DailyOptions;
//# sourceMappingURL=index.js.map