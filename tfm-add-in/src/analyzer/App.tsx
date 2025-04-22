import * as React from "react";
import { makeStyles } from "@griffel/react/makeStyles.cjs";
import Header from "../components/header.component";
import AnalyzerPage from "./components/analyzer-page.component";
import { useEffect, useState } from "react";
import { initializeMsal } from "../services/authMSALService";

const useStyles = makeStyles({
  root: {
    minHeight: "100vh",
  },
});

const App: React.FC = () => {

  const styles = useStyles();

  const [msalReady, setMsalReady] = useState(false);

  useEffect(() => {
    async function init() {
      await initializeMsal();
      setMsalReady(true);
    }
    init();
  }, []);

  if (!msalReady) {
    return <div>Cargando MSAL...</div>; // Cambiar por un ESQUELETO
  }

  return (
    <div className={styles.root}>
      <Header/>
      <AnalyzerPage/>
    </div>
  );
};

export default App;