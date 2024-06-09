import React, { useState } from 'react'
import { TextField, Button } from '@mui/material'
import { copyUi } from '../fetches'
import { useMainContext } from '../context/MainContext'

export const Form = () => {
  const { eqDir, setLogData } = useMainContext()
  const [to, setTo] = useState('')
  const [from, setFrom] = useState('')

  const handleFromChange = (e) => {
    setFrom(e.target.value)
  }

  const handleToChange = (e) => {
    setTo(e.target.value)
  }

  // Might need to refactor how we handle the payload, both here and at 'fetches.ts'
  const handleCopy = async (payload) => {
    const response = await copyUi(payload)
    if (response !== null) {
      setLogData(response)
    }
    return null
  }

  return (
    <div className="form-main-container">
      <div className="inputs-container">
        <TextField
          value={from}
          onChange={handleFromChange}
          style={{ backgroundColor: '#292929' }}
          sx={{ input: { color: 'white' } }}
          label="FROM"
          variant="filled"
        />
        <TextField
          value={to}
          onChange={handleToChange}
          style={{ backgroundColor: '#292929' }}
          sx={{ input: { color: 'white' } }}
          label="TO"
          variant="filled"
        />
      </div>
      <Button variant="outlined" onClick={() => handleCopy({ eqDir: eqDir, from: from, to: to })}>
        COPY
      </Button>
    </div>
  )
}
