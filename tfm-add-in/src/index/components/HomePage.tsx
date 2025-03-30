import * as React from "react";
import { Button, Image, tokens, makeStyles, CheckboxProps, Label, Checkbox } from "@fluentui/react-components";
import { LockClosed16Filled } from "@fluentui/react-icons";
import { loginWithMicrosoft } from "../../services/authService";
import { getToken, login } from "../../services/authMSALService";

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
    try {
      // 1. Llamamos a loginPopup() y realizamos el login
      const loginResponse = await login();  // Asumiendo que esta función hace el login con MSAL

      // 2. Llamamos a getToken() para obtener el access token
      const accessToken = await getToken(); // Utilizamos el método getToken del archivo auth.js

      if (accessToken) {
        // Almacenar el token en sessionStorage
        sessionStorage.setItem("accessToken", accessToken);
        console.log("Token de acceso almacenado:", accessToken);

        // 3. Redirigir a la página deseada
        window.location.href = "/auth.html"; // Redirige a la página después de obtener el token
      } else {
        console.log("No se pudo obtener el token de acceso");
      }
    } catch (error) {
      console.error("Error durante la autenticación", error);
    }
  };

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
