import React, {useContext, useEffect, useState} from 'react';
import style from './index.less';
import DailyOptions from '@/components/CalendarHeader/components/DailyOptions';
import WeeklyOptions from '@/components/CalendarHeader/components/WeeklyOptions';
import { weekDay } from '@/utils';
import type { WeekType, CalendarHeaderType } from '@/data.d';
import {GlobalData} from "@/components/Container";

const CalendarHeader: React.FC<CalendarHeaderType> = ({
  businessRender,
}) => {
  const {targetDay, setTargetDay, switchWeekendDay, setSwitchWeekendDay} = useContext(GlobalData);
  const [dateTextList, setDateTextList] = useState<WeekType | []>([]);
  const [currTime, setCurrTime] = useState<number>(targetDay);

  useEffect(() => {
    setDateTextList(calcWeekDayList(targetDay));
  }, [targetDay]);

  const calcWeekDayList: (params: number) => WeekType = (params) => {
    const result = [];
    for (let i = 1; i < weekDay(params); i++) {
      result.unshift(params - 3600 * 1000 * 24 * i);
    }
    for (let i = 0; i < 7 - weekDay(params) + 1; i++) {
      result.push(params + 3600 * 1000 * 24 * i);
    }
    return [...result] as WeekType;
  };

  const onChangeWeek: (type: 'prevWeek' | 'nextWeek', switchWay: 'week' | 'day') => void = (
    type,
    switchWay,
  ) => {
    if (switchWay === 'week') {
      const calcWeekTime =
        type === 'prevWeek' ? currTime - 3600 * 1000 * 24 * 7 : currTime + 3600 * 1000 * 24 * 7;
      setCurrTime(calcWeekTime);
      setDateTextList([...calcWeekDayList(calcWeekTime)]);
    }

    if (switchWay === 'day') {
      const calcWeekTime =
        type === 'prevWeek' ? targetDay - 3600 * 1000 * 24 : targetDay + 3600 * 1000 * 24;
      setCurrTime(calcWeekTime);
      setTargetDay(calcWeekTime);
    }
  };

  return (
    <div className={style.WT_Calendar_Header}>
      <DailyOptions
        setCurrTime={setCurrTime}
        dateTextList={dateTextList}
        setSwitchWeekendDay={(value) => {
          setSwitchWeekendDay(value);
          if (value === 'week') {
            setDateTextList(calcWeekDayList(targetDay));
          }
        }}
        onChangeWeek={(type) => onChangeWeek(type, switchWeekendDay)}
      />
      {switchWeekendDay === 'week' && (
        <WeeklyOptions
          dateTextList={dateTextList}
        />
      )}
      <div className={style.WT_Calendar_Header_Zone}>GMT+8</div>
      <div className={style.WT_Calendar_Header_businessRender}>
        {businessRender(targetDay)}
      </div>
    </div>
  );
};

export default CalendarHeader;
