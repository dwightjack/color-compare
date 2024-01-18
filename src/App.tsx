import { For } from "solid-js";
import { Grid, styled, Flex } from "../styled-system/jsx";
import "./App.css";
import { Button } from "./components/Button";
import { ColorBox } from "./components/ColorBox";
import { createColorStore } from "./stores/colors";

function App() {
  const [colors, { update, remove, add }] = createColorStore();
  return (
    <styled.main h="100vh" display="flex" flexDir="column">
      <Grid flexGrow="1" gap={0} minChildWidth="33.333%">
        <For each={colors}>
          {(color, idx) => (
            <ColorBox
              color={color.code}
              onRemove={idx() > 0 ? () => remove(color.id) : undefined}
              onChange={(code) => update(color.id, code)}
            />
          )}
        </For>
      </Grid>
      <Flex gap={4} bg="zinc.200" p="3">
        <Button onClick={add}>Add Color</Button>
      </Flex>
    </styled.main>
  );
}

export default App;
