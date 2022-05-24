"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _index = _interopRequireDefault(require("./index.less"));

var _react = _interopRequireWildcard(require("react"));

var _utils = require("../../utils");

var _ScheduleItem = _interopRequireDefault(require("../ScheduleItem"));

var _MovingBaseLine = _interopRequireDefault(require("./components/MovingBaseLine"));

var _Container = require("../Container");

var _useAutoScroll = require("../../hooks/useAutoScroll");

var _TimeScale = _interopRequireDefault(require("./components/TimeScale"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var ScheduleContainer = function ScheduleContainer(_ref) {
  var scheduleRender = _ref.scheduleRender,
      data = _ref.data,
      rangeStartAndEndKey = _ref.rangeStartAndEndKey;

  var _useContext = (0, _react.useContext)(_Container.GlobalData),
      targetDay = _useContext.targetDay,
      height = _useContext.height; // 同步滚动高度使用


  var _useState = (0, _react.useState)(0),
      scrollHeight = _useState[0],
      setScrollHeight = _useState[1];

  var _useState2 = (0, _react.useState)([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 0]),
      HoursList = _useState2[0];

  var _useState3 = (0, _react.useState)([]),
      scheduleList = _useState3[0],
      setScheduleList = _useState3[1];

  var _useState4 = (0, _react.useState)(function () {
    return ((0, _moment["default"])(targetDay).hour() * 60 + (0, _moment["default"])(targetDay).minute()) / 2;
  }),
      currTimeLineHeight = _useState4[0],
      setCurrTimeLineHeight = _useState4[1];

  var _useState5 = (0, _react.useState)(0),
      containerWidth = _useState5[0],
      setContainerWidth = _useState5[1];

  var _useState6 = (0, _react.useState)(false),
      isMoving = _useState6[0],
      setIsMoving = _useState6[1];

  var _useState7 = (0, _react.useState)(0),
      movingTop = _useState7[0],
      setMovingTop = _useState7[1];

  (0, _react.useEffect)(function () {
    // 当前时间线计时器
    var timeLineTimeID = setInterval(function () {
      setCurrTimeLineHeight(calcCurrTimeLineHeight(new Date().getTime()));
    }, 1000);
    return function () {
      clearInterval(timeLineTimeID);
    };
  }, []);
  (0, _react.useEffect)(function () {
    var result = [];
    var todayTime = (0, _utils.getZeroTime)(targetDay);

    var _loop = function _loop(i) {
      result.push({
        timestampRange: [todayTime + i * 3600 * 1000, todayTime + (i + 1) * 3600 * 1000],
        dataItem: data == null ? void 0 : data.filter(function (item) {
          return item[rangeStartAndEndKey[0]] >= todayTime + i * 3600 * 1000 && item[rangeStartAndEndKey[0]] < todayTime + (i + 1) * 3600 * 1000;
        })
      });
    };

    for (var i = 0; i < HoursList.length; i++) {
      _loop(i);
    }

    setScheduleList(result);
  }, [data, targetDay]);
  (0, _useAutoScroll.useAutoScroll)(targetDay, height);
  (0, _react.useEffect)(function () {
    var containerList = document.getElementsByClassName("Calendar_ScheduleItem_container");

    if (containerList[0]) {
      var _containerList$;

      setContainerWidth((_containerList$ = containerList[0]) == null ? void 0 : _containerList$.clientWidth);
    } else {
      setContainerWidth(0);
    }
  }, [scheduleList, scheduleRender, targetDay]); // 日程组件Item

  var memo_ScheduleItem = (0, _react.useMemo)(function () {
    return /*#__PURE__*/_react["default"].createElement("div", {
      id: "Calendar_ScheduleContainer_inner",
      onScroll: function onScroll(e) {
        var _target;

        return setScrollHeight(-((_target = e.target) == null ? void 0 : _target.scrollTop));
      },
      className: _index["default"].Calendar_ScheduleContainer_inner
    }, scheduleList == null ? void 0 : scheduleList.map(function (item, index) {
      return /*#__PURE__*/_react["default"].createElement(_ScheduleItem["default"], {
        rangeStartAndEndKey: rangeStartAndEndKey,
        setMovingTop: setMovingTop,
        setIsMoving: setIsMoving,
        id: "" + item.timestampRange[0],
        width: containerWidth === 0 ? 0 : containerWidth + 4,
        key: index,
        dataItemLength: Math.max.apply(null, scheduleList == null ? void 0 : scheduleList.map(function (x) {
          var _x$dataItem;

          return x == null ? void 0 : (_x$dataItem = x.dataItem) == null ? void 0 : _x$dataItem.length;
        })),
        dataItem: item.dataItem,
        scheduleRender: scheduleRender,
        timestampRange: item.timestampRange
      });
    }));
  }, [scheduleList, scheduleRender, containerWidth]);

  var isShowCurrTimeLine = function isShowCurrTimeLine(params) {
    return (0, _utils.getZeroTime)(params) <= new Date().getTime() && new Date().getTime() < (0, _utils.getZeroTime)(params + 3600 * 24 * 1000);
  };

  var calcCurrTimeLineHeight = function calcCurrTimeLineHeight(params) {
    return ((0, _moment["default"])(params).hour() * 60 + (0, _moment["default"])(params).minute()) / 2;
  };

  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _index["default"].Calendar_ScheduleContainer_outer,
    style: {
      height: height - 155 + "px"
    }
  }, /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_TimeScale["default"], {
    HoursList: HoursList,
    scrollHeight: scrollHeight
  }), memo_ScheduleItem, /*#__PURE__*/_react["default"].createElement(_MovingBaseLine["default"], {
    movingTop: movingTop,
    scrollHeight: scrollHeight,
    color: "#1890ff",
    visibility: isMoving
  }), isShowCurrTimeLine(targetDay) && /*#__PURE__*/_react["default"].createElement("div", {
    className: _index["default"].Calendar_ScheduleContainer_currTimeLine,
    style: {
      top: currTimeLineHeight + scrollHeight + "px"
    }
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _index["default"].Calendar_ScheduleContainer_startPoint
  }))));
};

var _default = ScheduleContainer;
exports["default"] = _default;
//# sourceMappingURL=index.js.map