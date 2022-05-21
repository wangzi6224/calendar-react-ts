import React from "react";
import style from "@/components/ScheduleContainer/index.less";
import {HourType} from "@/data";

const TimeScale: React.FC<{HoursList:HourType, scrollHeight:number}> = ({HoursList, scrollHeight}) => {
  return (
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
  )
};

export default TimeScale;
