import { Component, Show } from "solid-js";
import { Flex, VStack } from "../../styled-system/jsx";

export const ColorBox: Component<{
  color: string;
  onRemove?: () => void;
  onChange: (value: string) => void;
}> = (props) => {
  return (
    <Flex
      align="center"
      justify="center"
      bgColor="var(--color)"
      style={{ "--color": props.color }}
    >
      <VStack>
        <input
          type="color"
          name="color"
          value={props.color}
          onInput={(e) => props.onChange(e.target.value)}
        />
        <Show when={props.onRemove}>
          <button onClick={props.onRemove}>Remove</button>
        </Show>
      </VStack>
    </Flex>
  );
};
