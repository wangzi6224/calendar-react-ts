import React, {Fragment, useContext, useMemo, useRef} from 'react';
import style from './index.less';
import moment from 'moment';
import type {dataType, ScheduleItemType} from '@/data.d';
import {GlobalData} from "@/components/Container";
import {addEvent, rmEvent} from "@/utils";

let isClick = false;
let initMouseTop = 0;
let initOffsetTop = 0;
let dataIndex: number = null;
let timeId = null;
let containerInitHeight = 0;

const ScheduleItem: React.FC<ScheduleItemType> = ({
  timestampRange,
  dataItem,
  scheduleRender,
  width,
  dataItemLength,
  id,
  setIsMoving,
  setMovingTop,
  rangeStartAndEndKey,
}) => {
  const {targetDay, isDraggable, changeScheduleDataHandle} = useContext(GlobalData);
  // 计算容器高度
  const calcHeight: (timestampList: [number, number]) => number = useMemo(() => {
    return (timestampList) => {
      return timestampList.length > 1 ? (timestampList[1] - timestampList[0]) / 1000 / 60 / 2 : 30
    }
  }, []);
  const calcTop: (startTime: number) => number = useMemo(() => {
    return (startTime) => moment(startTime).minute() / 2
  }, [])
  // 计算 ScheduleItem 宽度
  const calcWidth: (w: number, d: number) => string = useMemo(() => {
    return (w, d) =>
      width === 0 || dataItemLength * width < 347 ? '100%' : `${d * w}px`
  }, []);
  const ref = useRef<HTMLDivElement>();
  const bottomLineRef = useRef<HTMLDivElement>();

  // 按下鼠标
  const mouseDownHandle = (e, index) => {
    if (!isDraggable) return;
    e.persist();
    timeId = setTimeout(() => {
      dataIndex = index;
      const targetEle = ref.current;
      initMouseTop = e.clientY;
      targetEle.style.position = 'absolute';
      targetEle.style.top = `${document.getElementById(id).offsetTop + targetEle.offsetTop}px`;
      initOffsetTop = targetEle.offsetTop;
      isClick = true;
      setIsMoving(true);
      addEvent({evType:'mousemove', handle: onMouseMove});
      addEvent({evType: 'mouseup', handle: mouseUpHandle});
    }, 200);
  };

  // 移动鼠标
  const onMouseMove = (e) => {
    try {
      requestAnimationFrame(() => {
        if (isClick) {
          addEvent({evType: "mouseleave", handle: onMouseLeaveBodyHandle})
          const targetEle = ref.current;
          const currMouseOffset = e.clientY - initMouseTop;
          let topMoveValue = initOffsetTop + currMouseOffset;
          const LIMIT: boolean = topMoveValue + getHeightAttrNumber(targetEle.style.height) >= (30 * 24);
          if(LIMIT) {
            const MAX_PIXEL: number = (30 * 24) - getHeightAttrNumber(targetEle.style.height);
            targetEle.style.top = `${MAX_PIXEL}px`;
            setMovingTop(MAX_PIXEL);
            return
          }
          if(topMoveValue <= 0) {
            topMoveValue = 0;
          }
          targetEle.style.top = `${topMoveValue}px`;
          setMovingTop(topMoveValue);
        }
      })
    } catch (err) {
      console.log(err);
    }
  };

  const onMouseLeaveBodyHandle = (ev) => {
    ev.stopPropagation();
    mouseUpHandle();
    changeRangeMouseUp();
  }

  // 抬起鼠标
  const mouseUpHandle = () => {
    try {
      if (isClick) {
        setIsMoving(false);
        isClick = false;
        const targetEle = ref.current;
        const currentTimeStamp =
          moment(
            `${moment(targetDay).format('YYYY-MM-DD')} ${Math.floor(
              targetEle.offsetTop / 30,
            )}:${Math.floor(((targetEle.offsetTop / 30) * 60) % 60)}:00`,
          ).unix() * 1000;
        const timeDiff =
          dataItem[dataIndex][rangeStartAndEndKey[1]] - dataItem[dataIndex][rangeStartAndEndKey[0]];
        changeScheduleDataHandle([currentTimeStamp, currentTimeStamp + timeDiff], dataItem[dataIndex]);
      }
      rmEvent({evType: 'mousemove', handle: onMouseMove});
      rmEvent({evType: 'mouseup', handle: mouseUpHandle});
      rmEvent({evType: 'mouseleave', handle: onMouseLeaveBodyHandle});
    } catch (err) {
      console.log(err);
    }
  };

  const timeRangeShow = (params: dataType):boolean => (
    params[rangeStartAndEndKey[0]] >= timestampRange[0] &&
    params[rangeStartAndEndKey[0]] < timestampRange[1]
  );

  const changeRangeMouseMove = (ev) => {
    requestAnimationFrame(() => {
      addEvent({
        evType: "mouseleave", handle: onMouseLeaveBodyHandle
      });
      const targetEle = ref.current;
      const currMouseOffset = ev.clientY - initMouseTop;
      let __resultHeight__ = containerInitHeight + currMouseOffset;

      const MIN_HEIGHT = 15;
      const MAX_HEIGHT = 30 * 24 - targetEle.offsetTop;
      const MIN_LIMIT = __resultHeight__ <= MIN_HEIGHT;
      const MAX_LIMIT = (targetEle.offsetTop + __resultHeight__) >= 30 * 24;

      if(MAX_LIMIT) {
        targetEle.style.height = `${MAX_HEIGHT}px`;
        return;
      }

      if(MIN_LIMIT) {
        targetEle.style.height = `${MIN_HEIGHT}px`;
        return;
      }

      targetEle.style.height = `${__resultHeight__}px`;
    })
  };

  const getHeightAttrNumber = (height: string): number => {
    return +height.replace(/[^\d.-]/g, '')
  };

  const changeRangeHandle = (ev, data, index) => {
    ev.stopPropagation();
    dataIndex = index;
    initMouseTop = ev.clientY;
    containerInitHeight = getHeightAttrNumber(ref.current.style.height);
    addEvent({evType: 'mousemove', handle: changeRangeMouseMove});
    addEvent({evType: 'mouseup', handle: changeRangeMouseUp});
  }

  const changeRangeMouseUp = () => {
    const targetEle = ref.current;
    const currentTimeStamp =
      moment(
        `${moment(targetDay).format('YYYY-MM-DD')} ${Math.floor(
          targetEle.offsetTop / 30,
        )}:${Math.floor(((targetEle.offsetTop / 30) * 60) % 60)}:00`,
      ).unix() * 1000;
    const containerHeight = getHeightAttrNumber(ref.current.style.height);
    changeScheduleDataHandle([currentTimeStamp, currentTimeStamp + containerHeight * 2 * 60 * 1000], dataItem[dataIndex]);
    rmEvent({evType: 'mousemove', handle: changeRangeMouseMove});
    rmEvent({evType: 'mouseup', handle: changeRangeMouseUp});
    rmEvent({evType: 'mouseleave', handle: onMouseLeaveBodyHandle});
  }

  return (
    <div id={id} className={style.WT_Calendar_ScheduleItem_Fath}>
      <div
        className={style.WT_Calendar_ScheduleItem}
        style={{ width: calcWidth(width, dataItemLength) }}
      >
        {dataItem?.map((data, index) => {
          return (
            <Fragment key={`${data[rangeStartAndEndKey[0]]}${index}`}>
              {timeRangeShow(data) && (
                  <div
                    ref={ref}
                    key={`${data[rangeStartAndEndKey[0]]}${index}`}
                    id={`${data[rangeStartAndEndKey[0]]}${index}`}
                    onMouseDown={(ev) => mouseDownHandle(ev, index)}
                    onMouseUp={() => {
                      if(isDraggable) {
                        clearTimeout(timeId);
                      }
                    }}
                    className={`${style.WT_Calendar_ScheduleItem_container}`}
                    style={{
                      height: `${
                        calcHeight([data[rangeStartAndEndKey[0]], data[rangeStartAndEndKey[1]]]) ||
                        30
                      }px`,
                      top: calcTop(data[rangeStartAndEndKey[0]]),
                    }}
                  >
                    {scheduleRender({ data, timestampRange })}
                    <div
                      ref={bottomLineRef}
                      onMouseDown={(ev) => {
                        changeRangeHandle(ev, data, index)
                      }}
                      onMouseUp={changeRangeMouseUp}
                      className={style.WT_Calendar_ScheduleItem_bottomLine}
                    />
                  </div>
                )}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default ScheduleItem;
