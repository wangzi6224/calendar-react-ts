import moment from 'moment';
import style from './index.less';
import React, {useContext, useEffect, useMemo, useState} from 'react';
import { getDay, getMonth, getYear, getZeroTime } from '@/utils';
import ScheduleItem from '@/components/ScheduleItem';
import MovingBaseLine from '@/components/ScheduleCantainer/MovingBaseLine';
import type { ScheduleCantainerType, HourType, scheduleListType } from '@/data.d';
import {GlobalData} from "@/components/Container";

const ScheduleCantainer: React.FC<ScheduleCantainerType> = ({
  scheduleRender,
  data,
  onSlideChange,
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
  const [autoPositionTime] = useState(targetDay);

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
    const resule = [];
    const todayTime: number = getZeroTime(targetDay) as number;
    for (let i = 0; i < HoursList.length; i++) {
      resule.push({
        timestampRange: [todayTime + i * 3600 * 1000, todayTime + (i + 1) * 3600 * 1000],
        dataItem: data?.filter((item) => {
          return (
            item[rangeStartAndEndKey[0]] >= todayTime + i * 3600 * 1000 &&
            item[rangeStartAndEndKey[0]] < todayTime + (i + 1) * 3600 * 1000
          );
        }),
      });
    }
    const scrollTimeID: NodeJS.Timeout = autoPositonScrollHandle();
    setScheduleList(resule);
    return () => {
      clearTimeout(scrollTimeID);
    };
  }, [data, targetDay]);

  useEffect(() => {
    const containerList = document.getElementsByClassName(`WT_Calendar_ScheduleItem_container`);
    if (containerList[0]) {
      setContainerWidth(containerList[0]?.clientWidth);
    } else {
      setContainerWidth(0);
    }
  }, [scheduleList, scheduleRender, targetDay]);

  // 自动滚动到定位的日程
  const autoPositonScrollHandle: () => NodeJS.Timeout = () => {
    return setTimeout(() => {
      try {
        const scrollContainerEle = document.getElementById('WT_Calendar_ScheduleCantainer_inner');
        const PositionTime: number =
          moment(
            `${getYear(autoPositionTime)}/${getMonth(autoPositionTime)}/${getDay(
              autoPositionTime,
            )} ${moment(autoPositionTime).hour()}:00:00`,
          ).unix() * 1000;
        scrollContainerEle.scrollTop =
          document.getElementById(`${PositionTime}`)?.offsetTop - height / 3;
      } catch (err) {
        console.log('自动滚动报错---->', err);
      }
    }, 20);
  };

  // 日程组件Item
  const memo_ScheduleItem: JSX.Element = useMemo(
    () => (
      <div
        id="WT_Calendar_ScheduleCantainer_inner"
        onScroll={(e) => setScrollHeight(-(e as any).target?.scrollTop)}
        className={style.WT_Calendar_ScheduleCantainer_inner}
      >
        {scheduleList?.map((item, index) => (
          <ScheduleItem
            rangeStartAndEndKey={rangeStartAndEndKey}
            setMovingTop={setMovingTop}
            setIsMoving={setIsMoving}
            onSlideChange={onSlideChange}
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

  // 左侧时间刻度
  const memo_TimeScale: JSX.Element = useMemo(
    () => (
      <div
        className={style.WT_Calendar_scale}
        style={{ height: `${HoursList.length * 30}px`, top: scrollHeight }}
      >
        <div style={{ position: 'relative' }}>
          {HoursList.map((h, index) => (
            <div className={style.WT_Calendar_scale_item} key={index}>
              <span className={style.WT_Calendar_scale_text} style={{ top: index === 0 && -5 }}>
                {`${h < 10 ? `0${h}` : h}:00`}
              </span>
            </div>
          ))}
        </div>
      </div>
    ),
    [scrollHeight],
  );

  // 拖动时间基线
  const movingBaseLine: JSX.Element = useMemo(
    () => <MovingBaseLine movingTop={movingTop} scrollHeight={scrollHeight} isShow={isMoving} />,
    [movingTop, scrollHeight, isMoving],
  );

  const isShowCurrTimeLine: (params: number) => boolean = (params) =>
    getZeroTime(params) <= new Date().getTime() &&
    new Date().getTime() < getZeroTime(params + 3600 * 24 * 1000);

  const calcCurrTimeLineHeight: (params: number) => number = (params) =>
    (moment(params).hour() * 60 + moment(params).minute()) / 2;

  return (
    <div
      className={style.WT_Calendar_ScheduleCantainer_outer}
      style={{ height: `${height - 155}px` }}
    >
      <>
        {memo_TimeScale}
        {memo_ScheduleItem}
        {movingBaseLine}
        {isShowCurrTimeLine(targetDay) && (
          <div
            className={style.WT_Calendar_ScheduleCantainer_currTimeLine}
            style={{ top: `${currTimeLineHeight + scrollHeight}px` }}
          >
            <div className={style.WT_Calendar_ScheduleCantainer_startPoint} />
          </div>
        )}
      </>
    </div>
  );
};

export default ScheduleCantainer;
