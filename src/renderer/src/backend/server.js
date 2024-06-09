import express from 'express'
import cors from 'cors'
import { dbObject, doesEqDirTableExist, getEqDir } from './database.js'
import { copyUi } from './logic'

export const startExpressServer = () => {
  console.log('startExpressServer')
  const app = express()
  const PORT = 3001
  app.use(express.json())
  app.use(cors())

  app.get('/getEqDir', async (req, res) => {
    try {
      const exists = doesEqDirTableExist()
      if (exists === true) {
        const eqDir = getEqDir()
        res.json({ message: 'EqDir fetched successfully.', payload: eqDir })
      } else {
        res.json({ message: 'Error: /getEqDir' })
      }
    } catch (error) {
      console.error(error)
    }
  })

  app.post('/copyUi', async (req, res) => {
    try {
      const { from, to, eqDir } = req.body
      console.log('req.query: ', req.body)
      const success = copyUi(from, to, eqDir)
      if (success === true) {
        console.log(`UI file for "${to}" created.`)
        res.json({ message: `UI file for "${to}" created.` })
      } else {
        console.log(`ERROR: UI file creation for "${to}" failed.`)
        res.json({ message: `ERROR: UI file creation for "${to}" failed.` })
      }
    } catch (error) {
      console.error(error)
      res.json({ message: `ERROR: ${error}` })
    }
  })

  app.listen(PORT, () => {
    console.log(`Express server is running on: http://localhost:${PORT}`)
  })
  // In STABLESElectron, these are not inside the 'startExpressServer' call, why?
}
process.on('exit', () => {
  console.log('****************')
  console.log('server.exit')
  console.log('****************')
  dbObject.db.close()
  console.log('db connection closed')
})

process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err)
  dbObject.db.close()
  process.exit(1)
})
