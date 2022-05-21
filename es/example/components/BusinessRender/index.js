import React, { useEffect, useState } from "react";
import moment from "moment";

var BusinessRender = function BusinessRender() {
  var _useState = useState(new Date().getTime()),
      now = _useState[0],
      setNow = _useState[1];

  useEffect(function () {
    setInterval(function () {
      setNow(function (_) {
        return setNow(new Date().getTime());
      });
    }, 1000);
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 800,
      fontSize: "32px",
      color: "rgb(208, 219, 223)"
    }
  }, moment(now).format('HH:mm:ss'));
};

export default BusinessRender;
//# sourceMappingURL=index.js.map