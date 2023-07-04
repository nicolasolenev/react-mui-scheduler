import babel from "@rollup/plugin-babel";
import styles from "rollup-plugin-styles";
import json from "@rollup/plugin-json";

const autoprefixer = require("autoprefixer");

// the entry point for the library
const input = "src/index.js";

//
let MODE = [{ format: "esm" }, { format: "umd" }];

let config = [];

MODE.map((m) => {
  let conf = {
    input: input,
    output: {
      // then name of your package
      name: "react-material-scheduler",
      file: `dist/index.${ m.format }.js`,
      format: m.format,
      exports: "auto",
    },
    // this externalizes react to prevent rollup from compiling it
    external: [
      "react",
      "@mui/icons-material",
      "@mui/lab",
      "@mui/material",
      "@mui/system",
      "date-fns",
      "prop-types",
      /@babel\/runtime/,
    ],
    plugins: [
      json(),
      // these are babel configurations
      babel({
        exclude: "node_modules/**",
        plugins: ["@babel/transform-runtime", "@babel/plugin-proposal-optional-chaining"],
        babelHelpers: "runtime",
      }),
      // this adds sourcemaps
      // this adds support for styles
      styles({
        postcss: {
          plugins: [
            autoprefixer(),
          ],
        },
      }),
    ],
  };
  config.push(conf);
});

export default [
  ...config,
];
