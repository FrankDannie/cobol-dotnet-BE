import { env } from '../../env'

import { createApp } from './app'
import { createRouter } from './routes'
import logger from '../../logger/logger'
import { Repositories } from '../../../application/port'

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


  // make the express app listen to the port taken from the environment
  app.listen(port, () => {
    logger.info(`Server app listening at http://localhost:${port}`)
  })
}
