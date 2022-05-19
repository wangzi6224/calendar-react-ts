import React, {createContext, useState} from 'react';
import style from './index.less';
import ScheduleCantainer from '@/components/ScheduleCantainer';
import CalendarHeader from '@/components/CalendarHeader';
import type { ContainerType } from '@/data.d';

export const GlobalData = createContext<{
  targetDay: number;
  switchWeekendDay: 'day' | 'week';
  setTargetDay: (timestamp: number) => void;
  setSwitchWeekendDay: React.Dispatch<'day' | 'week'>;
  height: number;
  isDraggable: boolean
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
  const [targetDay, setTargetDay] = useState<any>(initDay);
  // 切换日和周
  const [switchWeekendDay, setSwitchWeekendDay] = useState<'day' | 'week'>(mode);

  const setTargetDayHandle = timestamp => {
    onChange(timestamp);
    setTargetDay(timestamp);
  }

  return (
    <GlobalData.Provider value={{
      isDraggable,
      height,
      targetDay,
      switchWeekendDay,
      setSwitchWeekendDay,
      setTargetDay: setTargetDayHandle
    }}>
      <div className={style.WT_Calendar_Container}>
        <CalendarHeader businessRender={businessRender}/>
        <ScheduleCantainer
          data={data}
          onSlideChange={onSlideChange}
          scheduleRender={scheduleRender}
          rangeStartAndEndKey={rangeStartAndEndKey}
        />
      </div>
    </GlobalData.Provider>
  );
};

export default Container;
