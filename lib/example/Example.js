"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireWildcard(require("react"));

var _client = require("react-dom/client");

var _Example = _interopRequireDefault(require("./Example.less"));

var _ = _interopRequireDefault(require("./.."));

var _BusinessRender = _interopRequireDefault(require("./components/BusinessRender"));

var _ScheduleRender = _interopRequireDefault(require("./components/ScheduleRender"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var container = document.getElementById('root');
var root = (0, _client.createRoot)(container);
var initialList = [{
  id: 1,
  startTime: Date.now() - 3600 * 1000,
  endTime: Date.now() + 3600 * 1000
}];

var Example = function Example() {
  var _useState = (0, _react.useState)(initialList),
      scheduleList = _useState[0],
      setScheduleList = _useState[1];

  var _useState2 = (0, _react.useState)(new Date().getTime()),
      scheduleDate = _useState2[0],
      setScheduleDate = _useState2[1];

  var slideChangeHandle = function slideChangeHandle(currTimestamp, data) {
    setScheduleList(scheduleList.map(function (item) {
      if (item.id === data.id) {
        return (0, _extends2["default"])({}, item, {
          startTime: currTimestamp[0],
          endTime: currTimestamp[1]
        });
      }

      return item;
    }));
  };

  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _Example["default"].Example
  }, /*#__PURE__*/_react["default"].createElement(_["default"], {
    initDay: scheduleDate,
    onSlideChange: slideChangeHandle,
    isDraggable: true,
    data: scheduleList,
    mode: 'week',
    onChange: setScheduleDate,
    scheduleRender: function scheduleRender(_ref) {
      var data = _ref.data,
          timestampRange = _ref.timestampRange;
      return /*#__PURE__*/_react["default"].createElement(_ScheduleRender["default"], {
        data: data,
        timestampRange: timestampRange
      });
    },
    businessRender: function businessRender(timestamp) {
      return /*#__PURE__*/_react["default"].createElement(_BusinessRender["default"], {
        timestamp: timestamp
      });
    }
  }));
};

root.render( /*#__PURE__*/_react["default"].createElement(_react["default"].StrictMode, null, /*#__PURE__*/_react["default"].createElement(Example, null)));
//# sourceMappingURL=Example.js.map