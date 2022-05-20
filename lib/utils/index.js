"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.weekDay = exports.isLeapYearHandle = exports.getZeroTime = exports.getYear = exports.getMonthOwnDays = exports.getMonth = exports.getDay = void 0;

var _moment = _interopRequireDefault(require("moment"));

// 判断平年闰年 true闰年, false平年
var isLeapYearHandle = function isLeapYearHandle(timestamp) {
  return getYear(timestamp) % 4 === 0 && getYear(timestamp) % 100 !== 0 || getYear(timestamp) % 400 === 0;
}; // 获取年


exports.isLeapYearHandle = isLeapYearHandle;

var getYear = function getYear(timestamp) {
  return (0, _moment["default"])(timestamp).year();
}; // 获取月


exports.getYear = getYear;

var getMonth = function getMonth(timestamp) {
  return (0, _moment["default"])(timestamp).month() + 1;
}; // 获取日


exports.getMonth = getMonth;

var getDay = function getDay(timestamp) {
  return (0, _moment["default"])(timestamp).date();
}; // 获取星期


exports.getDay = getDay;

var weekDay = function weekDay(timestamp) {
  return (0, _moment["default"])(timestamp).day() === 0 ? 7 : (0, _moment["default"])(timestamp).day();
}; // 获取当前月份的日期


exports.weekDay = weekDay;

var getMonthOwnDays = function getMonthOwnDays(timestamp, year, month) {
  var dateCount = new Date(year || getYear(timestamp), month || getMonth(timestamp), 0).getDate();
  var result = [];

  for (var i = 0; i < dateCount; i++) {
    result.push(i + 1);
  }

  return [].concat(result);
}; // 获取某个时间所在当天的零时零分零秒


exports.getMonthOwnDays = getMonthOwnDays;

var getZeroTime = function getZeroTime(time) {
  var tempDate = time instanceof Date ? time : new Date(time); // eslint-disable-next-line no-restricted-syntax

  for (var _i = 0, _arr = ['setHours', 'setMinutes', 'setSeconds', 'setMilliseconds']; _i < _arr.length; _i++) {
    var item = _arr[_i];
    tempDate[item](0);
  }

  return time instanceof Date ? tempDate : tempDate.getTime();
};

exports.getZeroTime = getZeroTime;
//# sourceMappingURL=index.js.map