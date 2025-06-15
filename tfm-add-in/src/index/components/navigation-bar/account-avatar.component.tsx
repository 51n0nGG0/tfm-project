import React from "react";

import { Avatar } from "@fluentui/react-avatar";
import { AddFriendIcon } from "@fluentui/react-icons-mdl2";
import { useAuth } from "../../contexts/auth.context";
import { Button, makeStyles, Popover, PopoverSurface, PopoverTrigger } from "@fluentui/react-components";
import AccountInfo from "./account-info/account-info.component";

interface AccountAvatarProps {
    logout: ()=>void
}

const useStyles = makeStyles({
    popoverSurface: {
        padding: 0,
        border: "none",
        borderRadius: 0,
        width: "90%",
    }
});

const AccountAvatar: React.FC<AccountAvatarProps> = ({logout}) => {
    const {accountName} = useAuth();
    const styles = useStyles();

    return (
        <>
            {
                accountName ?
                <>
                    <Popover positioning={"below-end"}>
                        <PopoverTrigger disableButtonEnhancement>
                            <Button appearance="subtle" size="small"><Avatar color="colorful" name={accountName} size={40}/></Button>
                        </PopoverTrigger>

                        <PopoverSurface tabIndex={-1} className={styles.popoverSurface}>
                            <AccountInfo logout={logout}/>
                        </PopoverSurface>
                    </Popover>
                </>
                :
                <Avatar color="anchor" icon={<AddFriendIcon/>} size={40}/>
            }
        </>
    );
}

export default AccountAvatar;