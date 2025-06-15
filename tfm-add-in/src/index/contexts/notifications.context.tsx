import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Button, MessageBar, MessageBarActions, MessageBarBody, MessageBarGroup, MessageBarIntent, MessageBarTitle } from '@fluentui/react-components';
import { DismissRegular } from '@fluentui/react-icons';

type NotificationIntent = MessageBarIntent; // 'info' | 'success' | 'error' | 'warning' | 'severeWarning'

interface Notification {
  message: string;
  intent: NotificationIntent;
}

interface NotificationContextType {
  showMessage: (message: string, intent?: NotificationIntent) => void;
  clearMessage: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const showMessage = (message: string, intent: NotificationIntent = 'info') => {
    setNotifications([]);
    setTimeout(() => setNotifications([]), 3000); // Oculta tras 3 segundos
  };

  const clearMessage = () => setNotifications([]);

  return (
    <NotificationContext.Provider value={{ showMessage, clearMessage }}>
        {children}
        <MessageBarGroup>
            <ErrorNotification title={''} description={''}></ErrorNotification>
            
        </MessageBarGroup>
    </NotificationContext.Provider>
  );
};

const ErrorNotification: React.FC<{title:string, description:string}> = ({title,description}) => {
    return(
        <MessageBar intent={"error"}>
            <MessageBarBody>
                <MessageBarTitle>{title}</MessageBarTitle>
                {description + " "}
            </MessageBarBody>
            <MessageBarActions containerAction={
                <Button
                aria-label="dismiss"
                appearance="transparent"
                icon={<DismissRegular />}
                />
            }/>
        </MessageBar>
    )
}

const SuccessNotification: React.FC<{title:string, description:string}> = ({title,description}) => {
    return(
        <MessageBar intent={"success"}>
            <MessageBarBody>
                <MessageBarTitle>{title}</MessageBarTitle>
                {description + " "}
            </MessageBarBody>
            <MessageBarActions containerAction={
                <Button
                aria-label="dismiss"
                appearance="transparent"
                icon={<DismissRegular />}
                />
            }/>
        </MessageBar>
    )
}

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error('useNotification must be used within a NotificationProvider');
  return context;
};