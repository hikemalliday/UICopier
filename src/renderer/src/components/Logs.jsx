import React from 'react'
import { useMainContext } from '../context/MainContext'
export const Logs = () => {
  // Possibly need to refactor the way we handle the log data, at MainContext, Form, and here
  const { logData } = useMainContext()
  return <div>{logData}</div>
}
