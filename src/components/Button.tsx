import { styled } from "../../styled-system/jsx";

export const Button = styled("button", {
  base: {
    cursor: "pointer",
    transition: "colors",
    transitionDuration: "fast",
  },
  variants: {
    variant: {
      primary: {
        bg: "blue.500",
        color: "white",
        _hover: { bg: "blue.600" },
      },
      contrast: {
        bg: "zinc.100",
        color: "zinc.900",
        _hover: { bg: "zinc.300" },
      },
      transparent: {
        bg: "transparent",
        color: "current",
      },
    },
    shape: {
      fluid: {
        py: "2",
        px: "4",
        rounded: "md",
      },
      circle: {
        aspectRatio: "square",
        borderRadius: "full",
        display: "grid",
        placeItems: "center",
      },
      square: {
        aspectRatio: "square",
        display: "grid",
        placeItems: "center",
      },
    },
  },
  defaultVariants: {
    variant: "primary",
    shape: "fluid",
  },
});
