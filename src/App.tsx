import { For } from "solid-js";
import { styled } from "../styled-system/jsx";

import "./App.css";
import { ColorBox } from "./components/ColorBox";
import { useColors } from "./stores/colors";
import { Footer } from "./layout/Footer";
function App() {
  const [state] = useColors();

  return (
    <main>
      <styled.div
        h="100vh"
        display="grid"
        smDown={{
          gridAutoRows: "minmax(33.33vh, 1fr)",
        }}
        sm={{
          gridTemplateColumns: "repeat(auto-fit, minmax(33.33%, 1fr))",
          gridAutoRows: "minmax(33.33vh, 1fr)",
        }}
      >
        <For each={state.colors}>
          {(color, idx) => (
            <ColorBox color={color.code} id={color.id} removable={idx() > 0} />
          )}
        </For>
      </styled.div>
      <Footer />
    </main>
  );
}

export default App;
