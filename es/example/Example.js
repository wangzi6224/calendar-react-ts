import _extends from "@babel/runtime/helpers/esm/extends";
import React, { useState } from "react";
import { createRoot } from 'react-dom/client';
import styles from "./Example.less";
import Calendar from "./..";
import BusinessRender from "./components/BusinessRender";
import ScheduleRender from "./components/ScheduleRender";
var container = document.getElementById('root');
var root = createRoot(container);
var initialList = [{
  id: 1,
  startTime: Date.now() - 3600 * 1000,
  endTime: Date.now() + 3600 * 1000
}];

var Example = function Example() {
  var _useState = useState(initialList),
      scheduleList = _useState[0],
      setScheduleList = _useState[1];

  var _useState2 = useState(new Date().getTime()),
      scheduleDate = _useState2[0],
      setScheduleDate = _useState2[1];

  var slideChangeHandle = function slideChangeHandle(currTimestamp, data) {
    setScheduleList(scheduleList.map(function (item) {
      if (item.id === data.id) {
        return _extends({}, item, {
          startTime: currTimestamp[0],
          endTime: currTimestamp[1]
        });
      }

      return item;
    }));
  };

  return /*#__PURE__*/React.createElement("div", {
    className: styles.Example
  }, /*#__PURE__*/React.createElement(Calendar, {
    initDay: scheduleDate,
    onSlideChange: slideChangeHandle,
    isDraggable: true,
    data: scheduleList,
    mode: 'week',
    onChange: setScheduleDate,
    scheduleRender: function scheduleRender(_ref) {
      var data = _ref.data,
          timestampRange = _ref.timestampRange;
      return /*#__PURE__*/React.createElement(ScheduleRender, {
        data: data,
        timestampRange: timestampRange
      });
    },
    businessRender: function businessRender(timestamp) {
      return /*#__PURE__*/React.createElement(BusinessRender, {
        timestamp: timestamp
      });
    }
  }));
};

root.render( /*#__PURE__*/React.createElement(React.StrictMode, null, /*#__PURE__*/React.createElement(Example, null)));
//# sourceMappingURL=Example.js.map