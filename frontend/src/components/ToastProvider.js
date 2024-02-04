import React from 'react'
import toast, { Toaster } from "react-hot-toast";


const ToastProvider = () => {
  return (
    <Toaster
    position="top-right"
    toastOptions={{
      success: {
        style: {
          background: 'green',
          color: 'white'
        },
      },
      error: {
        style: {
          background: 'red',
          color: 'white'
        },
      },
    }}
  />
  )
}

export default ToastProvider