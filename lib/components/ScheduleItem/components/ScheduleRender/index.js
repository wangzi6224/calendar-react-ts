"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _index = _interopRequireDefault(require("../../index.less"));

var _Container = require("../../../Container");

var _utils = require("../../../../utils");

var _moment = _interopRequireDefault(require("moment"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * 24小时，每小时30像素，容器总高度 = 24小时 * 30像素
 * */
var TOTAL_HEIGHT = 24 * 30;

var ScheduleRender = function ScheduleRender(_ref) {
  var id = _ref.id,
      isShow = _ref.isShow,
      data = _ref.data,
      dataItem = _ref.dataItem,
      rangeStartAndEndKey = _ref.rangeStartAndEndKey,
      index = _ref.index,
      scheduleRender = _ref.scheduleRender,
      timestampRange = _ref.timestampRange,
      setIsMoving = _ref.setIsMoving,
      setMovingTop = _ref.setMovingTop;
  var isClick = false;
  var initMouseTop = 0;
  var initOffsetTop = 0;
  var dataIndex = null;
  var containerInitHeight = 0;
  var ref = (0, _react.useRef)();
  var bottomLineRef = (0, _react.useRef)();

  var _useContext = (0, _react.useContext)(_Container.GlobalData),
      isDraggable = _useContext.isDraggable,
      targetDay = _useContext.targetDay,
      changeScheduleDataHandle = _useContext.changeScheduleDataHandle; // 计算日程容器top值


  var calcTop = (0, _react.useMemo)(function () {
    return function (startTime) {
      return (0, _moment["default"])(startTime).minute() / 2;
    };
  }, []); // 计算日程容器height值

  var calcHeight = (0, _react.useMemo)(function () {
    return function (timestampList) {
      return timestampList.length > 1 ? (timestampList[1] - timestampList[0]) / 1000 / 60 / 2 : 30;
    };
  }, []);

  var getHeightAttrNumber = function getHeightAttrNumber(height) {
    return +height.replace(/[^\d.-]/g, '');
  };

  var changeRangeMouseMove = function changeRangeMouseMove(ev) {
    (0, _utils.addEvent)({
      evType: "mouseleave",
      handle: onMouseLeaveBodyHandle
    });
    var DomInstance = ref.current;
    var currMouseOffset = ev.clientY - initMouseTop;

    var __resultHeight__ = containerInitHeight + currMouseOffset;

    var MIN_HEIGHT = 15;
    var MAX_HEIGHT = TOTAL_HEIGHT - DomInstance.offsetTop;
    var MIN_LIMIT = __resultHeight__ <= MIN_HEIGHT;
    var MAX_LIMIT = DomInstance.offsetTop + __resultHeight__ >= TOTAL_HEIGHT;

    if (MAX_LIMIT) {
      DomInstance.style.height = MAX_HEIGHT + "px";
      return;
    }

    if (MIN_LIMIT) {
      DomInstance.style.height = MIN_HEIGHT + "px";
      return;
    }

    DomInstance.style.height = __resultHeight__ + "px";
  };

  var changeRangeMouseUp = function changeRangeMouseUp() {
    var DomInstance = ref.current;

    if (DomInstance) {
      var currentTimeStamp = (0, _moment["default"])((0, _moment["default"])(targetDay).format('YYYY-MM-DD') + " " + Math.floor(DomInstance.offsetTop / 30) + ":" + Math.floor(DomInstance.offsetTop / 30 * 60 % 60) + ":00").unix() * 1000;
      var containerHeight = getHeightAttrNumber(ref.current.style.height);
      changeScheduleDataHandle([currentTimeStamp, currentTimeStamp + containerHeight * 2 * 60 * 1000], dataItem[dataIndex]);
      (0, _utils.rmEvent)({
        evType: 'mousemove',
        handle: changeRangeMouseMove
      });
      (0, _utils.rmEvent)({
        evType: 'mouseup',
        handle: changeRangeMouseUp
      });
      (0, _utils.rmEvent)({
        evType: 'mouseleave',
        handle: onMouseLeaveBodyHandle
      });
    }
  }; // 移动鼠标


  var onMouseMove = function onMouseMove(ev) {
    try {
      var DomInstance = ref.current;

      if (!isClick && DomInstance) {
        DomInstance.style.position = 'absolute';
        DomInstance.style.top = document.getElementById(id).offsetTop + DomInstance.offsetTop + "px";
        initOffsetTop = DomInstance.offsetTop;
      }

      isClick = true;

      if (isClick && DomInstance) {
        (0, _utils.addEvent)({
          evType: "mouseleave",
          handle: onMouseLeaveBodyHandle
        });
        var currMouseOffset = ev.clientY - initMouseTop;
        var CONTAINER_HEIGHT = getHeightAttrNumber(DomInstance.style.height);
        var topMoveValue = initOffsetTop + currMouseOffset;
        var MAX_MOVE_LIMIT = topMoveValue + CONTAINER_HEIGHT >= TOTAL_HEIGHT;

        if (MAX_MOVE_LIMIT) {
          var MAX_TOP_VALUE = TOTAL_HEIGHT - CONTAINER_HEIGHT;
          DomInstance.style.top = MAX_TOP_VALUE + "px";
          setMovingTop(MAX_TOP_VALUE);
          return;
        }

        if (topMoveValue <= 0) {
          topMoveValue = 0;
        }

        DomInstance.style.top = topMoveValue + "px";
        setMovingTop(topMoveValue);
      }
    } catch (err) {
      console.log(err);
    }
  }; // 抬起鼠标


  var mouseUpHandle = function mouseUpHandle() {
    try {
      var DomInstance = ref.current;

      if (isClick) {
        isClick = false;
        var DATE = (0, _moment["default"])(targetDay).format('YYYY-MM-DD');
        var HOUR = Math.floor(DomInstance.offsetTop / 30);
        var MINUTES = Math.floor(DomInstance.offsetTop / 30 * 60 % 60);
        var SECONDS = Math.floor(DomInstance.offsetTop / 30 * 60 % 60 % 60);
        var currentTimeStamp = (0, _moment["default"])(DATE + " " + HOUR + ":" + MINUTES + ":" + SECONDS).unix() * 1000 + Math.floor(Math.random() * 1000);
        var timeDiff = dataItem[dataIndex][rangeStartAndEndKey[1]] - dataItem[dataIndex][rangeStartAndEndKey[0]];
        changeScheduleDataHandle([currentTimeStamp, currentTimeStamp + timeDiff], dataItem[dataIndex]);
      }

      setIsMoving(false);
      (0, _utils.rmEvent)({
        evType: 'mousemove',
        handle: onMouseMove
      });
      (0, _utils.rmEvent)({
        evType: 'mouseup',
        handle: mouseUpHandle
      });
      (0, _utils.rmEvent)({
        evType: 'mouseleave',
        handle: onMouseLeaveBodyHandle
      });
    } catch (err) {
      console.log(err);
    }
  }; // 按下鼠标


  var mouseDownHandle = function mouseDownHandle(ev, index) {
    if (!isDraggable) return;
    ev.persist();
    dataIndex = index;
    initMouseTop = ev.clientY;
    setIsMoving(true);
    (0, _utils.addEvent)({
      evType: 'mousemove',
      handle: onMouseMove
    });
    (0, _utils.addEvent)({
      evType: 'mouseup',
      handle: mouseUpHandle
    });
  };

  var changeRangeHandle = function changeRangeHandle(ev, data, index) {
    ev.stopPropagation();
    dataIndex = index;
    initMouseTop = ev.clientY;
    containerInitHeight = getHeightAttrNumber(ref.current.style.height);
    (0, _utils.addEvent)({
      evType: 'mousemove',
      handle: changeRangeMouseMove
    });
    (0, _utils.addEvent)({
      evType: 'mouseup',
      handle: changeRangeMouseUp
    });
  };

  var onMouseLeaveBodyHandle = function onMouseLeaveBodyHandle(ev) {
    ev.stopPropagation();
    changeRangeMouseUp();
    mouseUpHandle();
  };

  return /*#__PURE__*/_react["default"].createElement("div", null, isShow && /*#__PURE__*/_react["default"].createElement("div", {
    ref: ref,
    key: "" + data[rangeStartAndEndKey[0]] + index,
    id: "" + data[rangeStartAndEndKey[0]] + index,
    onMouseDown: function onMouseDown(ev) {
      return mouseDownHandle(ev, index);
    },
    className: "" + _index["default"].Calendar_ScheduleItem_container,
    style: {
      height: (calcHeight([data[rangeStartAndEndKey[0]], data[rangeStartAndEndKey[1]]]) || 30) + "px",
      top: calcTop(data[rangeStartAndEndKey[0]])
    }
  }, scheduleRender({
    data: data,
    timestampRange: timestampRange
  }), /*#__PURE__*/_react["default"].createElement("div", {
    ref: bottomLineRef,
    onMouseDown: function onMouseDown(ev) {
      changeRangeHandle(ev, data, index);
    },
    onMouseUp: changeRangeMouseUp,
    className: _index["default"].Calendar_ScheduleItem_bottomLine
  })));
};

var _default = ScheduleRender;
exports["default"] = _default;
//# sourceMappingURL=index.js.map