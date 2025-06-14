import React, { useEffect, useRef, useState } from "react";

import { useStaticVirtualizerMeasure, Virtualizer } from "@fluentui/react-virtualizer";
import { Skeleton, SkeletonItem, Spinner } from "@fluentui/react-components";

import { Message } from "@microsoft/microsoft-graph-types";

import { makeStyles } from "@griffel/react/makeStyles.cjs";

import { getFolderMessages } from "../../../services/microsoftService";

import MailResume from "./message-resume.component";
import MessageListEmpty from "./message-list-empty.component";
import { useAuth } from "../../contexts/auth.context";


interface MailListProps {
    selectedFolder: string,
    selectedMessage: Message,
    setSelectedMessage: (message: Message) => void,
    isOtherThingsLoading: boolean,
    isLoading: boolean,
    setIsLoading: (isLoading: boolean) => void,
}

const useStyles = makeStyles({
    container: {
        height: "400px",
        overflowY: "auto",

        '::-webkit-scrollbar': {
            width: '10px',
        },
        '::-webkit-scrollbar-track': {
            background: '#f1f1f1',
            borderRadius: "6px"
        },
        '::-webkit-scrollbar-thumb': {
            background: '#888',
            borderRadius: '5px',
        },
        '::-webkit-scrollbar-thumb:hover': {
            background: '#555',
        },

        scrollbarWidth: 'thin',
        scrollbarColor: '#888 #f1f1f1',
    },
    skeleton: {
        height: "100%",
        width: "100%"
    },
    skeletonItem: {
        height: "100%",
        width: "100%"
    }
})

const MailList:React.FC<MailListProps> = ({selectedFolder, isOtherThingsLoading, selectedMessage, setSelectedMessage, isLoading, setIsLoading}) => {

    const styles = useStyles();

    const [messages, setMessages] = useState<Message[]>([])
    const [isNewMessagesLoading, setIsNewMessagesLoading] = useState<boolean>(false);
    const [nextLink, setNextLink] = useState<string | null>(null);

    const {accessToken} = useAuth();

    const scrollContainerRef = useRef<any | null>(null);

    const {
        virtualizerLength,
        bufferItems,
        bufferSize,
        scrollRef,
        containerSizeRef,
    } = useStaticVirtualizerMeasure({
        defaultItemSize: 79,
    });

    useEffect(() => {
        async function getMessages() {
            setIsLoading(true);

            const result = await getFolderMessages(selectedFolder, accessToken);
            if (result) {
                setMessages((_prev) => result.messages);
                setNextLink((_prev) => result.nextLink);
            }
    
            setIsLoading(false);
        }
    
        getMessages();
    },[selectedFolder]);

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return null;

        const handleScroll = () => {
            const scrollTop = container.scrollTop;
            const scrollHeight = container.scrollHeight;
            const clientHeight = container.clientHeight;
        
            const nearBottom = scrollHeight - scrollTop - clientHeight < 100;
            if (nearBottom && !isNewMessagesLoading && nextLink) {
                fetchMoreMessages();
            }
        };
        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
    }, [isNewMessagesLoading, nextLink]);

    const fetchMoreMessages = async () => {
        if (!nextLink || isNewMessagesLoading) return;
        setIsNewMessagesLoading(true);
    
        const result = await getFolderMessages(selectedFolder, nextLink);
        if (result) {
            console.log(result.messages);
            setMessages((prev) => [...prev, ...result.messages]);
            setNextLink(result.nextLink || null);
        }
    
        setIsNewMessagesLoading(false);
    };

    return (
        <div className={styles.container} ref={(el) => {
            scrollRef(el);
            scrollContainerRef.current = el;
        }}>
            {isLoading || isOtherThingsLoading ?
                <>
                    <Skeleton className={styles.skeleton}>
                        <SkeletonItem className={styles.skeletonItem}/>
                    </Skeleton>
                </>
                :
                messages.length === 0 ? 
                    <MessageListEmpty/>
                    :
                    <>
                        <Virtualizer
                            itemSize={79}
                            numItems={messages.length}
                            bufferSize={bufferSize}
                            bufferItems={bufferItems}
                            virtualizerLength={virtualizerLength}
                            containerSizeRef={containerSizeRef}>
                            {(index) => {
                                return <MailResume key={messages[index].id} message={messages[index]} selectedMessage={selectedMessage} onSelectMessage={setSelectedMessage}/>
                            }}
                        </Virtualizer>
                        { isNewMessagesLoading && <Spinner/>}
                    </>
                    
            }
        </div>
    )
}

export default MailList;