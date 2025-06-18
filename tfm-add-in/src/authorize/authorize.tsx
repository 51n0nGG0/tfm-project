import * as React from "react";
import { createRoot } from "react-dom/client";

import { webLightTheme } from "@fluentui/tokens";
import { FluentProvider } from "@fluentui/react-provider";

import App from "./App";

const title = "TFM Add-in";

const rootElement: HTMLElement | null = document.getElementById("container");
const root = rootElement ? createRoot(rootElement) : undefined;

Office.onReady(() => {
  root?.render(
    <FluentProvider theme={webLightTheme}>
      <App title={title} />
    </FluentProvider>
  );
});

if ((module as any).hot) {
  (module as any).hot.accept("./App", () => {
    const NextApp = require("./App").default;
    root?.render(NextApp);
  });
}
