import React, {useContext} from 'react';
import style from './index.less';
import { getDay, getMonth, getYear } from '@/utils';
import type { WeeklyOptionsType } from '@/data.d';
import {GlobalData} from "@/components/Container";

const WeeklyOptions: React.FC<WeeklyOptionsType> = ({ dateTextList }) => {
  const {targetDay, setTargetDay, switchWeekendDay} = useContext(GlobalData);

  return (
    <div className={style.WT_Calendar_WeeklyOptions}>
      {/* 星期写死, 平滑的切换日期, 就不用计算了 */}
      <div className={style.WT_Calendar_WeeklyOptions_weekText}>
        {['一', '二', '三', '四', '五', '六', '日'].map((w, index) => (
          <div className={style.WT_Calendar_WeeklyOptions_weekItem} key={index}>
            星期{w}
          </div>
        ))}
      </div>

      {/* 日期 */}
      <div className={style.WT_Calendar_WeeklyOptions_DateText}>
        {/* @ts-ignore */}
        {dateTextList.map((d, index) => {
          return (
            <div
              onClick={() => setTargetDay(d)}
              key={index}
              style={{
                color:
                  `${getYear(d)}-${getMonth(d)}-${getDay(d)}` ===
                    `${getYear(new Date().getTime())}-${getMonth(new Date().getTime())}-${getDay(
                      new Date().getTime(),
                    )}` && 'red',
              }}
              className={`${style.WT_Calendar_WeeklyOptions_DateItem} ${
                d === targetDay && style.WT_Calendar_WeeklyOptions_DateItem_active
              }`}
            >
              {getDay(d)}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeeklyOptions;
