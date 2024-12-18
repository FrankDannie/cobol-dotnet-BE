import * as Express from 'express'
import * as swaggerUI from 'swagger-ui-express'
import * as swaggerDocument from '../../../../_api-docs/swagger.json'
/**
 *  function that set the swagger route to the router
 * @param router
 */
export const apiDocs = (router: Express.Router): void => {
  // Serves static swagger.json
  router.use('/api-docs/swagger.json', Express.static('_api-docs/swagger.json'))

  // Serves Swagger UI set to the base URL
  router.use('/api-docs', swaggerUI.serve)
  // Serves Swagger UI setup the Swagger document
  router.get('/api-docs', swaggerUI.setup(swaggerDocument))
}
