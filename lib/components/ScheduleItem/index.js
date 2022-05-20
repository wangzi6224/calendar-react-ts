"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _index = _interopRequireDefault(require("./index.less"));

var _moment = _interopRequireDefault(require("moment"));

var _Container = require("../Container");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var isClick = false;
var initMouseTop = 0;
var initOffsetTop = 0;
var dataIndex = null;
var timeId = null;

var ScheduleItem = function ScheduleItem(_ref) {
  var timestampRange = _ref.timestampRange,
      dataItem = _ref.dataItem,
      scheduleRender = _ref.scheduleRender,
      width = _ref.width,
      dataItemLength = _ref.dataItemLength,
      id = _ref.id,
      onSlideChange = _ref.onSlideChange,
      setIsMoving = _ref.setIsMoving,
      setMovingTop = _ref.setMovingTop,
      rangeStartAndEndKey = _ref.rangeStartAndEndKey;

  var _useContext = (0, _react.useContext)(_Container.GlobalData),
      targetDay = _useContext.targetDay,
      isDraggable = _useContext.isDraggable; // 计算容器高度


  var calcHeight = function calcHeight(timestampList) {
    return timestampList.length > 1 ? (timestampList[1] - timestampList[0]) / 1000 / 60 / 2 : 30;
  };

  var calcTop = function calcTop(startTime) {
    return (0, _moment["default"])(startTime).minute() / 2;
  }; // 计算 ScheduleItem 宽度


  var calcWidth = function calcWidth(w, d) {
    return width === 0 || dataItemLength * width < 347 ? '100%' : d * w + "px";
  };

  var ref = (0, _react.useRef)();

  var _onMouseDown = function onMouseDown(e) {
    var targetEle = ref.current;
    initMouseTop = e.clientY;
    targetEle.style.position = 'absolute';
    targetEle.style.top = document.getElementById(id).offsetTop + targetEle.offsetTop + "px";
    initOffsetTop = targetEle.offsetTop;
    isClick = true;
    setIsMoving(true);
    document.body.addEventListener('mousemove', onMouseMove);
    document.body.addEventListener('mouseup', onMouseUp);
  };

  var onMouseMove = function onMouseMove(e) {
    try {
      if (isClick) {
        var targetEle = ref.current;
        var currMouseOffset = e.clientY - initMouseTop;
        targetEle.style.top = (initOffsetTop + currMouseOffset <= 0 ? 0 : initOffsetTop + currMouseOffset) + "px";
        setMovingTop(initOffsetTop + currMouseOffset === 0 ? 0 : initOffsetTop + currMouseOffset);
      }
    } catch (err) {
      console.log(err);
    }
  };

  var onMouseUp = function onMouseUp() {
    try {
      if (isClick) {
        setIsMoving(false);
        isClick = false;
        var targetEle = ref.current;
        var currentTimeStamp = (0, _moment["default"])((0, _moment["default"])(targetDay).format('YYYY-MM-DD') + " " + Math.floor(targetEle.offsetTop / 30) + ":" + Math.floor(targetEle.offsetTop / 30 * 60 % 60) + ":00").unix() * 1000;
        var timeDiff = dataItem[dataIndex][rangeStartAndEndKey[1]] - dataItem[dataIndex][rangeStartAndEndKey[0]];
        onSlideChange([currentTimeStamp, currentTimeStamp + timeDiff], dataItem[dataIndex]);
      }

      document.body.removeEventListener('mousemove', onMouseMove);
      document.body.removeEventListener('mouseup', onMouseUp);
    } catch (err) {
      console.log(err);
    }
  };

  return /*#__PURE__*/_react["default"].createElement("div", {
    id: id,
    className: _index["default"].WT_Calendar_ScheduleItem_Fath
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _index["default"].WT_Calendar_ScheduleItem,
    style: {
      width: calcWidth(width, dataItemLength)
    }
  }, dataItem == null ? void 0 : dataItem.map(function (data, index) {
    return /*#__PURE__*/_react["default"].createElement(_react.Fragment, {
      key: "" + data[rangeStartAndEndKey[0]] + index
    }, data[rangeStartAndEndKey[0]] >= timestampRange[0] && data[rangeStartAndEndKey[0]] < timestampRange[1] && /*#__PURE__*/_react["default"].createElement("div", {
      ref: ref,
      key: "" + data[rangeStartAndEndKey[0]] + index,
      id: "" + data[rangeStartAndEndKey[0]] + index,
      onMouseDown: function onMouseDown(e) {
        if (!isDraggable) return;
        e.persist();
        timeId = setTimeout(function () {
          dataIndex = index;

          _onMouseDown(e);
        }, 200);
      },
      onMouseUp: function onMouseUp() {
        if (!isDraggable) return;
        clearTimeout(timeId);
      },
      className: _index["default"].WT_Calendar_ScheduleItem_container + " WT_Calendar_ScheduleItem_container",
      style: {
        height: (calcHeight([data[rangeStartAndEndKey[0]], data[rangeStartAndEndKey[1]]]) || 30) + "px",
        top: calcTop(data[rangeStartAndEndKey[0]])
      }
    }, scheduleRender({
      data: data,
      timestampRange: timestampRange
    })));
  })));
};

var _default = ScheduleItem;
exports["default"] = _default;
//# sourceMappingURL=index.js.map