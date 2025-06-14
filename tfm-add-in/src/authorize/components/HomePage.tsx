import * as React from "react";
import { Label} from "@fluentui/react-label";
import { Button } from "@fluentui/react-button";
import { Image} from "@fluentui/react-image";
import { tokens } from "@fluentui/tokens";
import { makeStyles } from "@griffel/react/makeStyles.cjs";
import { CheckboxProps, Checkbox} from "@fluentui/react-checkbox";
import { LockClosed16Filled } from "@fluentui/react-icons";

interface HomePageProps {
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
  },
  listItem: {
    display: "flex",
    paddingBottom: "15px",
  },
  listItemIcon: {
    minWidth: "16px",
    minHeight: "16px",
    margin: "8px",
    fontSize: "16px",
  },
  listItemText: {
    paddingInline: "4px",
    paddingBlock: "8px",
    margin: 0,
    marginBlock: "-2px",
    fontWeight: "600",
    color: "rgb(50, 49, 48)",
  },
  message: {
    fontSize: tokens.fontSizeHero900,
    fontWeight: tokens.fontWeightRegular,
    fontColor: tokens.colorNeutralBackgroundStatic,
  },
  label: {
    fontWeight: "600",
    cursor: "pointer",
    color: "rgb(50, 49, 48)",
    "&:hover": {
      color: "rgb(50, 49, 48)",
    },
  },
});

const HomePage: React.FC<HomePageProps> = (props: HomePageProps) => {
  const styles = useStyles();
  const [checked, setChecked] = React.useState<CheckboxProps["checked"]>(false);

  const handleLogin = async () => {
    window.location.href="/login/login.html";
  }

  return (
    <div className={styles.mainContainer}>
      <Image width="90" height="90" src={props.logo} alt={props.title} />
      <h1 className={styles.message}>{props.title}</h1>
      <div className={styles.listItem}>
        <LockClosed16Filled className={styles.listItemIcon} />
        <Label className={styles.listItemText}>
          La aplicación necesita autorización para acceder a su cuenta de correo electrónico desde nuestros servidores
          para garantizar una seguridad constante contra el phishing, el spam y otras amenazas.
        </Label>
      </div>
      <div className={styles.listItem}>
        <Checkbox
          className={styles.label}
          checked={checked === true}
          onChange={(_ev, data) => setChecked(data.checked)}
          label="Acepto y estoy de acuerdo con los términos de la política de privacidad."
        ></Checkbox>
      </div>
      <Button appearance="primary" type="button" disabled={checked !== true} size="large" onClick={handleLogin}>
        Autorizar
      </Button>
    </div>
  );
};

export default HomePage;
