import React from "react";

import ChartItem from "./chart-item.component";
import { makeStyles, tokens } from "@fluentui/react-components";
import { SummaryItem } from "../../types/report";

interface ChartsContainerProps {
    summary: Record<string, SummaryItem>;
}

const useStyles = makeStyles({
    container: {
        display: "grid",
        gridTemplateColumns: "repeat(2,200px)",
        "@media screen and (min-width: 800px)": {
            gridTemplateColumns: "repeat(4,200px)",
        }
    }
});

const ChartsContainer:React.FC<ChartsContainerProps> = ({summary}) => {

    const styles = useStyles();

    return(
        <>
            { summary && <div className={styles.container}>
                    <ChartItem
                        minimum={0}
                        maximum={6}
                        value={summary["PHISHING"].failed}
                        title="Phishing"
                    />
                    <ChartItem
                        minimum={0}
                        maximum={2}
                        value={summary["BUSINESS EMAIL COMPROMISE"].failed}
                        title="Business Email Compromise"
                    />
                    <ChartItem
                        minimum={0}
                        maximum={7}
                        value={summary["SCAM"].failed}
                        title="Scam"
                    />
                    <ChartItem
                        minimum={0}
                        maximum={3}
                        value={summary["EMOTIONAL SOCIAL ENGINEERING"].failed}
                        title="Ingeniería social emocional"
                    />
                </div>
            }
        </>
        
    );
}

export default ChartsContainer;