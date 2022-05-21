import React, { Fragment, useContext, useRef } from 'react';
import style from "./index.less";
import moment from 'moment';
import { GlobalData } from "../Container";
var isClick = false;
var initMouseTop = 0;
var initOffsetTop = 0;
var dataIndex = null;
var timeId = null;
var containerInitHeight = 0;

var ScheduleItem = function ScheduleItem(_ref) {
  var timestampRange = _ref.timestampRange,
      dataItem = _ref.dataItem,
      scheduleRender = _ref.scheduleRender,
      width = _ref.width,
      dataItemLength = _ref.dataItemLength,
      id = _ref.id,
      setIsMoving = _ref.setIsMoving,
      setMovingTop = _ref.setMovingTop,
      rangeStartAndEndKey = _ref.rangeStartAndEndKey;

  var _useContext = useContext(GlobalData),
      targetDay = _useContext.targetDay,
      isDraggable = _useContext.isDraggable,
      changeScheduleDataHandle = _useContext.changeScheduleDataHandle; // 计算容器高度


  var calcHeight = function calcHeight(timestampList) {
    return timestampList.length > 1 ? (timestampList[1] - timestampList[0]) / 1000 / 60 / 2 : 30;
  };

  var calcTop = function calcTop(startTime) {
    return moment(startTime).minute() / 2;
  }; // 计算 ScheduleItem 宽度


  var calcWidth = function calcWidth(w, d) {
    return width === 0 || dataItemLength * width < 347 ? '100%' : d * w + "px";
  };

  var ref = useRef(); // 按下鼠标

  var mouseDownHandle = function mouseDownHandle(e, index) {
    if (!isDraggable) return;
    e.persist();
    timeId = setTimeout(function () {
      dataIndex = index;
      var targetEle = ref.current;
      initMouseTop = e.clientY;
      targetEle.style.position = 'absolute';
      targetEle.style.top = document.getElementById(id).offsetTop + targetEle.offsetTop + "px";
      initOffsetTop = targetEle.offsetTop;
      isClick = true;
      setIsMoving(true);
      document.body.addEventListener('mousemove', onMouseMove);
      document.body.addEventListener('mouseup', mouseUpHandle);
    }, 200);
  }; // 移动鼠标


  var onMouseMove = function onMouseMove(e) {
    try {
      requestAnimationFrame(function () {
        if (isClick) {
          var targetEle = ref.current;
          var currMouseOffset = e.clientY - initMouseTop;
          targetEle.style.top = (initOffsetTop + currMouseOffset <= 0 ? 0 : initOffsetTop + currMouseOffset) + "px";
          setMovingTop(initOffsetTop + currMouseOffset === 0 ? 0 : initOffsetTop + currMouseOffset);
        }
      });
    } catch (err) {
      console.log(err);
    }
  }; // 抬起鼠标


  var mouseUpHandle = function mouseUpHandle() {
    try {
      if (isClick) {
        setIsMoving(false);
        isClick = false;
        var targetEle = ref.current;
        var currentTimeStamp = moment(moment(targetDay).format('YYYY-MM-DD') + " " + Math.floor(targetEle.offsetTop / 30) + ":" + Math.floor(targetEle.offsetTop / 30 * 60 % 60) + ":00").unix() * 1000;
        var timeDiff = dataItem[dataIndex][rangeStartAndEndKey[1]] - dataItem[dataIndex][rangeStartAndEndKey[0]];
        changeScheduleDataHandle([currentTimeStamp, currentTimeStamp + timeDiff], dataItem[dataIndex]);
      }

      document.body.removeEventListener('mousemove', onMouseMove);
      document.body.removeEventListener('mouseup', mouseUpHandle);
    } catch (err) {
      console.log(err);
    }
  };

  var timeRangeShow = function timeRangeShow(params) {
    return params[rangeStartAndEndKey[0]] >= timestampRange[0] && params[rangeStartAndEndKey[0]] < timestampRange[1];
  };

  var changeRangeMouseMove = function changeRangeMouseMove(ev) {
    requestAnimationFrame(function () {
      var currMouseOffset = ev.clientY - initMouseTop;
      ref.current.style.height = containerInitHeight + currMouseOffset + "px";
    });
  };

  var getHeightAttrNumber = function getHeightAttrNumber(height) {
    return +height.replace(/[^\d.-]/g, '');
  };

  var rangeChangeHandle = function rangeChangeHandle(ev, data, index) {
    ev.stopPropagation();
    dataIndex = index;
    initMouseTop = ev.clientY;
    containerInitHeight = getHeightAttrNumber(ref.current.style.height);
    document.body.addEventListener('mousemove', changeRangeMouseMove);
    document.body.addEventListener('mouseup', rangeChangeMouseUp);
  };

  var rangeChangeMouseUp = function rangeChangeMouseUp() {
    var targetEle = ref.current;
    var currentTimeStamp = moment(moment(targetDay).format('YYYY-MM-DD') + " " + Math.floor(targetEle.offsetTop / 30) + ":" + Math.floor(targetEle.offsetTop / 30 * 60 % 60) + ":00").unix() * 1000;
    var containerHeight = getHeightAttrNumber(ref.current.style.height);
    changeScheduleDataHandle([currentTimeStamp, currentTimeStamp + containerHeight * 2 * 60 * 1000], dataItem[dataIndex]);
    document.body.removeEventListener('mousemove', changeRangeMouseMove);
    document.body.removeEventListener('mouseup', rangeChangeMouseUp);
  };

  return /*#__PURE__*/React.createElement("div", {
    id: id,
    className: style.WT_Calendar_ScheduleItem_Fath
  }, /*#__PURE__*/React.createElement("div", {
    className: style.WT_Calendar_ScheduleItem,
    style: {
      width: calcWidth(width, dataItemLength)
    }
  }, dataItem == null ? void 0 : dataItem.map(function (data, index) {
    return /*#__PURE__*/React.createElement(Fragment, {
      key: "" + data[rangeStartAndEndKey[0]] + index
    }, timeRangeShow(data) && /*#__PURE__*/React.createElement("div", {
      ref: ref,
      key: "" + data[rangeStartAndEndKey[0]] + index,
      id: "" + data[rangeStartAndEndKey[0]] + index,
      onMouseDown: function onMouseDown(ev) {
        return mouseDownHandle(ev, index);
      },
      onMouseUp: function onMouseUp() {
        if (isDraggable) {
          clearTimeout(timeId);
        }
      },
      className: "" + style.WT_Calendar_ScheduleItem_container,
      style: {
        height: (calcHeight([data[rangeStartAndEndKey[0]], data[rangeStartAndEndKey[1]]]) || 30) + "px",
        top: calcTop(data[rangeStartAndEndKey[0]])
      }
    }, scheduleRender({
      data: data,
      timestampRange: timestampRange
    }), /*#__PURE__*/React.createElement("div", {
      onMouseDown: function onMouseDown(ev) {
        rangeChangeHandle(ev, data, index);
      },
      onMouseUp: rangeChangeMouseUp,
      className: style.WT_Calendar_ScheduleItem_bottomLine
    })));
  })));
};

export default ScheduleItem;
//# sourceMappingURL=index.js.map