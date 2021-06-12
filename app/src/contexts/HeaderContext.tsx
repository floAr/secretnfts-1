import 'react-notifications/lib/notifications.css'

import React from 'react'
import { NotificationContainer, NotificationManager } from 'react-notifications'

type HeaderState = {
  userAddress?: string
  serverMessage?: string
  showServerMessage?: boolean
}

type HeaderParams = [
  HeaderState,
  React.Dispatch<React.SetStateAction<HeaderState>>
]
const HeaderContext = React.createContext<HeaderParams>([{}, () => null])

const CreateNotification = (
  message: string,
  title?: string,
  timeout = 1500,
  type = 'info',
  callback = () => null
) => {
  switch (type) {
    case 'info':
      NotificationManager.info(message, title, timeout, () => callback())
      break
    case 'success':
      NotificationManager.success(message, title, timeout, () => callback())
      break
    case 'warning':
      NotificationManager.warning(message, title, timeout, () => callback())
      break
    case 'error':
      NotificationManager.error(message, title, timeout, () => callback())
      break
  }
}

const HeaderProvider = (props: any) => {
  const [state, setState] = React.useState<HeaderState>({
    userAddress: '',
    serverMessage: '',
    showServerMessage: false,
  })

  return (
    <HeaderContext.Provider value={[state, setState]}>
      <NotificationContainer />

      {props.children}
    </HeaderContext.Provider>
  )
}

export { HeaderContext, HeaderProvider, CreateNotification }
