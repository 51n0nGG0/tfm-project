import * as React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { webLightTheme, webDarkTheme } from "@fluentui/tokens";
import { FluentProvider } from "@fluentui/react-provider";

import { AuthProvider } from "./contexts/auth.context";
import { AnalysisProvider } from "./contexts/analysis.context";

/* global document, Office, module, require, HTMLElement */

const title = "TFM Add-in";

const rootElement: HTMLElement | null = document.getElementById("container");
const root = rootElement ? createRoot(rootElement) : undefined;

let isOfficeInitialized = false;


/* Render application after Office initializes */
const render = () => root?.render(
  <FluentProvider theme={webLightTheme}>
    <AuthProvider>
      <AnalysisProvider>
        <App isOfficeInitialized={isOfficeInitialized}/>
      </AnalysisProvider>
    </AuthProvider>
  </FluentProvider>
);

Office.initialize = () => {
  isOfficeInitialized = true;
  render();
};

render();

if ((module as any).hot) {
  (module as any).hot.accept("./App", () => {
    const NextApp = require("./App").default;
    root?.render(NextApp);
  });
}
