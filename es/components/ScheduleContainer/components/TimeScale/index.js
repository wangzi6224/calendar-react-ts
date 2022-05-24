import React from "react";
import style from "../../index.less";

var TimeScale = function TimeScale(_ref) {
  var HoursList = _ref.HoursList,
      scrollHeight = _ref.scrollHeight;
  return /*#__PURE__*/React.createElement("div", {
    className: style.Calendar_scale,
    style: {
      height: HoursList.length * 30 + "px",
      top: scrollHeight
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, HoursList.map(function (h, index) {
    return /*#__PURE__*/React.createElement("div", {
      className: style.Calendar_scale_item,
      key: index
    }, /*#__PURE__*/React.createElement("span", {
      className: style.Calendar_scale_text,
      style: {
        top: index === 0 && -5
      }
    }, (h < 10 ? "0" + h : h) + ":00"));
  })));
};

export default TimeScale;
//# sourceMappingURL=index.js.map