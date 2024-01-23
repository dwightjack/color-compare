import { Component, Show } from "solid-js";
import { styled, Box } from "../../styled-system/jsx";
import { token } from "../../styled-system/tokens";
import { center } from "../../styled-system/patterns";
import Color from "colorjs.io";
import { Icon } from "@iconify-icon/solid";
import { useColors } from "../stores/colors";
import { ColorPicker } from "./ColorPicker";
import { Button } from "./Button";

const formats = ["hex", "rgb", "hsl", "oklab", "oklch"] as const;
type Formats = (typeof formats)[number];

const formatMapping: Partial<Record<Formats, { space: string }>> = {
  hex: { space: "srgb" },
  rgb: { space: "srgb" },
};

export const ColorBox: Component<{
  color: string;
  id: string;
  removable?: boolean;
}> = (props) => {
  const [state, actions] = useColors();

  const format = () => state.format;

  const colorObject = () => new Color(props.color);

  const colorOutput = () =>
    colorObject()
      .to(formatMapping[format()]?.space || format())
      .toString({ format: format(), precision: 3 });

  const textColor = () => {
    const color = new Color(props.color);
    const onWhite = Math.abs(color.contrast("white", "WCAG21"));
    const onBlack = Math.abs(color.contrast("black", "WCAG21"));
    return onWhite > onBlack
      ? token("colors.zinc.300")
      : token("colors.zinc.800");
  };

  return (
    <Box
      bgColor="var(--bg-color)"
      p="6"
      class={center()}
      style={{ "--bg-color": props.color, "--text-color": textColor() }}
      pos="relative"
    >
      <ColorPicker
        inputColor={props.color}
        color={colorOutput()}
        onInput={(e) => actions.updateColor(props.id, e.target.value)}
        onColorSpaceToggle={() => actions.toggleFormat()}
      />
      <Show when={props.removable}>
        <Button
          variant="contrast"
          shape="circle"
          onClick={() => actions.remove(props.id)}
          aria-label="Remove"
          w="8"
          pos="absolute"
          right="3"
          top="3"
        >
          <Icon icon="heroicons-solid:x" />
        </Button>
      </Show>
    </Box>
  );
};
