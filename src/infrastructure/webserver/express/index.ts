import { env } from '../../env'

import { createApp } from './app'
import { Repositories } from '../../../application/port'
import { createRouter } from './routes'
import errorHandler from '../../../application/errors/ErrorHandler'
import logger from '../../logger/logger'

/**
 * function that create a web server with express and use  route
 *
 * @param repository
 * @returns void
 */
export const createServer = (repository: Repositories): void => {
  // create a new express app
  const app = createApp()
  // get the port from the environment
  const port = env.APPSERVER_PORT

  /* Router */
  // add the router to the express app
  app.use('/', createRouter(repository))

  // Error-handling middleware
  app.use(errorHandler)

  // make the express app listen to the port taken from the environment
  app.listen(port, () => {
    logger.info(`Server app listening at http://localhost:${port}`)
  })
}
