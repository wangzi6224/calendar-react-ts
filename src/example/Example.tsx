import React, {useState} from "react";
import { createRoot } from 'react-dom/client';
import styles from './Example.less';
import Calendar from '@/index';
import BusinessRender from "@/example/components/BusinessRender";
import ScheduleRender from '@/example/components/ScheduleRender'

const container = document.getElementById('root');
const root = createRoot(container!);

const initialList = [{
  id:'1',
  startTime: Date.now() - 2000 * 1000,
  endTime: Date.now() + 5600 * 1000,

}, {
  id:'2',
  startTime: Date.now() - (3600 + 7600) * 1000,
  endTime: Date.now() + (3600 + 7600) * 1000,
},
  {
    id:'3',
    startTime: Date.now() - (3600 + 3600) * 1000,
    endTime: Date.now() + (3600 + 10600) * 1000,
  }
]

const Example: React.FC = () => {
  const [scheduleList, setScheduleList] = useState<typeof initialList>(initialList);
  const [scheduleDate, setScheduleDate] = useState<number>(new Date().getTime());

  const slideChangeHandle = (currTimestamp, data) => {
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
  }

  return (
    <div className={styles.Example}>
      <Calendar
        initDay={scheduleDate}
        onSlideChange={slideChangeHandle}
        isDraggable
        data={scheduleList}
        mode={'week'}
        onChange={setScheduleDate}
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
