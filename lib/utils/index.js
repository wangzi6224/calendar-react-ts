"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.weekDay = exports.rmEvent = exports.isLeapYearHandle = exports.getZeroTime = exports.getYear = exports.getMonthOwnDays = exports.getMonth = exports.getDay = exports.addEvent = void 0;

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

var DomEventHandle = /*#__PURE__*/function () {
  function DomEventHandle() {}

  var _proto = DomEventHandle.prototype;

  _proto.addEvent = function addEvent(_ref) {
    var evType = _ref.evType,
        handle = _ref.handle,
        _ref$options = _ref.options,
        options = _ref$options === void 0 ? null : _ref$options,
        _ref$domInstance = _ref.domInstance,
        domInstance = _ref$domInstance === void 0 ? document.body : _ref$domInstance;
    domInstance.addEventListener(evType, handle, options);
  };

  _proto.rmEvent = function rmEvent(_ref2) {
    var evType = _ref2.evType,
        handle = _ref2.handle,
        _ref2$options = _ref2.options,
        options = _ref2$options === void 0 ? null : _ref2$options,
        _ref2$domInstance = _ref2.domInstance,
        domInstance = _ref2$domInstance === void 0 ? document.body : _ref2$domInstance;
    domInstance.removeEventListener(evType, handle, options);
  };

  return DomEventHandle;
}();

var _DomEventHandle = new DomEventHandle(),
    addEvent = _DomEventHandle.addEvent,
    rmEvent = _DomEventHandle.rmEvent;

exports.rmEvent = rmEvent;
exports.addEvent = addEvent;
//# sourceMappingURL=index.js.map