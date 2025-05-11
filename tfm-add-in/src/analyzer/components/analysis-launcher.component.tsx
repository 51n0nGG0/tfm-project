import { Button } from "@fluentui/react-button";
import { Field, makeStyles, Spinner, tokens } from "@fluentui/react-components";
import { ProgressBar } from "@fluentui/react-progress";
import React from "react";

interface AnalysisLauncherProps {
    onClick: () => void,
}

const useStyles = makeStyles({
    container: {
        display: "flex",
        flexDirection: "column",
        gap: tokens.spacingHorizontalSNudge,
    },
    button: {
        alignSelf: "center",
        width: "100%",
        maxWidth: "300px",
    },
    progress: {
        alignSelf: "center",
        width: "100%",
        maxWidth: "500px",
    }
});

const AnalysisLauncher:React.FC<AnalysisLauncherProps> = ({onClick}) => {
    const styles = useStyles();

    return(
        <div className={styles.container}>
            <Button className={styles.button} appearance="primary" size="medium" disabled onClick={onClick}><Spinner size="tiny" label="Analizando"/></Button>
            <Field className={styles.progress} validationMessage="Default ProgressBar" validationState="none">
                <ProgressBar 
                    value={0.5} 
                    shape="rounded"
                    thickness="large"/>
            </Field>
        </div>
    )
}

export default AnalysisLauncher;