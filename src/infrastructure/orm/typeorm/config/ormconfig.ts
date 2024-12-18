import { env } from '../../../env'
import { DataSourceOptions  } from "typeorm";

// To know why {.ts,.js} is needed please refer:
// https://stackoverflow.com/a/57140038

// const DB_NAME = env.NODE_ENV === 'test' ? env.DB_TEST_NAME : env.DB_NAME;
const DB_NAME = env.NODE_ENV === 'test' ? 'todo_test' : env.DB_NAME

const dataSource:DataSourceOptions =({
  type: 'mysql',
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USER,
  password: env.DB_PWD,
  database: DB_NAME,
  synchronize: true,
  logging: true,
  entities: ['src/infrastructure/orm/typeorm/entities/**/*{.ts,.js}'],
  ssl:
    env.SSL_CERT === undefined
      ? { rejectUnauthorized: false }
      : { cert: Buffer.from(env.SSL_CERT, 'base64') },
})

// This is needed for typeorm's migration script.
export default dataSource
