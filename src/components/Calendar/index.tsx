import React from 'react';
import Container from '@/components/Container';
import styles from '@/styles/initial.less'
import type {ContainerType} from '@/data.d';

const Calendar: React.FC<ContainerType> = ({initDay = new Date().getTime(), data, onChange, scheduleRender, businessRender, mode, onSlideChange, isDraggable = false, rangeStartAndEndKey = ['startTime', 'endTime'],}) => {
  return (
    <div className={styles.Calendar}>
      <Container
        mode={mode}
        data={data}
        initDay={initDay}
        onChange={onChange}
        scheduleRender={scheduleRender}
        businessRender={businessRender}
        onSlideChange={onSlideChange}
        isDraggable={isDraggable}
        rangeStartAndEndKey={rangeStartAndEndKey}
      />
    </div>
  );
};

export default Calendar;
