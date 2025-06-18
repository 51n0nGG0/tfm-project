import * as React from "react";

import { Label} from "@fluentui/react-label";
import { LockClosed16Filled } from "@fluentui/react-icons";

import { makeStyles } from "@griffel/react/makeStyles.cjs";

const useStyles = makeStyles({
    authorizeInfoContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
    },
    authorizeInfoIcon: {
        minWidth: "16px",
        minHeight: "16px",
        margin: "8px",
        fontSize: "16px",
    },
    authorizeInfoText: {
        paddingInline: "4px",
        paddingBlock: "8px",
        margin: 0,
        marginBlock: "-2px",
        fontWeight: "600",
        color: "rgb(50, 49, 48)",
    }
});

const AuthorizeInfo: React.FC = () => {

    const styles = useStyles();

    return (
        <div className={styles.authorizeInfoContainer}>
            <LockClosed16Filled className={styles.authorizeInfoIcon} />
            <Label className={styles.authorizeInfoText}>
                La aplicación necesita autorización para acceder a su cuenta de correo electrónico desde nuestros servidores
                para garantizar una seguridad constante contra el phishing, el spam y otras amenazas.
            </Label>
        </div>
    );
};

export default AuthorizeInfo;