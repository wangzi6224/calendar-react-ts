import React from 'react';
import style from '@/components/ScheduleCantainer/index.less';

var MovingBaseLine = function MovingBaseLine(_ref) {
  var movingTop = _ref.movingTop,
      scrollHeight = _ref.scrollHeight,
      isShow = _ref.isShow;
  return isShow && /*#__PURE__*/React.createElement("div", {
    style: {
      display: movingTop + scrollHeight <= 0 ? 'none' : 'block',
      top: movingTop + scrollHeight <= 0 ? 0 : movingTop + scrollHeight
    },
    className: style.WT_Calendar_ScheduleItem_CursorLine
  }, /*#__PURE__*/React.createElement("div", {
    className: style.WT_Calendar_ScheduleItem_timeText
  }, (Math.floor(movingTop / 30) < 10 ? "0" + (Math.floor(movingTop / 30) <= 0 ? 0 : Math.floor(movingTop / 30)) : Math.floor(movingTop / 30)) + ":" + (Math.floor(movingTop / 30 * 60 % 60) < 10 ? "0" + (Math.floor(movingTop / 30 * 60 % 60) <= 0 ? 0 : Math.floor(movingTop / 30 * 60 % 60)) : Math.floor(movingTop / 30 * 60 % 60))));
};

export default MovingBaseLine;
//# sourceMappingURL=index.js.map