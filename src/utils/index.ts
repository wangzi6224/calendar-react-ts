import moment from 'moment';

// 判断平年闰年 true闰年, false平年
export const isLeapYearHandle: (timestamp: number) => boolean = (timestamp) =>
  (getYear(timestamp) % 4 === 0 && getYear(timestamp) % 100 !== 0) ||
  getYear(timestamp) % 400 === 0;
// 获取年
export const getYear: (timestamp: number) => number = (timestamp) => moment(timestamp).year();
// 获取月
export const getMonth: (timestamp: number) => number = (timestamp) => moment(timestamp).month() + 1;
// 获取日
export const getDay: (timestamp: number) => number = (timestamp) => moment(timestamp).date();
// 获取星期
export const weekDay: (timestamp: number) => number = (timestamp) =>
  moment(timestamp).day() === 0 ? 7 : moment(timestamp).day();

// 获取当前月份的日期
export const getMonthOwnDays: (timestamp: number, year?: number, month?: number) => number[] = (
  timestamp,
  year,
  month,
) => {
  const dateCount = new Date(year || getYear(timestamp), month || getMonth(timestamp), 0).getDate();
  const result = [];
  for (let i = 0; i < dateCount; i++) result.push(i + 1);
  return [...result];
};

// 获取某个时间所在当天的零时零分零秒
export const getZeroTime = (time: Date | number): Date | number => {
  const tempDate = time instanceof Date ? time : new Date(time);
  // eslint-disable-next-line no-restricted-syntax
  for (const item of ['setHours', 'setMinutes', 'setSeconds', 'setMilliseconds']) {
    tempDate[item](0);
  }
  return time instanceof Date ? tempDate : tempDate.getTime();
};

type eventParamsType = {
  evType: string | keyof HTMLElementEventMap;
  handle: EventListenerOrEventListenerObject;
  options?: boolean | AddEventListenerOptions
  domInstance?: HTMLElement;
}

class DomEventHandle {
  public addEvent({evType, handle, options = null, domInstance = document.body}: eventParamsType) {
    domInstance.addEventListener(evType, handle, options);
  }

  public rmEvent({evType, handle, options = null, domInstance = document.body}: eventParamsType) {
    domInstance.removeEventListener(evType, handle, options);
  }
}

export const {addEvent, rmEvent} = new DomEventHandle();
