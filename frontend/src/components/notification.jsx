import React, { useState, useEffect } from 'react'
import Text from './text'

const Notification = ({ message, signal }) => {
  const [notifications, setNotifications] = useState([])
  const handleClose = (index) =>
    setNotifications((prevNotifications) => [
      ...prevNotifications.slice(0, index),
      ...prevNotifications.slice(index + 1),
    ])

  useEffect(() => {
    // Add notification only if message is different from the last one
    if (message && signal) {
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        { message, signal },
      ])
    }

    // Remove last notification after 1 minute
    const timeoutId = setTimeout(() => {
      setNotifications((prevNotifications) => [
        ...prevNotifications.slice(0, prevNotifications.length - 1),
      ])
    }, 6000) // 60 seconds in milliseconds

    return () => clearTimeout(timeoutId) // Cleanup function to clear timeout when component unmounts
  }, [message, signal])

  const borderClasses = {
    TIP: 'border-yellow-500',
    MSG: 'border-green-500',
    BAD: 'border-red-500',
  }

  const textClasses = {
    TIP: 'text-yellow-500',
    MSG: 'text-green-500',
    BAD: 'text-red-500',
  }

  return (
    <div className='absolute top-0 left-0 right-0 z-50 md:px-9 px-5 mt-5 overflow-y-auto h-40 bg-transparent flex flex-col items-start space-y-4'>
      {notifications.map((notification, index) => (
        <div
          key={notification.message + index}
          className={`flex justify-between items-center gap-3 p-2 w-full rounded-lg shadow-md bg-white border ${
            borderClasses[notification.signal]
          }`}
        >
          <Text size='sm'>
            <span className={textClasses[notification.signal]}>
              {notification.message}
            </span>
          </Text>
          <button
            type='button'
            className='text-gray-400 hover:text-gray-500'
            onClick={() => handleClose(index)}
          >
            <svg
              className='w-4 h-4'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div>
      ))}
    </div>
  )
}

export default Notification
