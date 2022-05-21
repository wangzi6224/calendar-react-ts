import moment from "moment";
import {useLayoutEffect, useState} from "react";
import {getDay, getMonth, getYear} from "@/utils";

export const useAutoScroll = (targetDay, height) => {
  const [autoPositionTime] = useState(targetDay);

  const autoPositionScrollHandle: () => NodeJS.Timeout = () => {
    return setTimeout(() => {
      try {
        const scrollContainerEle = document.getElementById('WT_Calendar_ScheduleContainer_inner');
        const PositionTime: number =
          moment(
            `${getYear(autoPositionTime)}/${getMonth(autoPositionTime)}/${getDay(
              autoPositionTime,
            )} ${moment(autoPositionTime).hour()}:00:00`,
          ).unix() * 1000;
        scrollContainerEle.scrollTop =
          document.getElementById(`${PositionTime}`)?.offsetTop - height / 3;
      } catch (err) {
        console.log('自动滚动报错---->', err);
      }
    }, 20);
  };

  useLayoutEffect(() => {
    const scrollTimeID: NodeJS.Timeout = autoPositionScrollHandle();
    return () => {
      clearTimeout(scrollTimeID);
    };
  }, [targetDay])
}
