/* @refresh reload */
import { render } from "solid-js/web";
import { ColorsProvider } from "./stores/colors";
import "./index.css";
import App from "./App";

const root = document.getElementById("root");

render(
  () => (
    <ColorsProvider>
      <App />
    </ColorsProvider>
  ),
  root!
);
