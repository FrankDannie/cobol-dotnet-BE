import express from 'express'

import { apiDocs } from './apiDocs'
import { Repositories } from '../../../application/port'

/**
 *
 * @param repository
 * @returns  express.Router
 */
export const createRouter = (repository: Repositories): express.Router => {
  // create a new router
  const router = express.Router()
  /*
   *******apiDocs**********
   */
  // add the Swagger route to the router
  apiDocs(router)


  return router
}
