import * as React from "react";
import { makeStyles } from "@fluentui/react-components";
import HomePage from "./HomePage";

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
      <HomePage title={props.title} logo={"assets/logo-filled.png"}></HomePage>
    </div>
  );
};

export default App;
