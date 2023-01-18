import style from './index.less';
import React, {createContext, useEffect, useState} from 'react';
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
  itemColLevelDict: Map<string | number, number>
  renderItemWidth: number
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
  renderItemWidth
}) => {
  // 当前选择日期时间戳
  const [targetDay, setTargetDay] = useState<number>(initDay);
  // 日程数据
  const [scheduleData, setScheduleData] = useState<dataType[]>(data);
  // 切换日和周
  const [switchWeekendDay, setSwitchWeekendDay] = useState<'day' | 'week'>(mode);
  const itemColLevelDict = new Map<string | number, number>()

  useEffect(() => {
    if(data.length > new Set(data.map(item=>item.id)).size){
      throw new Error('Error: The "id" attribute cannot be repeat.')
    }
    for (const item of data) {
      if (!item?.id) {
        throw new Error('The id field is missing in data.')
      }
    }
    calcColLevel()
  }, [data, targetDay]);

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
    onSlideChange(currTimestamp, data)
  }
  const findNeighbor = (s: dataType, dp: (dataType | [])[], x: number) => {
    for (let i = x; i < dp.length; i++) {
      if (
        dp[i].find(j => s?.startTime >= j?.startTime && s?.startTime <= j?.endTime) ||
        dp[i].find(j => s?.endTime >= j?.startTime && s?.endTime <= j?.endTime) ||
        dp[i].find(j => s?.startTime <= j?.startTime && s?.endTime >= j?.endTime)
      ) {
        if (Array.isArray(dp[i + 1])) {
          findNeighbor(s, dp, i + 1)
          break
        } else {
          dp.push([])
          dp[i + 1].push({...s, col: i + 1})
          break
        }
      } else {
        dp[i].push({...s, col: i})
        break
      }
    }
  };

  const calcColLevel = () => {
    const dp: (dataType | [])[] = [[]];
    for (const s of data) {
      findNeighbor(s, dp, 0)
    }
    itemColLevelDict.clear();
    const result: dataType[] = dp.flat();
    result.forEach(i => itemColLevelDict.set(i.id, i.col))
  };

  return (
    <GlobalData.Provider value={{
      isDraggable,
      height,
      targetDay,
      switchWeekendDay,
      setSwitchWeekendDay,
      changeScheduleDataHandle,
      setTargetDay: setTargetDayHandle,
      itemColLevelDict,
      renderItemWidth
    }}>
      <div className={style.Calendar_Container}>
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
