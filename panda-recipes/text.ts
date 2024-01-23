import { defineRecipe } from "@pandacss/dev";

export const overflowEllipsis = defineRecipe({
  className: "text_overflow_ellipsis",
  description: "Set text overflow to ellipsis",
  base: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
});
