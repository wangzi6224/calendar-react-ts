"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireWildcard(require("react"));

var _client = require("react-dom/client");

var _Example = _interopRequireDefault(require("./Example.less"));

var _moment = _interopRequireDefault(require("moment"));

var _2 = _interopRequireDefault(require("./.."));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var container = document.getElementById('root');
var root = (0, _client.createRoot)(container);

var ScheduleRender = function ScheduleRender(_ref) {
  var data = _ref.data,
      timestampRange = _ref.timestampRange;
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      width: '90px'
    }
  }, timestampRange.map(function (t, index) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: t
    }, "" + (0, _moment["default"])(t).format('HH:mm:ss') + (index === 1 ? '有会议' : ''));
  }));
};

var BusinessRender = function BusinessRender() {
  var _useState = (0, _react.useState)(new Date().getTime()),
      now = _useState[0],
      setNow = _useState[1];

  (0, _react.useEffect)(function () {
    setInterval(function () {
      setNow(function (_) {
        return setNow(new Date().getTime());
      });
    }, 1000);
  }, []);
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      fontWeight: 800,
      fontSize: "32px",
      color: "rgb(208, 219, 223)"
    }
  }, (0, _moment["default"])(now).format('HH:mm:ss'));
};

var Example = function Example() {
  var _useState2 = (0, _react.useState)([{
    startTime: Date.now() - 3600 * 1000,
    endTime: Date.now() + 3600 * 1.5 * 1000
  }]),
      scheduleList = _useState2[0],
      setScheduleList = _useState2[1];

  var _useState3 = (0, _react.useState)(new Date().getTime()),
      scheduleDate = _useState3[0],
      setScheduleDate = _useState3[1];

  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _Example["default"].Example
  }, /*#__PURE__*/_react["default"].createElement(_2["default"], {
    initDay: scheduleDate,
    onSlideChange: function onSlideChange(currTimestamp, data) {
      setScheduleList(scheduleList.map(function (item) {
        if (item.id === data.id) {
          return (0, _extends2["default"])({}, item, {
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
      return /*#__PURE__*/_react["default"].createElement(ScheduleRender, {
        data: data,
        timestampRange: timestampRange
      });
    },
    businessRender: function businessRender(timestamp) {
      return /*#__PURE__*/_react["default"].createElement(BusinessRender, {
        timestamp: timestamp
      });
    }
  }));
};

root.render( /*#__PURE__*/_react["default"].createElement(_react["default"].StrictMode, null, /*#__PURE__*/_react["default"].createElement(Example, null)));
//# sourceMappingURL=Example.js.map