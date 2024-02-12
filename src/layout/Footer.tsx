import { Component } from "solid-js";
import { Flex } from "../../styled-system/jsx";
import { Button } from "../components/Button";
import { useColors } from "../stores/colors";

export const Footer: Component<{}> = () => {
  const [, actions] = useColors();
  return (
    <Flex
      gap={4}
      bgt="zinc.200/10"
      p="3"
      position="fixed"
      insetBlockEnd="0"
      insetInline="0"
    >
      <Button onClick={actions.add}>Add Color</Button>
    </Flex>
  );
};
