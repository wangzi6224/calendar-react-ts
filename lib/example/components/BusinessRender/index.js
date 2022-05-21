"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _moment = _interopRequireDefault(require("moment"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var BusinessRender = function BusinessRender() {
  var _useState = (0, _react.useState)(new Date().getTime()),
      now = _useState[0],
      setNow = _useState[1];

  (0, _react.useEffect)(function () {
    setInterval(function () {
      setNow(function (_) {
        return setNow(new Date().getTime());
      });
    }, 1000);
  }, []);
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      fontWeight: 800,
      fontSize: "32px",
      color: "rgb(208, 219, 223)"
    }
  }, (0, _moment["default"])(now).format('HH:mm:ss'));
};

var _default = BusinessRender;
exports["default"] = _default;
//# sourceMappingURL=index.js.map