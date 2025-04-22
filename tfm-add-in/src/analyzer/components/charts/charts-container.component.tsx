import React from "react";

import ChartItem from "./chart-item.component";
import { makeStyles, tokens } from "@fluentui/react-components";

const useStyles = makeStyles({
    container: {
        display: "grid",
        gridTemplateColumns: "repeat(2,200px)",
        "@media screen and (min-width: 800px)": {
            gridTemplateColumns: "repeat(4,200px)",
        }
    }
});

const ChartsContainer:React.FC = () => {

    const styles = useStyles();

    return(
        <div className={styles.container}>
            <ChartItem
                minimum={0}
                maximum={6}
                value={1}
                title="Phishing"
            />
            <ChartItem
                minimum={0}
                maximum={6}
                value={3}
                title="Business Email Compromise"
            />
            <ChartItem
                minimum={0}
                maximum={6}
                value={5}
                title="Scam"
            />
            <ChartItem
                minimum={0}
                maximum={6}
                value={0}
                title="Ingeniería social emocional"
            />
        </div>
    );
}

export default ChartsContainer;