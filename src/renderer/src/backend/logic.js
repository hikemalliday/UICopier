import fs from 'fs'
import { setEqDir } from './database'

export const copyUi = (from, to, eqDir) => {
  try {
    let boolean = true
    const dir = fs.readdirSync(eqDir)
    const from1 = `${from}_P1999PVP.ini`
    const from2 = `UI_${from}_P1999PVP.ini`
    const to1 = `${to}_P1999PVP.ini`
    const to2 = `UI_${to}_P1999PVP.ini`

    for (const file of dir) {
      if (file === from1 || file === from2) {
        setEqDir(eqDir)
        const filePath = `${eqDir}/${file}`
        const fileContent = fs.readFileSync(filePath, 'utf8')
        const newFilePath = `${eqDir}/${file.startsWith('UI_') ? to2 : to1}`
        try {
          fs.writeFileSync(newFilePath, fileContent, 'utf8')
          boolean = true
        } catch (err) {
          console.log('ERROR: copyUI.write attempt ')
          boolean = false
        }
      }
    }
    return boolean
  } catch (error) {
    console.log(error)
    return false
  }
}
