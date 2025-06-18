import * as React from "react";

import AuthorizePageHeader from "./authorize-page-header.component";
import AuthorizePageBody from "./authorize-page-body.component";

import { makeStyles } from "@griffel/react/makeStyles.cjs";
import { tokens } from "@fluentui/tokens";

interface AuthorizePageProps {
  title: string;
  logo: string;
}

const useStyles = makeStyles({
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: "30px",
    paddingTop: "100px",
    backgroundColor: tokens.colorNeutralBackground3,
    paddingInline: "10px",
  }
});

const AuthorizePage: React.FC<AuthorizePageProps> = ({title, logo}) => {
  const styles = useStyles();

  return (
    <div className={styles.mainContainer}>
      <AuthorizePageHeader title={title} logo={logo}/>
      <AuthorizePageBody/>
    </div>
  );
};

export default AuthorizePage;
