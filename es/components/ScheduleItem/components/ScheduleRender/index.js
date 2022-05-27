import React, { useContext, useMemo, useRef } from "react";
import style from "../../index.less";
import { GlobalData } from "../../../Container";
import { addEvent, rmEvent } from "../../../../utils";
import moment from "moment";

/**
 * 24小时，每小时30像素，容器总高度 = 24小时 * 30像素
 * */
var TOTAL_HEIGHT = 24 * 30;

var ScheduleRender = function ScheduleRender(_ref) {
  var id = _ref.id,
      data = _ref.data,
      index = _ref.index,
      isShow = _ref.isShow,
      dataItem = _ref.dataItem,
      setIsMoving = _ref.setIsMoving,
      setMovingTop = _ref.setMovingTop,
      timestampRange = _ref.timestampRange,
      scheduleRender = _ref.scheduleRender,
      rangeStartAndEndKey = _ref.rangeStartAndEndKey;
  var isClick = false;
  var initMouseTop = 0;
  var initOffsetTop = 0;
  var dataIndex = null;
  var containerInitHeight = 0;
  var ref = useRef();
  var bottomLineRef = useRef();

  var _useContext = useContext(GlobalData),
      isDraggable = _useContext.isDraggable,
      targetDay = _useContext.targetDay,
      changeScheduleDataHandle = _useContext.changeScheduleDataHandle; // 计算日程容器top值


  var calcTop = useMemo(function () {
    return function (startTime) {
      return moment(startTime).minute() / 2;
    };
  }, []); // 计算日程容器height值

  var calcHeight = useMemo(function () {
    return function (timestampList) {
      return timestampList.length > 1 ? (timestampList[1] - timestampList[0]) / 1000 / 60 / 2 : 30;
    };
  }, []);

  var getHeightAttrNumber = function getHeightAttrNumber(height) {
    return +height.replace(/[^\d.-]/g, '');
  }; // 改变容器高度，鼠标移动事件


  var changeRangeMouseMove = function changeRangeMouseMove(ev) {
    addEvent({
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
  }; // 改变容器高度，鼠标抬起事件


  var changeRangeMouseUp = function changeRangeMouseUp() {
    var DomInstance = ref.current;

    if (DomInstance) {
      var currentTimeStamp = moment(moment(targetDay).format('YYYY-MM-DD') + " " + Math.floor(DomInstance.offsetTop / 30) + ":" + Math.floor(DomInstance.offsetTop / 30 * 60 % 60) + ":00").unix() * 1000;
      var containerHeight = getHeightAttrNumber(ref.current.style.height);
      changeScheduleDataHandle([currentTimeStamp, currentTimeStamp + containerHeight * 2 * 60 * 1000], dataItem[dataIndex]);
      rmEvent({
        evType: 'mousemove',
        handle: changeRangeMouseMove
      });
      rmEvent({
        evType: 'mouseup',
        handle: changeRangeMouseUp
      });
      rmEvent({
        evType: 'mouseleave',
        handle: onMouseLeaveBodyHandle
      });
    }
  }; // 按下鼠标


  var mouseDownHandle = function mouseDownHandle(ev, index) {
    if (!isDraggable) return;
    ev.persist();
    dataIndex = index;
    initMouseTop = ev.clientY;
    setIsMoving(true);
    addEvent({
      evType: 'mousemove',
      handle: onMouseMove
    });
    addEvent({
      evType: 'mouseup',
      handle: mouseUpHandle
    });
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
        addEvent({
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
        var DATE = moment(targetDay).format('YYYY-MM-DD');
        var HOUR = Math.floor(DomInstance.offsetTop / 30);
        var MINUTES = Math.floor(DomInstance.offsetTop / 30 * 60 % 60);
        var SECONDS = Math.floor(DomInstance.offsetTop / 30 * 60 % 60 % 60);
        /**
         * currentTimeStamp后面的随机数：防止为改变值，但是已经开启绝对定位，导致无法触发render复原。
        * */

        var currentTimeStamp = moment(DATE + " " + HOUR + ":" + MINUTES + ":" + SECONDS).unix() * 1000 + Math.floor(Math.random() * 1000);
        var timeDiff = dataItem[dataIndex][rangeStartAndEndKey[1]] - dataItem[dataIndex][rangeStartAndEndKey[0]];
        changeScheduleDataHandle([currentTimeStamp, currentTimeStamp + timeDiff], dataItem[dataIndex]);
      }

      setIsMoving(false);
      rmEvent({
        evType: 'mousemove',
        handle: onMouseMove
      });
      rmEvent({
        evType: 'mouseup',
        handle: mouseUpHandle
      });
      rmEvent({
        evType: 'mouseleave',
        handle: onMouseLeaveBodyHandle
      });
    } catch (err) {
      console.log(err);
    }
  }; // 改变容器高度，鼠标抬起事件


  var changeRangeHandle = function changeRangeHandle(ev, data, index) {
    ev.stopPropagation();
    dataIndex = index;
    initMouseTop = ev.clientY;
    containerInitHeight = getHeightAttrNumber(ref.current.style.height);
    addEvent({
      evType: 'mousemove',
      handle: changeRangeMouseMove
    });
    addEvent({
      evType: 'mouseup',
      handle: changeRangeMouseUp
    });
  };

  var onMouseLeaveBodyHandle = function onMouseLeaveBodyHandle(ev) {
    ev.stopPropagation();
    changeRangeMouseUp();
    mouseUpHandle();
  };

  return /*#__PURE__*/React.createElement("div", null, isShow && /*#__PURE__*/React.createElement("div", {
    ref: ref,
    key: "" + data[rangeStartAndEndKey[0]] + index,
    id: "" + data[rangeStartAndEndKey[0]] + index,
    onMouseDown: function onMouseDown(ev) {
      return mouseDownHandle(ev, index);
    },
    className: "" + style.Calendar_ScheduleItem_container,
    style: {
      height: (calcHeight([data[rangeStartAndEndKey[0]], data[rangeStartAndEndKey[1]]]) || 30) + "px",
      top: calcTop(data[rangeStartAndEndKey[0]])
    }
  }, scheduleRender && scheduleRender({
    data: data,
    timestampRange: timestampRange
  }), /*#__PURE__*/React.createElement("div", {
    ref: bottomLineRef,
    onMouseDown: function onMouseDown(ev) {
      changeRangeHandle(ev, data, index);
    },
    onMouseUp: changeRangeMouseUp,
    className: style.Calendar_ScheduleItem_bottomLine
  })));
};

export default ScheduleRender;
//# sourceMappingURL=index.js.map