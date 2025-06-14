import * as React from "react";
import { makeStyles } from "@griffel/react/makeStyles.cjs";
import NavigationBar from "./components/navigation-bar/navigation-bar.component";
import LandingPage from "./components/landingpage/landing-page.component";
import {
  signInO365,
} from "../utilities/office-apis-helpers";
import { useState, useCallback } from "react";
import AnalyzerPage from "./components/analyzer-page.component";
import { Spinner } from "@fluentui/react-components";
import { useAuth } from "./contexts/auth.context";

const useStyles = makeStyles({
  root: {
    minHeight: "100vh",
  },
});

export interface AppProps {
  isOfficeInitialized: boolean;
}

export interface AppState {
  authStatus?: string;
  fileFetch?: string;
  headerMessage?: string;
  errorMessage?: string;
}

const App: React.FC<AppProps> = ({isOfficeInitialized}) => {

  const styles = useStyles();

  const [authStatus, setAuthStatus] = useState("notLoggedIn");
  const [errorMessage, setErrorMessage] = useState("");

  const {accessToken, setAccessToken, setAccountName} = useAuth();

  const boundSetState = useCallback((newState) => {
    if (newState.authStatus !== undefined) setAuthStatus(newState.authStatus);
    if (newState.errorMessage !== undefined) setErrorMessage(newState.errorMessage);
  }, []);

  const displayError = useCallback((error: string) => {
    setErrorMessage(error);
  }, []);

  const login = useCallback(async () => {
    await signInO365(boundSetState, setAccessToken, setAccountName, displayError);
  }, [boundSetState, displayError]);

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
      <NavigationBar/>
      <LandingPage 
        login={login}
      />
      {
        authStatus === "loggedIn" && <AnalyzerPage/>
      }
    </div>
  );
};

export default App;
