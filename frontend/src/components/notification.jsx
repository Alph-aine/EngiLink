import React, { useState, useEffect, useRef } from 'react'

const Notification = ({ message, signal }) => {
  const [notifications, setNotifications] = useState([])
  const notificationRef = useRef(null)

  useEffect(() => {
    const slideDown = () => {
      notificationRef.current.style.transform = `translateY(-40px)`
      notificationRef.current.style.opacity = 1
    }

    const autoClose = () => {
      setTimeout(() => {
        setNotifications((prevNotifications) => prevNotifications.slice(1))
      }, 60000) // Close after 1 minute
    }

    slideDown()
    autoClose()
  }, [notifications])

  const handleClose = () => {
    setNotifications((prevNotifications) => prevNotifications.slice(1))
  }

  useEffect(() => {
    // Add notification only if message is different from the last one
    if (
      !notifications.length ||
      notifications[notifications.length - 1].message !== message
    ) {
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        { message, signal },
      ])
    }
  }, [message, signal, notifications])

  const borderClasses = {
    ERROR: 'border-red-500',
    TIP: 'border-yellow-500',
    MSG: 'border-blue-500',
  }

  return (
    <div className='fixed top-0 left-0 right-0 z-50 overflow-y-auto max-h-40 flex flex-col items-start space-y-4'>
      {notifications.map((notification, index) => (
        <div
          key={index}
          ref={notification === notifications[0] ? notificationRef : null}
          className={`p-4 rounded-lg shadow-md bg-white ${
            borderClasses[notification.signal]
          }`}
        >
          <p className='text-sm font-medium'>{notification.message}</p>
          <button
            type='button'
            className='text-gray-400 hover:text-gray-500'
            onClick={handleClose}
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
