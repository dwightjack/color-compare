import { Component, Show, createSignal } from "solid-js";
import { styled, HStack } from "../../styled-system/jsx";
import { token } from "../../styled-system/tokens";
import { visuallyHidden, center } from "../../styled-system/patterns";
import Color from "colorjs.io";
import { Icon } from "@iconify-icon/solid";
import { useColors } from "../stores/colors";

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

  function toggleColorSpace() {
    actions.setFormat((current) => {
      let next = formats.indexOf(current) + 1;
      if (next === formats.length) {
        next = 0;
      }
      return formats[next];
    });
  }

  const textColor = () => {
    const color = new Color(props.color);
    const onWhite = Math.abs(color.contrast("white", "WCAG21"));
    const onBlack = Math.abs(color.contrast("black", "WCAG21"));
    return onWhite > onBlack
      ? token("colors.zinc.300")
      : token("colors.zinc.800");
  };

  return (
    <styled.div
      bgColor="var(--bg-color)"
      p="6"
      class={center()}
      style={{ "--bg-color": props.color, "--text-color": textColor() }}
      pos="relative"
    >
      <HStack
        width="min(16em, 100%)"
        bgt="white/80"
        gap="0"
        color="var(--text-color)"
        borderWidth="2px"
        alignItems="stretch"
        borderColor="color-mix(in srgb, var(--text-color), transparent 80%)"
        borderRadius="md"
        transition="colors"
        transitionDuration="slow"
        fontSize="l"
        lineHeight="2"
      >
        <styled.button
          type="button"
          width="1lh"
          cursor="pointer"
          display="grid"
          flexShrink="0"
          placeItems="center"
          onClick={toggleColorSpace}
        >
          <span class={visuallyHidden()}>Click to toggle the color space</span>
          <Icon icon="heroicons-solid:refresh" />
        </styled.button>
        <styled.span
          display="block"
          w="1"
          h="0.5lh"
          borderColor="inherit"
          borderInlineEndWidth="1"
          alignSelf="center"
        />
        <styled.label
          flexGrow="1"
          cursor="pointer"
          paddingInlineStart="4"
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
        >
          <span class={visuallyHidden()}>Color value</span>
          <span aria-hidden="true">{colorOutput()}</span>
          <styled.input
            type="color"
            name="color"
            class={visuallyHidden()}
            value={props.color}
            onInput={(e) => actions.updateColor(props.id, e.target.value)}
          />
        </styled.label>
      </HStack>

      <Show when={props.removable}>
        <styled.button
          onClick={() => actions.remove(props.id)}
          aria-label="Remove"
          borderRadius="full"
          w="8"
          display="grid"
          placeItems="center"
          cursor="pointer"
          aspectRatio="square"
          pos="absolute"
          right="3"
          top="3"
          backgroundColor="zinc.100"
        >
          <Icon icon="heroicons-solid:x" />
        </styled.button>
      </Show>
    </styled.div>
  );
};
