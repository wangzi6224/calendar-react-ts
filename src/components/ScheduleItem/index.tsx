import React, {Fragment, useMemo} from 'react';
import style from './index.less';
import type {dataType, ScheduleItemType} from '@/data.d';
import ScheduleRender from "@/components/ScheduleItem/components/ScheduleRender";

const ScheduleItem: React.FC<ScheduleItemType> = ({
  id,
  width,
  dataItem,
  setIsMoving,
  setMovingTop,
  scheduleRender,
  dataItemLength,
  timestampRange,
  rangeStartAndEndKey,
}) => {
  // 计算 ScheduleItem 宽度
  const calcWidth: (w: number, d: number) => string = useMemo(() => {
    return (w, d) =>
      width === 0 || dataItemLength * width < 347 ? '100%' : `${d * w}px`
  }, []);

  const timeRangeShow = (params: dataType):boolean => (
    params[rangeStartAndEndKey[0]] >= timestampRange[0] &&
    params[rangeStartAndEndKey[0]] < timestampRange[1]
  );

  return (
    <div id={id} className={style.Calendar_ScheduleItem_Fath}>
      <div
        className={style.Calendar_ScheduleItem}
        style={{ width: calcWidth(width, dataItemLength) }}
      >
        {dataItem?.map((data, index) => {
          return (
              <ScheduleRender
                key={`${data[rangeStartAndEndKey[0]]}${index}`}
                id={id}
                data={data}
                index={index}
                width={width}
                dataItem={dataItem}
                setIsMoving={setIsMoving}
                setMovingTop={setMovingTop}
                isShow={timeRangeShow(data)}
                scheduleRender={scheduleRender}
                dataItemLength={dataItemLength}
                timestampRange={timestampRange}
                rangeStartAndEndKey={rangeStartAndEndKey}
              />
          );
        })}
      </div>
    </div>
  );
};

export default ScheduleItem;
