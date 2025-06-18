import React from "react";

import { Button } from "@fluentui/react-button";
import { Field } from "@fluentui/react-field";
import { Spinner } from "@fluentui/react-spinner";
import { ProgressBar } from "@fluentui/react-progress";

import { useAnalysis } from "../contexts/analysis.context";

import { makeStyles } from "@griffel/react/makeStyles.cjs";
import { tokens } from "@fluentui/tokens";

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
    const {analysisStatus, analysisMessage, analysisProgress} = useAnalysis()

    return(
        <div className={styles.container}>
            <Button className={styles.button} appearance="primary" size="medium" onClick={onClick} disabled={analysisStatus === "ON_COURSE"}>
                {
                    analysisStatus === "ON_COURSE" ?
                    <Spinner size="tiny" label="Analizando"/>
                    :
                    <>Analizar correo</>
                }
            </Button>
            {
                analysisStatus === "ON_COURSE" &&
                <Field className={styles.progress} validationMessage={analysisMessage} validationState="none">
                    <ProgressBar
                        max={10}
                        value={analysisProgress} 
                        shape="rounded"
                        thickness="large"/>
                </Field>
            }
        </div>
    )
}

export default AnalysisLauncher;