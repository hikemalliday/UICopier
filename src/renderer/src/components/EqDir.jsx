import { Input } from '@mui/material/'
import { useMainContext } from '../context/MainContext'

export function EqDir() {
  const { eqDir, setEqDir } = useMainContext()
  const handleEqDirChange = (e) => {
    console.log(eqDir)
    setEqDir(e.target.value)
  }

  return (
    <div className="eq-dir">
      <Input
        value={eqDir}
        onChange={handleEqDirChange}
        defaultValue="EqDir"
        placeholder="Eq Dir"
        sx={{
          input: {
            color: 'white',
            padding: '0',
            fontSize: 'smaller'
          }
        }}
      />
    </div>
  )
}

export default EqDir
