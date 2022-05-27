import moment from "moment";
import { useLayoutEffect, useState } from "react";
import { getDay, getMonth, getYear } from "../utils";
export var useAutoScroll = function useAutoScroll(targetDay, height) {
  var _useState = useState(targetDay),
      autoPositionTime = _useState[0];

  var autoPositionScrollHandle = function autoPositionScrollHandle() {
    return setTimeout(function () {
      try {
        var _document$getElementB;

        var scrollContainerEle = document.getElementById('Calendar_ScheduleContainer_inner');
        var PositionTime = moment(getYear(autoPositionTime) + "/" + getMonth(autoPositionTime) + "/" + getDay(autoPositionTime) + " " + moment(autoPositionTime).hour() + ":00:00").unix() * 1000;
        scrollContainerEle.scrollTop = ((_document$getElementB = document.getElementById("" + PositionTime)) == null ? void 0 : _document$getElementB.offsetTop) - height / 3;
      } catch (err) {
        console.log('自动滚动报错---->', err);
      }
    }, 20);
  };

  useLayoutEffect(function () {
    var scrollTimeID = autoPositionScrollHandle();
    return function () {
      clearTimeout(scrollTimeID);
    };
  }, [targetDay]);
};
//# sourceMappingURL=useAutoScroll.js.map