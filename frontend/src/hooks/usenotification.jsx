import { useState, useEffect } from 'react'

export default function useNotification(message, signal) {
  const init = () => {
    const initTimeOutIds = []
    const initNotifications = []

    if (message && signal) {
      initNotifications.push({ message, signal })

      const id = setTimeout(() => {
        setNotifications((prevNotifications) => [
          ...prevNotifications.slice(0, prevNotifications.length - 1),
        ])
      }, 30000)
      initTimeOutIds.push(id)
    }

    return [initTimeOutIds, initNotifications]
  }

  const [initTimeOutIds, initNotifications] = init()

  const [notifications, setNotifications] = useState(initNotifications)

  const [timeoutIds, setTimeoutIds] = useState(initTimeOutIds)

  const removeNotif = (index) => {
    // Remove notification with corresponding timeoutId.
    setNotifications((prevNotifications) => [
      ...prevNotifications.slice(0, index),
      ...prevNotifications.slice(index + 1),
    ])
    setTimeoutIds((prevTimeoutIds) => {
      const timeoutId = prevTimeoutIds.find((_, idx) => idx === index)
      clearTimeout(timeoutId)

      return [
        ...prevTimeoutIds.slice(0, index),
        ...prevTimeoutIds.slice(index + 1),
      ]
    })
  }

  const addNotif = (notification) => {
    if (notifications.length > 1) {
      removeNotif(1)
      setNotifications((prev) => [...prev, notification])
    } else setNotifications((prev) => [...prev, notification])

    // Remove last notification after 6s
    const timeoutId = setTimeout(() => {
      setNotifications((prevNotifications) => [
        ...prevNotifications.slice(0, prevNotifications.length - 1),
      ])
    }, 30000)
    setTimeoutIds((prev) => [...prev, timeoutId])
  }

  useEffect(() => {
    const [initNotifications, initTimeOutIds] = init()

    setNotifications(prev => [...prev, ...initNotifications])
    setTimeoutIds(prev => [...prev, initTimeOutIds])
  }, [message, signal])

  return {
    notifications,
    removeNotif,
    addNotif,
  }
}
