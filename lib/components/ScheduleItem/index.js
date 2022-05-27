"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _index = _interopRequireDefault(require("./index.less"));

var _ScheduleRender = _interopRequireDefault(require("./components/ScheduleRender"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var ScheduleItem = function ScheduleItem(_ref) {
  var id = _ref.id,
      width = _ref.width,
      dataItem = _ref.dataItem,
      setIsMoving = _ref.setIsMoving,
      setMovingTop = _ref.setMovingTop,
      scheduleRender = _ref.scheduleRender,
      dataItemLength = _ref.dataItemLength,
      timestampRange = _ref.timestampRange,
      rangeStartAndEndKey = _ref.rangeStartAndEndKey;
  // 计算 ScheduleItem 宽度
  var calcWidth = (0, _react.useMemo)(function () {
    return function (w, d) {
      return width === 0 || dataItemLength * width < 347 ? '100%' : d * w + "px";
    };
  }, []);

  var timeRangeShow = function timeRangeShow(params) {
    return params[rangeStartAndEndKey[0]] >= timestampRange[0] && params[rangeStartAndEndKey[0]] < timestampRange[1];
  };

  return /*#__PURE__*/_react["default"].createElement("div", {
    id: id,
    className: _index["default"].Calendar_ScheduleItem_Fath
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _index["default"].Calendar_ScheduleItem,
    style: {
      width: calcWidth(width, dataItemLength)
    }
  }, dataItem == null ? void 0 : dataItem.map(function (data, index) {
    return /*#__PURE__*/_react["default"].createElement(_ScheduleRender["default"], {
      key: "" + data[rangeStartAndEndKey[0]] + index,
      id: id,
      data: data,
      index: index,
      dataItem: dataItem,
      setIsMoving: setIsMoving,
      setMovingTop: setMovingTop,
      isShow: timeRangeShow(data),
      scheduleRender: scheduleRender,
      timestampRange: timestampRange,
      rangeStartAndEndKey: rangeStartAndEndKey
    });
  })));
};

var _default = ScheduleItem;
exports["default"] = _default;
//# sourceMappingURL=index.js.map