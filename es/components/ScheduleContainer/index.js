import moment from 'moment';
import style from "./index.less";
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { getZeroTime } from "../../utils";
import ScheduleItem from "../ScheduleItem";
import MovingBaseLine from "./components/MovingBaseLine";
import { GlobalData } from "../Container";
import { useAutoScroll } from "../../hooks/useAutoScroll";
import TimeScale from "./components/TimeScale";

var ScheduleContainer = function ScheduleContainer(_ref) {
  var scheduleRender = _ref.scheduleRender,
      data = _ref.data,
      rangeStartAndEndKey = _ref.rangeStartAndEndKey;

  var _useContext = useContext(GlobalData),
      targetDay = _useContext.targetDay,
      height = _useContext.height; // 同步滚动高度使用


  var _useState = useState(0),
      scrollHeight = _useState[0],
      setScrollHeight = _useState[1];

  var _useState2 = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 0]),
      HoursList = _useState2[0];

  var _useState3 = useState([]),
      scheduleList = _useState3[0],
      setScheduleList = _useState3[1];

  var _useState4 = useState(function () {
    return (moment(targetDay).hour() * 60 + moment(targetDay).minute()) / 2;
  }),
      currTimeLineHeight = _useState4[0],
      setCurrTimeLineHeight = _useState4[1];

  var _useState5 = useState(0),
      containerWidth = _useState5[0],
      setContainerWidth = _useState5[1];

  var _useState6 = useState(false),
      isMoving = _useState6[0],
      setIsMoving = _useState6[1];

  var _useState7 = useState(0),
      movingTop = _useState7[0],
      setMovingTop = _useState7[1];

  useEffect(function () {
    // 当前时间线计时器
    var timeLineTimeID = setInterval(function () {
      setCurrTimeLineHeight(calcCurrTimeLineHeight(new Date().getTime()));
    }, 1000);
    return function () {
      clearInterval(timeLineTimeID);
    };
  }, []);
  useEffect(function () {
    var result = [];
    var todayTime = getZeroTime(targetDay);

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
  useAutoScroll(targetDay, height);
  useEffect(function () {
    var containerList = document.getElementsByClassName("WT_Calendar_ScheduleItem_container");

    if (containerList[0]) {
      var _containerList$;

      setContainerWidth((_containerList$ = containerList[0]) == null ? void 0 : _containerList$.clientWidth);
    } else {
      setContainerWidth(0);
    }
  }, [scheduleList, scheduleRender, targetDay]); // 日程组件Item

  var memo_ScheduleItem = useMemo(function () {
    return /*#__PURE__*/React.createElement("div", {
      id: "WT_Calendar_ScheduleContainer_inner",
      onScroll: function onScroll(e) {
        var _target;

        return setScrollHeight(-((_target = e.target) == null ? void 0 : _target.scrollTop));
      },
      className: style.WT_Calendar_ScheduleContainer_inner
    }, scheduleList == null ? void 0 : scheduleList.map(function (item, index) {
      return /*#__PURE__*/React.createElement(ScheduleItem, {
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
    return getZeroTime(params) <= new Date().getTime() && new Date().getTime() < getZeroTime(params + 3600 * 24 * 1000);
  };

  var calcCurrTimeLineHeight = function calcCurrTimeLineHeight(params) {
    return (moment(params).hour() * 60 + moment(params).minute()) / 2;
  };

  return /*#__PURE__*/React.createElement("div", {
    className: style.WT_Calendar_ScheduleContainer_outer,
    style: {
      height: height - 155 + "px"
    }
  }, /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(TimeScale, {
    HoursList: HoursList,
    scrollHeight: scrollHeight
  }), memo_ScheduleItem, isMoving && /*#__PURE__*/React.createElement(MovingBaseLine, {
    movingTop: movingTop,
    scrollHeight: scrollHeight,
    color: "#1890ff"
  }), isShowCurrTimeLine(targetDay) && /*#__PURE__*/React.createElement("div", {
    className: style.WT_Calendar_ScheduleContainer_currTimeLine,
    style: {
      top: currTimeLineHeight + scrollHeight + "px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: style.WT_Calendar_ScheduleContainer_startPoint
  }))));
};

export default ScheduleContainer;
//# sourceMappingURL=index.js.map