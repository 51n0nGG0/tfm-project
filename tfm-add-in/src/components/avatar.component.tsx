import { Avatar } from "@fluentui/react-avatar";
import React from "react";
import { AddFriendIcon } from "@fluentui/react-icons-mdl2";

const AccountAvatar: React.FC = () => {
    return (
        <>
            <Avatar color="anchor" icon={<AddFriendIcon/>} size={40}/>
        </>
    );
}

export default AccountAvatar;