import { toast } from 'react-toastify'

export const pushNotification = (msg, type, position, duration) => {
  const toastProps = {
    position: position ? toast.POSITION[position] : toast.POSITION.TOP_CENTER,
    autoClose: duration ? duration : 3000,
    pauseOnFocusLoss: true,
    pauseOnHover: false,
    newestOnTop: true
  }

  switch(type){
    case "info":
      return toast.info(msg, {
       ...toastProps
      })
    
    case "success":
      return toast.success(msg, {
       ...toastProps
      })
    
    case "warning":
      return toast.warn(msg, {
       ...toastProps
      })
    
    case "error":
      return toast.error(msg, {
        ...toastProps
      })

    default:
      return toast.info(msg, {
        ...toastProps
      })
  }
};
