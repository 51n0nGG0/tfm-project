import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Button, makeStyles, MessageBar, MessageBarActions, MessageBarBody, MessageBarGroup, MessageBarIntent, MessageBarTitle } from '@fluentui/react-components';
import { DismissRegular } from '@fluentui/react-icons';
import { v4 as uuidv4 } from "uuid";

export type NotificationIntent = MessageBarIntent;

interface Notification {
  id: string;
  title: string;
  message: string;
  intent: NotificationIntent;
}

interface NotificationsContextType {
  showNotification: (title: string, message: string, intent: NotificationIntent) => void;
}

const useStyles = makeStyles({
  notificationContainer: {
    position: 'fixed',
    top: '0',
    right: '0',
    zIndex: 1000,
    width: "100%",
  },
});

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

export const NotificationsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  const styles = useStyles();

  const [notifications, setNotifications] = useState<Notification[]>([]);

  const showNotification = (title: string, message: string, intent?: NotificationIntent) => {
    const id = uuidv4();
    const newNotification = { id, title, message, intent};

    setNotifications(prev => [...prev, newNotification]);

    setTimeout(() => {
      setNotifications(prev => prev.filter(notification => notification.id !== id));
    }, 4000);
  }

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }

  return (
    <NotificationsContext.Provider value={{showNotification}}>
        {children}
        <MessageBarGroup className={styles.notificationContainer} animate="both">
          {
            notifications.map((notification)=>{
              return (
                <MessageBar key={notification.id} intent={notification.intent}>
                  <MessageBarBody>
                      <MessageBarTitle>{notification.title}</MessageBarTitle>
                      {notification.message + " "}
                  </MessageBarBody>
                  <MessageBarActions containerAction={
                      <Button
                      aria-label="dismiss"
                      appearance="transparent"
                      icon={<DismissRegular />}
                      onClick={()=>dismissNotification(notification.id)}
                      />
                  }/>
                </MessageBar>
              )
            })
          }
        </MessageBarGroup>
    </NotificationsContext.Provider>
  );
};


export const useNotification = (): NotificationsContextType => {
  const context = useContext(NotificationsContext);
  if (!context) throw new Error('useNotification must be used within a NotificationProvider');
  return context;
};