import React from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

type HeaderState = {
    userAddress?: string;
    serverMessage?: string;
    showServerMessage?: boolean;
};

type HeaderParams = [HeaderState, React.Dispatch<React.SetStateAction<HeaderState>>];
const HeaderContext = React.createContext<HeaderParams>([{}, () => null]);

const CreateNotification = (title: string, message: string, timeout = 1500, type = 'info', callback = () => null) => {
    switch (type) {
        case 'info':
            NotificationManager.info(title, message, timeout, () => callback());
            break;
        case 'success':
            NotificationManager.success(title, message, timeout, () => callback());
            break;
        case 'warning':
            NotificationManager.warning(title, message, timeout, () => callback());
            break;
        case 'error':
            NotificationManager.error(title, message, timeout, () => callback());
            break;
    }
};

const HeaderProvider = (props: any) => {
    const [state, setState] = React.useState<HeaderState>({
        userAddress: "",
        serverMessage: "",
        showServerMessage: false
    });

    return (
        <HeaderContext.Provider value={[state, setState]}>
            <NotificationContainer />
            {props.children}
        </HeaderContext.Provider>
    );
}

export { HeaderContext, HeaderProvider, CreateNotification };

