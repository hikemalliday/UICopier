import Database from 'better-sqlite3'
import path from 'path'
import { app } from 'electron'

const dbPath = path.join(app.getPath('userData'), 'master.db')

export const dbObject = { db: new Database(`${dbPath}`) }

export const doesEqDirTableExist = () => {
  try {
    const tableName = 'eqDir'
    const query = "SELECT name FROM sqlite_master WHERE type = 'table' AND name=?"
    const result = dbObject.db.prepare(query).get(tableName)
    if (result) {
      console.log(`Table ${tableName} exists.`)
      return true
    } else {
      console.log(`Table ${tableName} does not exist.`)
      return false
    }
  } catch (err) {
    console.log('Error:', err.message)
    return false
  }
}

export const createEqDirTable = () => {
  try {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS eqDir (
            eqDir TEXT
        )
        `
    dbObject.db.exec(createTableQuery)
    console.log('eqDir table created.')
  } catch (error) {
    console.error(error)
  }
}

// We may not need to assert if the table exists here
export const setEqDir = (eqDir) => {
  const tableExists =
    dbObject.db
      .prepare("SELECT count(*) as count FROM sqlite_master WHERE type='table' AND name='eqDir'")
      .get().count > 0
  if (tableExists === false) {
    console.error("The 'EqDir' table does not exist in the database.")
    createEqDirTable()
  }
  dbObject.db.exec('DELETE FROM eqDir')
  try {
    const transact = dbObject.db.transaction(() => {
      const eqDirInsert = dbObject.db.prepare(`INSERT INTO eqDir (eqDir) VALUES (?)`)
      eqDirInsert.run(eqDir)
    })
    transact()
    console.log('EqDir set successfully!')
  } catch (err) {
    console.log(err)
    return false
  }
  return true
}

// Not sure if needed
export const getEqDir = () => {
  createEqDirTable()
  try {
    const firstRow = dbObject.db.prepare('SELECT * FROM eqDir LIMIT 1').get()
    if (firstRow) return firstRow.eqDir
  } catch (err) {
    console.log(err)
  }
}
