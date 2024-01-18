import { styled } from "../../styled-system/jsx";
import { type JSX, type ParentComponent } from "solid-js";

export const Button: ParentComponent<{
  onClick?: JSX.EventHandler<HTMLButtonElement, Event>;
}> = (props) => (
  <styled.button
    bg="blue.500"
    color="white"
    py="2"
    px="4"
    _hover={{ bg: "blue.600" }}
    rounded="md"
    onClick={props.onClick}
    cursor="pointer"
  >
    {props.children}
  </styled.button>
);
