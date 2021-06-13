import { ToastContainer, toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react'

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
  timeout = 5000,
  type?: string,
  callback = () => null
) => {

  const body: ToastOptions = {
    position: "top-right",
    autoClose: timeout,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    onClick: callback
  }


  switch (type) {
    case 'info':
      toast.info(message, body)
      break
    case 'success':
      toast.success(message, body)
      break
    case 'warning':
      toast.warn(message, body)
      break
    case 'error':
      toast.error(message, body)
      break
    default:
      toast(message, body)

      break;
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
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {props.children}
    </HeaderContext.Provider>
  )
}

export { HeaderContext, HeaderProvider, CreateNotification }
