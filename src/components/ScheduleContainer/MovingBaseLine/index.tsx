import React from 'react';
import style from '@/components/ScheduleContainer/index.less';

type MovingBaseLineType = {
  movingTop: number;
  scrollHeight: number;
  isShow: boolean;
};

const MovingBaseLine: React.FC<MovingBaseLineType> = ({ movingTop, scrollHeight, isShow }) => {
  return (
    isShow && (
      <div
        style={{
          display: movingTop + scrollHeight <= 0 ? 'none' : 'block',
          top: movingTop + scrollHeight <= 0 ? 0 : movingTop + scrollHeight,
        }}
        className={style.WT_Calendar_ScheduleItem_CursorLine}
      >
        <div className={style.WT_Calendar_ScheduleItem_timeText}>
          {`${
            Math.floor(movingTop / 30) < 10
              ? `0${Math.floor(movingTop / 30) <= 0 ? 0 : Math.floor(movingTop / 30)}`
              : Math.floor(movingTop / 30)
          }:${
            Math.floor(((movingTop / 30) * 60) % 60) < 10
              ? `0${
                  Math.floor(((movingTop / 30) * 60) % 60) <= 0
                    ? 0
                    : Math.floor(((movingTop / 30) * 60) % 60)
                }`
              : Math.floor(((movingTop / 30) * 60) % 60)
          }`}
        </div>
      </div>
    )
  );
};

export default MovingBaseLine;
