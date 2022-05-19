import React, {Fragment, useContext, useRef} from 'react';
import style from './index.less';
import moment from 'moment';
import type { ScheduleItemType } from '@/data.d';
import {GlobalData} from "@/components/Container";

let isClick = false;
let initMouseTop = 0;
let initOffsetTop = 0;
let dataIndex: number = null;
let timeId = null;

const ScheduleItem: React.FC<ScheduleItemType> = ({
  timestampRange,
  dataItem,
  scheduleRender,
  width,
  dataItemLength,
  id,
  onSlideChange,
  setIsMoving,
  setMovingTop,
  rangeStartAndEndKey,
}) => {
  const {targetDay, isDraggable} = useContext(GlobalData);
  // 计算容器高度
  const calcHeight: (timestampList: [number, number]) => number = (timestampList) =>
    timestampList.length > 1 ? (timestampList[1] - timestampList[0]) / 1000 / 60 / 2 : 30;
  const calcTop: (startTime: number) => number = (startTime) => moment(startTime).minute() / 2;
  // 计算 ScheduleItem 宽度
  const calcWidth: (w: number, d: number) => string = (w, d) =>
    width === 0 || dataItemLength * width < 347 ? '100%' : `${d * w}px`;
  const ref = useRef<HTMLDivElement>();

  const onMouseDown = (e) => {
    const targetEle = ref.current;
    initMouseTop = e.clientY;
    targetEle.style.position = 'absolute';
    targetEle.style.top = `${document.getElementById(id).offsetTop + targetEle.offsetTop}px`;
    initOffsetTop = targetEle.offsetTop;
    isClick = true;
    setIsMoving(true);
    document.body.addEventListener('mousemove', onMouseMove);
    document.body.addEventListener('mouseup', onMouseUp);
  };

  const onMouseMove = (e) => {
    try {
      if (isClick) {
        const targetEle = ref.current;
        const currMouseOffset = e.clientY - initMouseTop;
        targetEle.style.top = `${
          initOffsetTop + currMouseOffset <= 0 ? 0 : initOffsetTop + currMouseOffset
        }px`;
        setMovingTop(initOffsetTop + currMouseOffset === 0 ? 0 : initOffsetTop + currMouseOffset);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onMouseUp = () => {
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
        onSlideChange([currentTimeStamp, currentTimeStamp + timeDiff], dataItem[dataIndex]);
      }
      document.body.removeEventListener('mousemove', onMouseMove);
      document.body.removeEventListener('mouseup', onMouseUp);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div id={id} className={style.WT_Calendar_ScheduleItem_Fath}>
      <div
        className={style.WT_Calendar_ScheduleItem}
        style={{ width: calcWidth(width, dataItemLength) }}
      >
        {dataItem?.map((data, index) => {
          return (
            <Fragment key={`${data[rangeStartAndEndKey[0]]}${index}`}>
              {data[rangeStartAndEndKey[0]] >= timestampRange[0] &&
                data[rangeStartAndEndKey[0]] < timestampRange[1] && (
                  <div
                    ref={ref}
                    key={`${data[rangeStartAndEndKey[0]]}${index}`}
                    id={`${data[rangeStartAndEndKey[0]]}${index}`}
                    onMouseDown={(e) => {
                      if (!isDraggable) return;
                      e.persist();
                      timeId = setTimeout(() => {
                        dataIndex = index;
                        onMouseDown(e);
                      }, 200);
                    }}
                    onMouseUp={() => {
                      if (!isDraggable) return;
                      clearTimeout(timeId);
                    }}
                    className={`${style.WT_Calendar_ScheduleItem_container} WT_Calendar_ScheduleItem_container`}
                    style={{
                      height: `${
                        calcHeight([data[rangeStartAndEndKey[0]], data[rangeStartAndEndKey[1]]]) ||
                        30
                      }px`,
                      top: calcTop(data[rangeStartAndEndKey[0]]),
                    }}
                  >
                    {scheduleRender({ data, timestampRange })}
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
