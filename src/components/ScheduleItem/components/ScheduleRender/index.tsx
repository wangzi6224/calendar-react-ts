import React, {useContext, useMemo, useRef} from "react";
import style from "@/components/ScheduleItem/index.less";
import {GlobalData} from "@/components/Container";
import {addEvent, rmEvent} from "@/utils";
import moment from "moment";


/**
 * 24小时，每小时30像素，容器总高度 = 24小时 * 30像素
 * */
const TOTAL_HEIGHT: number = 24 * 30;

const ScheduleRender: React.FC<any> = ({
                                         id,
                                         isShow,
                                         data,
                                         dataItem,
                                         rangeStartAndEndKey,
                                         index,
                                         scheduleRender,
                                         timestampRange,
                                         setIsMoving,
                                         setMovingTop
}) => {
  let isClick = false;
  let initMouseTop = 0;
  let initOffsetTop = 0;
  let dataIndex: number = null;
  let containerInitHeight = 0;
  const ref = useRef<HTMLDivElement>();
  const bottomLineRef = useRef<HTMLDivElement>();
  const {isDraggable, targetDay, changeScheduleDataHandle} = useContext(GlobalData);

  // 计算日程容器top值
  const calcTop: (startTime: number) => number = useMemo(() => {
    return (startTime) => moment(startTime).minute() / 2
  }, []);

  // 计算日程容器height值
  const calcHeight: (timestampList: [number, number]) => number = useMemo(() => {
    return (timestampList) => {
      return timestampList.length > 1 ? (timestampList[1] - timestampList[0]) / 1000 / 60 / 2 : 30
    }
  }, []);

  const getHeightAttrNumber = (height: string): number => {
    return +height.replace(/[^\d.-]/g, '')
  };

  const changeRangeMouseMove = (ev) => {
      addEvent({
        evType: "mouseleave", handle: onMouseLeaveBodyHandle
      });
      const DomInstance = ref.current;
      const currMouseOffset = ev.clientY - initMouseTop;
      let __resultHeight__ = containerInitHeight + currMouseOffset;

      const MIN_HEIGHT = 15;
      const MAX_HEIGHT = TOTAL_HEIGHT - DomInstance.offsetTop;
      const MIN_LIMIT = __resultHeight__ <= MIN_HEIGHT;
      const MAX_LIMIT = (DomInstance.offsetTop + __resultHeight__) >= TOTAL_HEIGHT;

      if(MAX_LIMIT) {
        DomInstance.style.height = `${MAX_HEIGHT}px`;
        return;
      }

      if(MIN_LIMIT) {
        DomInstance.style.height = `${MIN_HEIGHT}px`;
        return;
      }

      DomInstance.style.height = `${__resultHeight__}px`;
  };

  const changeRangeMouseUp = () => {
    const DomInstance = ref.current;
    if(DomInstance) {
      const currentTimeStamp =
        moment(
          `${moment(targetDay).format('YYYY-MM-DD')} ${Math.floor(
            DomInstance.offsetTop / 30,
          )}:${Math.floor(((DomInstance.offsetTop / 30) * 60) % 60)}:00`,
        ).unix() * 1000;
      const containerHeight = getHeightAttrNumber(ref.current.style.height);
      changeScheduleDataHandle([currentTimeStamp, currentTimeStamp + containerHeight * 2 * 60 * 1000], dataItem[dataIndex]);
      rmEvent({evType: 'mousemove', handle: changeRangeMouseMove});
      rmEvent({evType: 'mouseup', handle: changeRangeMouseUp});
      rmEvent({evType: 'mouseleave', handle: onMouseLeaveBodyHandle});
    }
  };

  // 移动鼠标
  const onMouseMove = (ev) => {
    try {
        const DomInstance = ref.current;
        if(!isClick && DomInstance) {
          DomInstance.style.position = 'absolute';
          DomInstance.style.top = `${document.getElementById(id).offsetTop + DomInstance.offsetTop}px`;
          initOffsetTop = DomInstance.offsetTop;
        }
        isClick = true;
        if (isClick && DomInstance) {
          addEvent({evType: "mouseleave", handle: onMouseLeaveBodyHandle});
          const currMouseOffset = ev.clientY - initMouseTop;
          const CONTAINER_HEIGHT: number = getHeightAttrNumber(DomInstance.style.height);
          let topMoveValue = initOffsetTop + currMouseOffset;
          const MAX_MOVE_LIMIT: boolean = topMoveValue + CONTAINER_HEIGHT >= TOTAL_HEIGHT;

          if(MAX_MOVE_LIMIT) {
            const MAX_TOP_VALUE: number = TOTAL_HEIGHT - CONTAINER_HEIGHT;
            DomInstance.style.top = `${MAX_TOP_VALUE}px`;
            setMovingTop(MAX_TOP_VALUE);
            return
          }

          if(topMoveValue <= 0) {
            topMoveValue = 0;
          }

          DomInstance.style.top = `${topMoveValue}px`;
          setMovingTop(topMoveValue);
        }
    } catch (err) {
      console.log(err);
    }
  };

  // 抬起鼠标
  const mouseUpHandle = () => {
    try {
      const DomInstance = ref.current;
      if (isClick) {
        isClick = false;
        const DATE = moment(targetDay).format('YYYY-MM-DD');
        const HOUR = Math.floor(DomInstance.offsetTop / 30);
        const MINUTES = Math.floor(((DomInstance.offsetTop / 30) * 60) % 60);
        const SECONDS = Math.floor(((DomInstance.offsetTop / 30) * 60) % 60 % 60);
        const currentTimeStamp = (moment(`${DATE} ${HOUR}:${MINUTES}:${SECONDS}`).unix() * 1000) + Math.floor(Math.random() * 1000);
        const timeDiff = dataItem[dataIndex][rangeStartAndEndKey[1]] - dataItem[dataIndex][rangeStartAndEndKey[0]];
        changeScheduleDataHandle([currentTimeStamp, currentTimeStamp + timeDiff], dataItem[dataIndex]);
      }
      setIsMoving(false);
      rmEvent({evType: 'mousemove', handle: onMouseMove});
      rmEvent({evType: 'mouseup', handle: mouseUpHandle});
      rmEvent({evType: 'mouseleave', handle: onMouseLeaveBodyHandle});
    } catch (err) {
      console.log(err);
    }
  };

  // 按下鼠标
  const mouseDownHandle = (ev, index) => {
    if (!isDraggable) return;
    ev.persist();
    dataIndex = index;
    initMouseTop = ev.clientY;
    setIsMoving(true);
    addEvent({evType:'mousemove', handle: onMouseMove});
    addEvent({evType: 'mouseup', handle: mouseUpHandle});
  };

  const changeRangeHandle = (ev, data, index) => {
    ev.stopPropagation();
    dataIndex = index;
    initMouseTop = ev.clientY;
    containerInitHeight = getHeightAttrNumber(ref.current.style.height);
    addEvent({evType: 'mousemove', handle: changeRangeMouseMove});
    addEvent({evType: 'mouseup', handle: changeRangeMouseUp});
  };

  const onMouseLeaveBodyHandle = (ev) => {
    ev.stopPropagation();
    changeRangeMouseUp();
    mouseUpHandle();
  }

  return (
    <div>
      {isShow && (
        <div
          ref={ref}
          key={`${data[rangeStartAndEndKey[0]]}${index}`}
          id={`${data[rangeStartAndEndKey[0]]}${index}`}
          onMouseDown={(ev) => mouseDownHandle(ev, index)}
          className={`${style.Calendar_ScheduleItem_container}`}
          style={{
            height: `${calcHeight([data[rangeStartAndEndKey[0]], data[rangeStartAndEndKey[1]]]) || 30}px`,
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
            className={style.Calendar_ScheduleItem_bottomLine}
          />
        </div>
      )}
    </div>
  )
};

export default ScheduleRender;
