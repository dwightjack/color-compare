import { onCleanup, createSignal } from "solid-js";

export type CopyState = "idle" | "success" | "error";

export function createCopyToClipboard() {
  const [status, setStatus] = createSignal<CopyState>("idle");
  let id: number;

  function cleanup() {
    id && clearTimeout(id);
  }

  async function writeClipboardText(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("error");
    } finally {
      cleanup();
      id = setTimeout(() => setStatus("idle"), 1000);
    }
  }

  onCleanup(cleanup);

  return [status, writeClipboardText] as const;
}
