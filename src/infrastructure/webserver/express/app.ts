import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
/**
 *  function that assign middlewares to express app and return it
 * @returns express.Express
 */
export const createApp = (): express.Express => {
  // create a new express app
  const app = express()

  /* Middlewares */

  // add the middlewares to the express app
  app.use(morgan('combined'))
  // parse application/json
  app.use(express.json())
  // parse application/x-www-form-urlencoded
  app.use(express.urlencoded({ extended: true }))
  // enable cors
  app.use(cors())
  // return the express app
  return app
}
