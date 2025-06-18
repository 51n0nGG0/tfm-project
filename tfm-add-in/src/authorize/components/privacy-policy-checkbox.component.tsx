import * as React from "react";

import { CheckboxProps, Checkbox} from "@fluentui/react-checkbox";

import { makeStyles } from "@griffel/react/makeStyles.cjs";

interface PrivacyPolicyCheckboxProps {
    checked: CheckboxProps["checked"],
    setChecked: (checked:CheckboxProps["checked"]) => void;
}

const useStyles = makeStyles({
    privacyPolicyCheckboxContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    privacyPolicyCheckbox: {
        fontWeight: "600",
        cursor: "pointer",
        color: "rgb(50, 49, 48)",
        "&:hover": {
            color: "rgb(50, 49, 48)",
        },
    }
});

const PrivacyPolicyCheckbox: React.FC<PrivacyPolicyCheckboxProps> = ({checked, setChecked}) => {

    const styles = useStyles();

    return (
        <div className={styles.privacyPolicyCheckboxContainer}>
            <Checkbox
                className={styles.privacyPolicyCheckbox}
                checked={checked === true}
                onChange={(_ev, data) => setChecked(data.checked)}
                label="Acepto y estoy de acuerdo con los términos de la política de privacidad."
            />
        </div>
    );
};

export default PrivacyPolicyCheckbox;