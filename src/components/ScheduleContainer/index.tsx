import moment from 'moment';
import style from './index.less';
import React, {useContext, useEffect, useMemo, useState} from 'react';
import { getDay, getMonth, getYear, getZeroTime } from '@/utils';
import ScheduleItem from '@/components/ScheduleItem';
import MovingBaseLine from '@/components/ScheduleContainer/components/MovingBaseLine';
import type { ScheduleContainerType, HourType, scheduleListType } from '@/data.d';
import {GlobalData} from "@/components/Container";
import {useAutoScroll} from "@/hooks/useAutoScroll";
import TimeScale from "@/components/ScheduleContainer/components/TimeScale";

const ScheduleContainer: React.FC<ScheduleContainerType> = ({
  scheduleRender,
  data,
  rangeStartAndEndKey,
}) => {
  const {targetDay, height} = useContext(GlobalData);
  // 同步滚动高度使用
  const [scrollHeight, setScrollHeight] = useState<number>(0);
  const [HoursList] = useState<HourType>([
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    0,
  ]);
  const [scheduleList, setScheduleList] = useState<scheduleListType[]>([]);
  const [currTimeLineHeight, setCurrTimeLineHeight] = useState<number>(
    () => (moment(targetDay).hour() * 60 + moment(targetDay).minute()) / 2,
  );
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [isMoving, setIsMoving] = useState<boolean>(false);
  const [movingTop, setMovingTop] = useState<number>(0);

  useEffect(() => {
    // 当前时间线计时器
    const timeLineTimeID = setInterval(() => {
      setCurrTimeLineHeight(calcCurrTimeLineHeight(new Date().getTime()));
    }, 1000);

    return () => {
      clearInterval(timeLineTimeID);
    };
  }, []);

  useEffect(() => {
    const result = [];
    const todayTime: number = getZeroTime(targetDay) as number;
    for (let i = 0; i < HoursList.length; i++) {
      result.push({
        timestampRange: [todayTime + i * 3600 * 1000, todayTime + (i + 1) * 3600 * 1000],
        dataItem: data?.filter((item) => {
          return (
            item[rangeStartAndEndKey[0]] >= todayTime + i * 3600 * 1000 &&
            item[rangeStartAndEndKey[0]] < todayTime + (i + 1) * 3600 * 1000
          );
        }),
      });
    }
    setScheduleList(result);
  }, [data, targetDay]);

  useAutoScroll(targetDay, height)

  useEffect(() => {
    const containerList = document.getElementsByClassName(`Calendar_ScheduleItem_container`);
    if (containerList[0]) {
      setContainerWidth(containerList[0]?.clientWidth);
    } else {
      setContainerWidth(0);
    }
  }, [scheduleList, scheduleRender, targetDay]);

  // 日程组件Item
  const memo_ScheduleItem: JSX.Element = useMemo(
    () => (
      <div
        id="Calendar_ScheduleContainer_inner"
        onScroll={(e) => setScrollHeight(-(e as any).target?.scrollTop)}
        className={style.Calendar_ScheduleContainer_inner}
      >
        {scheduleList?.map((item, index) => (
          <ScheduleItem
            rangeStartAndEndKey={rangeStartAndEndKey}
            setMovingTop={setMovingTop}
            setIsMoving={setIsMoving}
            id={`${item.timestampRange[0]}`}
            width={containerWidth === 0 ? 0 : containerWidth + 4}
            key={index}
            dataItemLength={Math.max.apply(
              null,
              scheduleList?.map((x) => x?.dataItem?.length),
            )}
            dataItem={item.dataItem}
            scheduleRender={scheduleRender}
            timestampRange={item.timestampRange}
          />
        ))}
      </div>
    ),
    [scheduleList, scheduleRender, containerWidth],
  );

  const isShowCurrTimeLine: (params: number) => boolean = (params) =>
    getZeroTime(params) <= new Date().getTime() &&
    new Date().getTime() < getZeroTime(params + 3600 * 24 * 1000);

  const calcCurrTimeLineHeight: (params: number) => number = (params) =>
    (moment(params).hour() * 60 + moment(params).minute()) / 2;

  return (
    <div
      className={style.Calendar_ScheduleContainer_outer}
      style={{ height: `${height - 155}px` }}
    >
      <>
        <TimeScale HoursList={HoursList} scrollHeight={scrollHeight}/>
        {memo_ScheduleItem}
        <MovingBaseLine movingTop={movingTop} scrollHeight={scrollHeight} color="#1890ff" visibility={isMoving} />
        {isShowCurrTimeLine(targetDay) && (
          <div
            className={style.Calendar_ScheduleContainer_currTimeLine}
            style={{ top: `${currTimeLineHeight + scrollHeight}px` }}
          >
            <div className={style.Calendar_ScheduleContainer_startPoint} />
          </div>
        )}
      </>
    </div>
  );
};

export default ScheduleContainer;
