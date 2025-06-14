import React from "react";
import { makeStyles, tokens } from "@fluentui/react-components";
import AccountInfoHeader from "./account-info-header.component";
import AccountInfoBody from "./account-info-body.component";

const useStyles = makeStyles({
    container:{
        display: "flex",
        flexDirection: "column",
        width: "100%"
    }
})

const AccountInfo:React.FC = () => {
    const styles = useStyles();
    
    return (
        <div className={styles.container}>
            <AccountInfoHeader/>
            <AccountInfoBody/>
        </div>
    )
}

export default AccountInfo;