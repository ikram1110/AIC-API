const db = require('../../config/database')

const dbService = (environment, migrate) => {
  const authenticateDB = () => db.sequelize.authenticate()
  const dropDB = () => db.sequelize.drop()
  const syncDB = () => db.sequelize.sync()

  const successfulDBStart = () =>
    console.info('connection to the database has been established successfully')

  const errorDBStart = (err) =>
    console.info('unable to connect to the database:', err)

  const wrongEnvironment = () => {
    console.warn(
      `only development, staging, and production are valid NODE_ENV variables but ${environment} is specified`
    )
    return process.exit(1)
  }

  const startMigrateTrue = async () => {
    try {
      await syncDB()
      successfulDBStart()
    } catch (err) {
      errorDBStart(err)
    }
  }

  const startMigrateFalse = async () => {
    try {
      await dropDB()
      await syncDB()
      successfulDBStart()
    } catch (err) {
      errorDBStart(err)
    }
  }

  const startDev = async () => {
    try {
      await authenticateDB()

      if (migrate) {
        return startMigrateTrue()
      }

      return startMigrateFalse()
    } catch (err) {
      return errorDBStart(err)
    }
  }

  const startProd = async () => {
    try {
      await authenticateDB()
      await startMigrateFalse()
    } catch (err) {
      errorDBStart(err)
    }
  }

  const start = async () => {
    switch (environment) {
      case 'development':
        await startDev()
        break
      case 'production':
        await startProd()
        break
      default:
        await wrongEnvironment()
    }
  }

  return {
    start,
  }
}

module.exports = dbService
