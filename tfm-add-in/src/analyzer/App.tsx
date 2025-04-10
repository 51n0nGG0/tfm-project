import * as React from "react";
import { makeStyles } from "@griffel/react/makeStyles.cjs";
import Header from "../components/header.component";
import AnalyzerPage from "./components/analyzer-page.component";

const useStyles = makeStyles({
  root: {
    minHeight: "100vh",
  },
});

const App: React.FC = () => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Header/>
      <AnalyzerPage/>
    </div>
  );
};

export default App;