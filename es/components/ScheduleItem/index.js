import React, { Fragment, useContext, useRef } from 'react';
import style from './index.less';
import moment from 'moment';
import { GlobalData } from "@/components/Container";
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

  var _useContext = useContext(GlobalData),
      targetDay = _useContext.targetDay,
      isDraggable = _useContext.isDraggable; // 计算容器高度


  var calcHeight = function calcHeight(timestampList) {
    return timestampList.length > 1 ? (timestampList[1] - timestampList[0]) / 1000 / 60 / 2 : 30;
  };

  var calcTop = function calcTop(startTime) {
    return moment(startTime).minute() / 2;
  }; // 计算 ScheduleItem 宽度


  var calcWidth = function calcWidth(w, d) {
    return width === 0 || dataItemLength * width < 347 ? '100%' : d * w + "px";
  };

  var ref = useRef();

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
        var currentTimeStamp = moment(moment(targetDay).format('YYYY-MM-DD') + " " + Math.floor(targetEle.offsetTop / 30) + ":" + Math.floor(targetEle.offsetTop / 30 * 60 % 60) + ":00").unix() * 1000;
        var timeDiff = dataItem[dataIndex][rangeStartAndEndKey[1]] - dataItem[dataIndex][rangeStartAndEndKey[0]];
        onSlideChange([currentTimeStamp, currentTimeStamp + timeDiff], dataItem[dataIndex]);
      }

      document.body.removeEventListener('mousemove', onMouseMove);
      document.body.removeEventListener('mouseup', onMouseUp);
    } catch (err) {
      console.log(err);
    }
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
    }, data[rangeStartAndEndKey[0]] >= timestampRange[0] && data[rangeStartAndEndKey[0]] < timestampRange[1] && /*#__PURE__*/React.createElement("div", {
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
      className: style.WT_Calendar_ScheduleItem_container + " WT_Calendar_ScheduleItem_container",
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

export default ScheduleItem;
//# sourceMappingURL=index.js.map