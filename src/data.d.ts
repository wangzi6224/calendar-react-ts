import type React from 'react';

export type timestampRange = [number, number];

export type ContainerType = {
  data: dataType[];
  initDay?: number;
  onChange?: (params: number) => void;
  height?: number;
  scheduleRender?: (props: {
    data: dataType,
    timestampRange: timestampRange,
  }) => JSX.Element;
  businessRender?: (timestamp: number) => React.ReactNode;
  mode?: 'day' | 'week';
  onSlideChange?: (currTimestamp: [number, number], data: dataType) => void;
  isDraggable?: boolean;
  rangeStartAndEndKey?: [string, string];
};

export type dataType = {
  startTime: number;
  endTime: number;
  [propsName: string]: any;
};

export type WeekType = [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
];

export type HourType = [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
];

export type WeeklyOptionsType = {
  dateTextList: WeekType | [];
};

export type CalendarHeaderType = {
  businessRender?: (timestamp: number) => React.ReactNode;
};

export type DailyOptionsType = {
  setCurrTime: React.Dispatch<number>;
  dateTextList: WeekType | [];
  onChangeWeek: (params: 'prevWeek' | 'nextWeek') => void;
  setSwitchWeekendDay: React.Dispatch<'day' | 'week'>;
};

export type ScheduleContainerType = {
  data?: dataType[];
  scheduleRender?: ({
    data: dataType,
    timestampRange: timestampRange,
  }) => JSX.Element;
  rangeStartAndEndKey?: [string, string];
};

export type scheduleListType = {
  timestampRange: [number, number];
  dataItem: dataType[];
};

export type ScheduleItemType = {
  timestampRange: [number, number];
  dataItem: dataType[];
  scheduleRender?: ({
    data: dataType,
    timestampRange: timestampRange,
  }) => JSX.Element;
  width: number;
  dataItemLength: number;
  id: string;
  setIsMoving: React.Dispatch<boolean>;
  setMovingTop: React.Dispatch<number>;
  rangeStartAndEndKey?: [string, string];
};
