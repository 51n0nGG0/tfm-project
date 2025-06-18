import * as React from "react";

import AuthorizePage from "./components/authorize-page.component";

import { makeStyles } from "@griffel/react/makeStyles.cjs";

interface AppProps {
  title: string;
}

const useStyles = makeStyles({
  root: {
    minHeight: "100vh",
  },
});

const App: React.FC<AppProps> = (props: AppProps) => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <AuthorizePage title={props.title} logo={"/assets/icon-128.png"}></AuthorizePage>
    </div>
  );
};

export default App;
