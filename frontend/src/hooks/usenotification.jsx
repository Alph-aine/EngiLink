import { useState } from 'react'

export default function useNotification(message, signal) {
  const [notifications, setNotifications] = useState([
    (() => {
      if (message && signal) return { message, signal }
    })(),
  ])

  const [timeoutIds, setTimeoutIds] = useState([
    (() => {
      if (message && signal)
        return setTimeout(() => {
          setNotifications((prevNotifications) => [
            ...prevNotifications.slice(0, prevNotifications.length - 1),
          ])
        }, 30000)
    })(),
  ])

  const removeNotif = (index) => {
    console.log('Index: ', index)
    // Remove notification with corresponding timeoutId.
    setNotifications((prevNotifications) => [
      ...prevNotifications.slice(0, index),
      ...prevNotifications.slice(index + 1),
    ])
    setTimeoutIds((prevTimeoutIds) => {
      const timeoutId = prevTimeoutIds.find((_, idx) => idx === index)
      console.log('TimoutId: ', timeoutId)
      clearTimeout(timeoutId)

      return [
        ...prevTimeoutIds.slice(0, index),
        ...prevTimeoutIds.slice(index + 1),
      ]
    })
  }

  const addNotif = (notification) => {
    if (notifications.length > 2) {
      removeNotif(1)
      setNotifications((prev) => [...prev, notification])
    }
    else setNotifications((prev) => [...prev, notification])

    // Remove last notification after 6s
    const timeoutId = setTimeout(() => {
      setNotifications((prevNotifications) => [
        ...prevNotifications.slice(0, prevNotifications.length - 1),
      ])
    }, 30000)
    setTimeoutIds((prev) => [...prev, timeoutId])
  }

  return {
    notifications,
    removeNotif,
    addNotif,
  }
}
