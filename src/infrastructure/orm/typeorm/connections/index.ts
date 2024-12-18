import retry from 'async-retry'
import { DataSource } from 'typeorm' // Use DataSource
import ormConfig from '../config/ormconfig'
import logger from '../../../logger/logger'

export const createConnection = async (): Promise<DataSource> => { // Return DataSource instead of Connection
  const maximum_retries = 10

  const dataSource = new DataSource(ormConfig) // Create a new instance of DataSource with ormConfig

  const connection = await retry(
    async () => {
      await dataSource.initialize() // Initialize the data source
      return dataSource // Return the initialized DataSource instance
    },
    {
      retries: maximum_retries,
      maxTimeout: 120 * 1000,
      onRetry: (e, attempt) => {
        logger.info(`${JSON.stringify(e)}`)
        logger.info(
          `Unable to connect to database; retrying (attempt: ${attempt}/${maximum_retries}).`
        )
      },
    }
  )

  return connection
}
