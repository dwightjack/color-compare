import { defineConfig } from "@pandacss/dev";
import { overflowEllipsis } from "./panda-recipes/text";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      recipes: {
        overflowEllipsis,
      },
    },
  },

  jsxFramework: "solid",

  // The output directory for your css system
  outdir: "styled-system",

  utilities: {
    // https://github.com/chakra-ui/panda/discussions/862
    backgroundColorTransparentize: {
      shorthand: ["bgct", "bgt"],
      property: "backgroundColor",
      className: "transparentize_bgc",
      transform: (value, { token, ...other }) => {
        const lastIndex = value?.lastIndexOf("/");
        if (!lastIndex) {
          return {};
        }
        if (typeof value?.substring !== "function") {
          return {};
        }
        const color = value?.substring(0, lastIndex);
        if (!color) {
          return {};
        }
        const amount = value.split("/").at(-1);
        const colorValue = token(`colors.${color}`);

        const amountValue = token(`opacity.${amount}`)
          ? (token(`opacity.${amount}`) as unknown as number) * 100
          : `${amount}%`;
        return {
          backgroundColor: `color-mix(in srgb, transparent ${amountValue}, ${colorValue})`,
        };
      },
    },
  },
});
