/** @type {import('tailwindcss').Config} */
export const mode = "jit";
export const content = ["./src/**/*.{html,ts}"];
export const theme = {
 debugScreens: {
  ignore: ["dark"],
 },
 extend: {},
};
export const plugins = [require("tailwindcss-debug-screens")];
