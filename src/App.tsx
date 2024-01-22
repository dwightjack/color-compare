import { For } from "solid-js";
import { Grid, styled, Flex } from "../styled-system/jsx";
import "./App.css";
import { Button } from "./components/Button";
import { ColorBox } from "./components/ColorBox";
import { useColors } from "./stores/colors";
function App() {
  const [state, actions] = useColors();
  return (
    <styled.main h="100vh" display="flex" flexDir="column">
      <Grid flexGrow="1" gap={0} minChildWidth="33.333%">
        <For each={state.colors}>
          {(color, idx) => (
            <ColorBox color={color.code} id={color.id} removable={idx() > 0} />
          )}
        </For>
      </Grid>
      <Flex gap={4} bg="zinc.200" p="3">
        <Button onClick={actions.add}>Add Color</Button>
      </Flex>
    </styled.main>
  );
}

export default App;
