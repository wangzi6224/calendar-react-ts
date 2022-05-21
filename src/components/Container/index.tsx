import style from './index.less';
import React, {createContext, useState} from 'react';
import CalendarHeader from '@/components/CalendarHeader';
import ScheduleContainer from '@/components/ScheduleContainer';
import type {ContainerType, dataType, timestampRange} from '@/data.d';

export const GlobalData = createContext<{
  targetDay: number;
  switchWeekendDay: 'day' | 'week';
  setTargetDay: (timestamp: number) => void;
  setSwitchWeekendDay: React.Dispatch<'day' | 'week'>;
  height: number;
  isDraggable: boolean;
  changeScheduleDataHandle: (currTimestamp: timestampRange, data: dataType) => void;
}>(null)

const Container: React.FC<ContainerType> = ({
  initDay,
  onChange,
  scheduleRender,
  businessRender,
  data,
  height = 560,
  mode = 'day',
  onSlideChange,
  isDraggable,
  rangeStartAndEndKey,
}) => {
  // 当前选择日期时间戳
  const [targetDay, setTargetDay] = useState<number>(initDay);
  // 日程数据
  const [scheduleData, setScheduleData] = useState<dataType[]>(data);
  // 切换日和周
  const [switchWeekendDay, setSwitchWeekendDay] = useState<'day' | 'week'>(mode);

  const setTargetDayHandle = timestamp => {
    onChange(timestamp);
    setTargetDay(timestamp);
  }

  const changeScheduleDataHandle = (currTimestamp: timestampRange, data: dataType) => {
    setScheduleData(
      scheduleData.map((item) => {
        if (item.id === data.id) {
          return {
            ...item,
            startTime: currTimestamp[0],
            endTime: currTimestamp[1],
          };
        }
        return item;
      }),
    );
  }

  return (
    <GlobalData.Provider value={{
      isDraggable,
      height,
      targetDay,
      switchWeekendDay,
      setSwitchWeekendDay,
      changeScheduleDataHandle,
      setTargetDay: setTargetDayHandle
    }}>
      <div className={style.WT_Calendar_Container}>
        <CalendarHeader businessRender={businessRender}/>
        <ScheduleContainer
          data={scheduleData}
          scheduleRender={scheduleRender}
          rangeStartAndEndKey={rangeStartAndEndKey}
        />
      </div>
    </GlobalData.Provider>
  );
};

export default Container;
