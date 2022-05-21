import React from 'react';
import style from '@/components/ScheduleContainer/index.less';

type MovingBaseLineType = {
  movingTop: number;
  scrollHeight: number;
  color?: string;
};

const MovingBaseLine: React.FC<MovingBaseLineType> = ({ movingTop, scrollHeight, color }) => {

  const calcHoursText = () => {
    const __movingTop = Math.floor(movingTop / 30);

    if(__movingTop < 10) {
      return `0${__movingTop <= 0 ? 0 : __movingTop}`
    }
    return __movingTop;
  };

  const calcMinutesText = () => {
    const __movingTop = Math.floor(((movingTop / 30) * 60) % 60);

    if(__movingTop < 10) {
      return (`0${__movingTop <= 0 ? 0 : __movingTop}`)
    }
    return (__movingTop)
  }

  return (
      <div
        style={{
          display: movingTop + scrollHeight <= 0 ? 'none' : 'block',
          top: movingTop + scrollHeight <= 0 ? 0 : movingTop + scrollHeight,
          borderTop: `2px dashed ${color}`,
        }}
        className={style.WT_Calendar_ScheduleItem_CursorLine}
      >
        <div style={{color}} className={style.WT_Calendar_ScheduleItem_timeText}>
          {`${calcHoursText()}:${calcMinutesText()}`}
        </div>
      </div>
  );
};

export default MovingBaseLine;
