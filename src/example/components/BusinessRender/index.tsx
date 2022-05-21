import React, {useEffect, useState} from "react";
import moment from "moment";

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
};

export default BusinessRender;
