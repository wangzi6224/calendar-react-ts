import React, {useEffect, useState} from "react";
import { createRoot } from 'react-dom/client';
import styles from './Example.less'
import moment from "moment";
import Calendar from '@/index'
import {dataType, timestampRange} from "@/data";

const container = document.getElementById('root');
const root = createRoot(container!);

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

const BusinessRender: React.FC<{ timestamp: number }> = () => {
  const [now, setNow] = useState<any>(new Date().getTime());

  useEffect(() => {
    setInterval(() => {
      setNow(_ => setNow(new Date().getTime()))
    }, 1000)
  }, [])

  return (
    <div style={{fontWeight: 800, fontSize: "32px", color: "rgb(208, 219, 223)"}}>
      {
        moment(now).format('HH:mm:ss')
      }
    </div>
  )
}

const Example: React.FC = () => {
  const [scheduleList, setScheduleList] = useState<any[]>([{
    startTime: Date.now() - 3600 * 1000,
    endTime: Date.now() + 3600 * 1.5 * 1000,
  }]);
  const [scheduleDate, setScheduleDate] = useState<number>(new Date().getTime());

  return (
    <div className={styles.Example}>
      <Calendar
        initDay={scheduleDate}
        onSlideChange={(currTimestamp, data) => {
          setScheduleList(
            scheduleList.map((item) => {
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
        }}
        isDraggable
        data={scheduleList}
        mode={'week'}
        onChange={(time) => {
          setScheduleDate(time);
        }}
        scheduleRender={({ data,  timestampRange }) => <ScheduleRender data={data} timestampRange={timestampRange}/>}
        businessRender={(timestamp) => <BusinessRender timestamp={timestamp}/>}
      />
    </div>
  )
};

root.render(
  <React.StrictMode>
    <Example/>
  </React.StrictMode>
);
