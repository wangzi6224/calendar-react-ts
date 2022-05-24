import React from "react";
import moment from "moment";
import {dataType, timestampRange} from "@/data";

const ScheduleRender: React.FC<{data: dataType, timestampRange: timestampRange}> = ({data, timestampRange}) => {
  return (
    <div style={{width: '90px', fontSize: "14px"}}>
      <span style={{fontSize: "12px"}}>时间范围</span>
      <div>
        {
          moment(data.startTime).format('HH:mm:ss')
        }
      </div>
      <div>
        {
          moment(data.endTime).format('HH:mm:ss')
        }
      </div>
    </div>
  )
};

export default ScheduleRender;
