import React, {useContext} from 'react';
import style from './index.less';
import moment from 'moment';
import { getDay } from '@/utils';
import type { DailyOptionsType } from '@/data.d';
import {GlobalData} from "@/components/Container";

const DailyOptions: React.FC<DailyOptionsType> = ({
  setCurrTime,
  dateTextList,
  onChangeWeek,
  setSwitchWeekendDay
}) => {
  const {targetDay, setTargetDay, switchWeekendDay} = useContext(GlobalData);

  return (
    <div className={style.WT_Calendar_DailyOptions}>
      {/* 选择今天 */}
      <div
        onClick={() => {
          setTargetDay(new Date().getTime());
        }}
        className={
          moment(targetDay).format('YYYY年MM月DD日') === moment(new Date()).format('YYYY年MM月DD日')
            ? style.WT_Calendar_DailyOptions_Btn
            : style.WT_Calendar_DailyOptions_Btn_unActive
        }
      >
        今天
      </div>

      {/* 日期展示 */}
      <div className={style.WT_Calendar_DailyOptions_DateShow}>
        <div
          onClick={() => {
            onChangeWeek('prevWeek');
          }}
          className={style.WT_Calendar_DailyOptions_ChangeBtn}
        >{`<`}</div>
        <div style={{ fontFamily: 'sans-serif' }}>
          {switchWeekendDay === 'week' &&
            `${moment(dateTextList[0]).format('YYYY年MM月DD日')} - ${getDay(
              dateTextList[dateTextList.length - 1],
            )}日`}
          {switchWeekendDay === 'day' &&
            (moment(targetDay).format('YYYY年MM月DD日') ===
            moment(new Date()).format('YYYY年MM月DD日')
              ? '今天'
              : moment(targetDay).format('YYYY年MM月DD日'))}
        </div>
        <div
          onClick={() => {
            onChangeWeek('nextWeek');
          }}
          className={style.WT_Calendar_DailyOptions_ChangeBtn}
        >{`>`}</div>
      </div>

      {/* 日和周切换按钮 */}
      <div className={style.WT_Calendar_DailyOptions_Checkout}>
        <div
          onClick={() => {
            setSwitchWeekendDay('day');
          }}
          className={`${style.WT_Calendar_DailyOptions_Btn} ${
            style.WT_Calendar_DailyOptions_DayBtn
          } ${switchWeekendDay === 'day' && style.WT_Calendar_DailyOptions_Active}`}
        >
          日
        </div>
        <div
          onClick={() => {
            setCurrTime(targetDay);
            setSwitchWeekendDay('week');
          }}
          className={`${style.WT_Calendar_DailyOptions_Btn} ${
            style.WT_Calendar_DailyOptions_WeekBtn
          } ${switchWeekendDay === 'week' && style.WT_Calendar_DailyOptions_Active}`}
        >
          周
        </div>
      </div>
    </div>
  );
};

export default DailyOptions;
