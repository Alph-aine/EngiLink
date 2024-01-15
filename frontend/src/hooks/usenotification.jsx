import { useState } from 'react'

export default function useNotification(message, signal) {
  const [notifications, setNotifications] = useState([
    () => {
      if (message && signal) return message, signal
    },
  ])
  const [timeoutIds, setTimeoutIds] = useState([
    () => {
      if (message && signal)
        return setTimeout(() => {
          setNotifications((prevNotifications) => [
            ...prevNotifications.slice(0, prevNotifications.length - 1),
          ])
        }, 6000)
    },
  ])

  return {
    notifications,
    removeNotif: (index) => {
      // Remove notification with corresponding timeoutId.
      setNotifications((prevNotifications) => [
        ...prevNotifications.slice(0, index),
        ...prevNotifications.slice(index + 1),
      ])
      setTimeoutIds((prevTimeoutIds) => {
        const timeoutId = prevTimeoutIds.find((id, idx) => idx === index)
        clearTimeout(timeoutId)

        return [
          ...prevTimeoutIds.slice(0, index),
          ...prevTimeoutIds.slice(index + 1),
        ]
      })
    },
    addNotif: (notification) => {
      setNotifications((prev) => [...prev, notification])

      // Remove last notification after 6s
      const timeoutId = setTimeout(() => {
        setNotifications((prevNotifications) => [
          ...prevNotifications.slice(0, prevNotifications.length - 1),
        ])
      }, 6000)
      setTimeoutIds((prev) => [...prev, timeoutId])
    },
  }
}
