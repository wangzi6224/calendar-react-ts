import _extends from "@babel/runtime/helpers/esm/extends";
import React, { useEffect, useState } from "react";
import { createRoot } from 'react-dom/client';
import styles from "./Example.less";
import moment from "moment";
import Calendar from "./..";
var container = document.getElementById('root');
var root = createRoot(container);

var ScheduleRender = function ScheduleRender(_ref) {
  var data = _ref.data,
      timestampRange = _ref.timestampRange;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: '90px'
    }
  }, timestampRange.map(function (t, index) {
    return /*#__PURE__*/React.createElement("div", {
      key: t
    }, "" + moment(t).format('HH:mm:ss') + (index === 1 ? '有会议' : ''));
  }));
};

var BusinessRender = function BusinessRender() {
  var _useState = useState(new Date().getTime()),
      now = _useState[0],
      setNow = _useState[1];

  useEffect(function () {
    setInterval(function () {
      setNow(function (_) {
        return setNow(new Date().getTime());
      });
    }, 1000);
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 800,
      fontSize: "32px",
      color: "rgb(208, 219, 223)"
    }
  }, moment(now).format('HH:mm:ss'));
};

var Example = function Example() {
  var _useState2 = useState([{
    startTime: Date.now() - 3600 * 1000,
    endTime: Date.now() + 3600 * 1.5 * 1000
  }]),
      scheduleList = _useState2[0],
      setScheduleList = _useState2[1];

  var _useState3 = useState(new Date().getTime()),
      scheduleDate = _useState3[0],
      setScheduleDate = _useState3[1];

  return /*#__PURE__*/React.createElement("div", {
    className: styles.Example
  }, /*#__PURE__*/React.createElement(Calendar, {
    initDay: scheduleDate,
    onSlideChange: function onSlideChange(currTimestamp, data) {
      setScheduleList(scheduleList.map(function (item) {
        if (item.id === data.id) {
          return _extends({}, item, {
            startTime: currTimestamp[0],
            endTime: currTimestamp[1]
          });
        }

        return item;
      }));
    },
    isDraggable: true,
    data: scheduleList,
    mode: 'week',
    onChange: function onChange(time) {
      setScheduleDate(time);
    },
    scheduleRender: function scheduleRender(_ref2) {
      var data = _ref2.data,
          timestampRange = _ref2.timestampRange;
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