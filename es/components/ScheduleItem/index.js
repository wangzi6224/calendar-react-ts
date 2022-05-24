import React, { useMemo } from 'react';
import style from "./index.less";
import ScheduleRender from "./components/ScheduleRender";

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
  var calcWidth = useMemo(function () {
    return function (w, d) {
      return width === 0 || dataItemLength * width < 347 ? '100%' : d * w + "px";
    };
  }, []);

  var timeRangeShow = function timeRangeShow(params) {
    return params[rangeStartAndEndKey[0]] >= timestampRange[0] && params[rangeStartAndEndKey[0]] < timestampRange[1];
  };

  return /*#__PURE__*/React.createElement("div", {
    id: id,
    className: style.Calendar_ScheduleItem_Fath
  }, /*#__PURE__*/React.createElement("div", {
    className: style.Calendar_ScheduleItem,
    style: {
      width: calcWidth(width, dataItemLength)
    }
  }, dataItem == null ? void 0 : dataItem.map(function (data, index) {
    return /*#__PURE__*/React.createElement(ScheduleRender, {
      key: "" + data[rangeStartAndEndKey[0]] + index,
      id: id,
      data: data,
      index: index,
      width: width,
      dataItem: dataItem,
      setIsMoving: setIsMoving,
      setMovingTop: setMovingTop,
      isShow: timeRangeShow(data),
      scheduleRender: scheduleRender,
      dataItemLength: dataItemLength,
      timestampRange: timestampRange,
      rangeStartAndEndKey: rangeStartAndEndKey
    });
  })));
};

export default ScheduleItem;
//# sourceMappingURL=index.js.map