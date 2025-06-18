import React from "react";

import ChartItem from "./chart-item.component";

import { SummaryItem } from "../../types/report";

import { makeStyles } from "@griffel/react/makeStyles.cjs";

interface ChartsContainerProps {
    summary: Record<string, SummaryItem>;
}

const useStyles = makeStyles({
    container: {
        display: "grid",
        gridTemplateColumns: "repeat(2,140px)",
        "@media screen and (min-width: 800px)": {
            gridTemplateColumns: "repeat(4,150px)",
        }
    }
});

const ChartsContainer:React.FC<ChartsContainerProps> = ({summary}) => {

    const styles = useStyles();

    return(
        <>
            { summary && 
                <div className={styles.container}>
                    <ChartItem
                        minimum={0}
                        maximum={6}
                        value={summary["PHISHING"].failed}
                        title="Phishing"
                    />
                    <ChartItem
                        minimum={0}
                        maximum={4}
                        value={summary["BUSINESS EMAIL COMPROMISE"].failed}
                        title="BEC"
                    />
                    <ChartItem
                        minimum={0}
                        maximum={8}
                        value={summary["EMOTIONAL SOCIAL ENGINEERING"].failed}
                        title="ISE"
                    />                  
                </div>
            }
        </>
        
    );
}

export default ChartsContainer;