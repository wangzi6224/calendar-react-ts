import React, {useMemo} from 'react';
import style from '@/components/ScheduleContainer/index.less';

type MovingBaseLineType = {
  movingTop: number;
  scrollHeight: number;
  color?: string;
  visibility: boolean;
};

const MovingBaseLine: React.FC<MovingBaseLineType> = ({ movingTop, scrollHeight, color, visibility }) => {

  const calcHoursText = useMemo(() => {
    const __movingTop = Math.floor(movingTop / 30);

    if(__movingTop < 10) {
      return `0${__movingTop <= 0 ? 0 : __movingTop}`
    }
    return __movingTop;
  }, [movingTop])

  const calcMinutesText = useMemo(() => {
    const __movingTop = Math.floor(((movingTop / 30) * 60) % 60);

    if(__movingTop < 10) {
      return (`0${__movingTop <= 0 ? 0 : __movingTop}`)
    }
    return (__movingTop)
  }, [movingTop])

  return (
      <div
        style={{
          display: movingTop + scrollHeight <= 0 ? 'none' : 'block',
          top: movingTop + scrollHeight <= 0 ? 0 : movingTop + scrollHeight,
          borderTop: `2px dashed ${color}`,
          visibility: visibility ? 'visible' : 'hidden'
        }}
        className={style.Calendar_ScheduleItem_CursorLine}
      >
        <div style={{color}} className={style.Calendar_ScheduleItem_timeText}>
          {`${calcHoursText}:${calcMinutesText}`}
        </div>
      </div>
  );
};

export default MovingBaseLine;
