let babel_env = process.env["BABEL_ENV"];
let loose = false,
  modules = false,
  useESModules = false;

switch (babel_env) {
  case "commonjs":
    loose = true;
    modules = "cjs";
    useESModules = false;
    break;
  case "es":
    loose = true;
    modules = false;
    useESModules = true;
    break;
  case "umd":
    loose = false;
    modules = false;
    useESModules = false;
    break;
}

module.exports = {
  "presets" :[
    ["@babel/preset-env",
      {
        "loose": loose,
        "modules": modules
      }
    ],
    "@babel/preset-typescript",
    "@babel/preset-react"
  ],
  "plugins": [
    "@babel/proposal-class-properties",
    ["module-resolver", {
      "root": ["./src"],
      "alias": {
        "@": "./src"
      }
    }],
    [
      "@babel/plugin-transform-runtime",
      {
        "useESModules": useESModules
      }
    ]
  ]
}
