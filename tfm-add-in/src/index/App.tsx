import React from "react";

import { Spinner } from "@fluentui/react-spinner";

import NavigationBar from "./components/navigation-bar/navigation-bar.component";
import LandingPanel from "./components/landing-panel/landing-panel.component";
import AnalyzerPanel from "./components/analyzer-panel.component";

import { logoutFromO365, signInO365 } from "../helpers/office-api.helper";

import { useState, useCallback } from "react";
import { useAuth } from "./contexts/auth.context";
import { useNotification } from "./contexts/notifications.context";

import { makeStyles } from "@griffel/react/makeStyles.cjs";

const useStyles = makeStyles({
  root: {
    minHeight: "100vh",
  },
});

export interface AppProps {
  isOfficeInitialized: boolean;
}

export interface AppState {
  authStatus: string;
}

const App: React.FC<AppProps> = ({isOfficeInitialized}) => {

  const styles = useStyles();

  const {showNotification} = useNotification();

  const [authStatus, setAuthStatus] = useState("notLoggedIn");

  const {accessToken, setAccessToken, setAccountName } = useAuth();

  const boundSetState = useCallback((newState) => {
    if (newState.authStatus !== undefined) setAuthStatus(newState.authStatus);
  }, []);

  const login = useCallback(() => {
    signInO365(boundSetState, setAccessToken, setAccountName, showNotification);
  }, [boundSetState]);

  const logout = useCallback(()=>{
    logoutFromO365(boundSetState, setAccessToken, setAccountName, showNotification)
  }, [boundSetState])

  console.log(accessToken);

  if (!isOfficeInitialized) {
    return (
      <section className='ms-welcome__progress ms-u-fadeIn500'>
        <h1 className='ms-fontSize-su ms-fontWeight-light ms-fontColor-neutralPrimary'>{"Welcome"}</h1>
        <Spinner size={"large"} label={"Please sideload your add-in to see app body."} />
      </section>
    );
  }

  return (
    <div className={styles.root}>
      <NavigationBar logout={logout}/>
      <main>
        <LandingPanel
          login={login}
        />
        {
          authStatus === "loggedIn" && <AnalyzerPanel/>
        }
      </main>
    </div>
  );
};

export default App;
