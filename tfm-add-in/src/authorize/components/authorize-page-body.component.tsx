import * as React from "react";

import { Button } from "@fluentui/react-button";
import { CheckboxProps } from "@fluentui/react-checkbox";

import AuthorizeInfo from "./authorize-info.component";
import PrivacyPolicyCheckbox from "./privacy-policy-checkbox.component";

import { makeStyles } from "@griffel/react/makeStyles.cjs";

const useStyles = makeStyles({
    body: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "15px",
    },
});

const AuthorizePageBody: React.FC = () => {
    const styles = useStyles();

    const [checked, setChecked] = React.useState<CheckboxProps["checked"]>(false);
    
    const handleLogin = async () => {
        window.location.href="/login/login.html";
    }

    return (
        <div className={styles.body}>
            <AuthorizeInfo/>
            <PrivacyPolicyCheckbox checked={checked} setChecked={setChecked}/>
            <Button appearance="primary" type="button" disabled={checked !== true} size="large" onClick={handleLogin}>
            Autorizar
            </Button>
        </div>
    );
};

export default AuthorizePageBody;