"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.useAutoScroll = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _react = require("react");

var _utils = require("../utils");

var useAutoScroll = function useAutoScroll(targetDay, height) {
  var _useState = (0, _react.useState)(targetDay),
      autoPositionTime = _useState[0];

  var autoPositionScrollHandle = function autoPositionScrollHandle() {
    return setTimeout(function () {
      try {
        var _document$getElementB;

        var scrollContainerEle = document.getElementById('WT_Calendar_ScheduleContainer_inner');
        var PositionTime = (0, _moment["default"])((0, _utils.getYear)(autoPositionTime) + "/" + (0, _utils.getMonth)(autoPositionTime) + "/" + (0, _utils.getDay)(autoPositionTime) + " " + (0, _moment["default"])(autoPositionTime).hour() + ":00:00").unix() * 1000;
        scrollContainerEle.scrollTop = ((_document$getElementB = document.getElementById("" + PositionTime)) == null ? void 0 : _document$getElementB.offsetTop) - height / 3;
      } catch (err) {
        console.log('自动滚动报错---->', err);
      }
    }, 20);
  };

  (0, _react.useLayoutEffect)(function () {
    var scrollTimeID = autoPositionScrollHandle();
    return function () {
      clearTimeout(scrollTimeID);
    };
  }, [targetDay]);
};

exports.useAutoScroll = useAutoScroll;
//# sourceMappingURL=useAutoScroll.js.map