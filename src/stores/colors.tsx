import { createUniqueId } from "solid-js";
import { createStore } from "solid-js/store";

export function createColorStore() {
  const [colors, setColors] = createStore([
    {
      id: createUniqueId(),
      code: "#ffffff",
    },
  ]);

  return [
    colors,
    {
      update(id: string, newCode: string) {
        setColors(
          (color) => color.id === id,
          "code",
          () => newCode
        );
      },

      add() {
        setColors([
          ...colors,
          { id: createUniqueId(), code: colors.at(-1)!.code },
        ]);
      },

      remove(id: string) {
        setColors(colors.filter((color) => color.id !== id));
      },
    },
  ] as const;
}
