import React from "react";

import { Avatar } from "@fluentui/react-avatar";
import { Body1, Subtitle2Stronger } from "@fluentui/react-text";
import { Tooltip } from "@fluentui/react-tooltip";

import { getUserProfile } from "../../../services/microsoft-api.service";

import { User } from "@microsoft/microsoft-graph-types";

import { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/auth.context";

import { makeStyles } from "@griffel/react/makeStyles.cjs";
import { tokens } from "@fluentui/tokens";

const useStyles = makeStyles({
    container:{
        display: "flex",
        flexDirection: "row",
        gap: tokens.spacingHorizontalM,
        padding: tokens.spacingHorizontalM,
    },
    textContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: tokens.spacingHorizontalM,
        flex: "1 1 0",
        overflow: "hidden",
    }
})

const AccountInfoBody:React.FC = () => {
    const {accessToken} = useAuth();
    const [accountInfo, setAccountInfo] = useState<User | undefined>(null);

    const styles = useStyles();

    useEffect(()=> {
        async function fetchUserProfile() {
            const info = await getUserProfile(accessToken);
            setAccountInfo(info);
        }
        fetchUserProfile()
    }, [])
    
    return (
        <div className={styles.container}>
            <Avatar size={72} color="colorful" name={accountInfo?.userPrincipalName}/>
            <div className={styles.textContainer}>
                <Tooltip content={accountInfo?.givenName + " " + accountInfo?.surname} relationship="label">
                    <Subtitle2Stronger truncate wrap={false}>{accountInfo?.givenName + " " + accountInfo?.surname}</Subtitle2Stronger>
                </Tooltip>
                <Tooltip content={accountInfo?.mail} relationship="label">
                    <Body1 truncate wrap={false}>{accountInfo?.mail}</Body1>
                </Tooltip>
            </div>
        </div>
    )
}

export default AccountInfoBody;