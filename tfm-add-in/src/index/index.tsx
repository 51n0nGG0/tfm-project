import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { webLightTheme } from "@fluentui/tokens";
import { FluentProvider } from "@fluentui/react-provider";

import { AuthProvider } from "./contexts/auth.context";
import { AnalysisProvider } from "./contexts/analysis.context";
import { NotificationsProvider } from "./contexts/notifications.context";

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
        <NotificationsProvider>
          <App isOfficeInitialized={isOfficeInitialized}/>
        </NotificationsProvider>
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
