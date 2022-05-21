import React from "react";
import moment from "moment";

var ScheduleRender = function ScheduleRender(_ref) {
  var data = _ref.data,
      timestampRange = _ref.timestampRange;
  console.log(data);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: '90px',
      fontSize: "14px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "12px"
    }
  }, "\u65F6\u95F4\u8303\u56F4"), /*#__PURE__*/React.createElement("div", null, moment(data.startTime).format('HH:mm:ss')), /*#__PURE__*/React.createElement("div", null, moment(data.endTime).format('HH:mm:ss')));
};

export default ScheduleRender;
//# sourceMappingURL=index.js.map