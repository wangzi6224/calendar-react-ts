import React from "react";
import moment from "moment";
import {dataType, timestampRange} from "@/data";

const ScheduleRender: React.FC<{data: dataType, timestampRange: timestampRange}> = ({data, timestampRange}) => {
  return (
    <div style={{width: '90px'}}>
      {
        timestampRange.map((t, index) => (
          <div key={t}>
            {
              `${moment(t).format('HH:mm:ss')}${index === 1 ? '有会议' : ''}`
            }
          </div>
        ))
      }
    </div>
  )
};

export default ScheduleRender;
