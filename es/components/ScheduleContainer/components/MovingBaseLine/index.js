import React, { useMemo } from 'react';
import style from "../../index.less";

var MovingBaseLine = function MovingBaseLine(_ref) {
  var movingTop = _ref.movingTop,
      scrollHeight = _ref.scrollHeight,
      color = _ref.color,
      visibility = _ref.visibility;
  var calcHoursText = useMemo(function () {
    var __movingTop = Math.floor(movingTop / 30);

    if (__movingTop < 10) {
      return "0" + (__movingTop <= 0 ? 0 : __movingTop);
    }

    return __movingTop;
  }, [movingTop]);
  var calcMinutesText = useMemo(function () {
    var __movingTop = Math.floor(movingTop / 30 * 60 % 60);

    if (__movingTop < 10) {
      return "0" + (__movingTop <= 0 ? 0 : __movingTop);
    }

    return __movingTop;
  }, [movingTop]);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: movingTop + scrollHeight <= 0 ? 'none' : 'block',
      top: movingTop + scrollHeight <= 0 ? 0 : movingTop + scrollHeight,
      borderTop: "2px dashed " + color,
      visibility: visibility ? 'visible' : 'hidden'
    },
    className: style.Calendar_ScheduleItem_CursorLine
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: color
    },
    className: style.Calendar_ScheduleItem_timeText
  }, calcHoursText + ":" + calcMinutesText));
};

export default MovingBaseLine;
//# sourceMappingURL=index.js.map