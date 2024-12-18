import * as dotenv from 'dotenv'

if (process.env.NODE_ENV !== 'production') {
  dotenv.config()
}

const red = '\x1b[31m'
const white = '\x1b[37m'

const loadAsString = (index: string, required = true): string | undefined => {
  const value: string | undefined = process.env[index]
  if (value === undefined && required) {
    const errorMessage = `Environment variable ${red}${index}${white} is not defined.\n`
    throw new Error(errorMessage)
  }
  return value
}

const loadAsNumber = (index: string): number => {
  const value: string | undefined = process.env[index]
  const asNumber = Number(value)
  if (value === undefined || isNaN(asNumber)) {
    const errorMessage = `Environment variable ${red}${index}${white} is not defined.\n`
    throw new Error(errorMessage)
  }
  return asNumber
}

// The `FSMYSQL_...` variables are for flexible Server.
export const env = {
  APPSERVER_PORT: loadAsNumber('APPSERVER_PORT'),
  DB_NAME: process.env.FSMYQL_DB_NAME ?? loadAsString('DB_NAME'),
  DB_HOST: process.env.FSMYSQL_DB_HOST ?? loadAsString('DB_HOST'),
  DB_PWD:
    process.env.FSMYSQL_JERAUSER_JMP_BE_PASSWORD ?? loadAsString('DB_PWD'),
  DB_PORT: Number(process.env.FSMYQL_DB_PORT) || loadAsNumber('DB_PORT'),
  DB_USER: process.env.FSMYSQL_USERNAME ?? loadAsString('DB_USER'),
  AZURE_STORAGE_ACCOUNT_NAME:
    process.env.AZURE_STORAGE_ACCOUNT_NAME ??
    loadAsString('AZURE_STORAGE_ACCOUNT_NAME'),
  AZURE_STORAGE_ACCOUNT_KEY:
    process.env.AZURE_STORAGE_ACCOUNT_KEY ??
    loadAsString('AZURE_STORAGE_ACCOUNT_KEY'),
  AZURE_CONTAINER_NAME:
    process.env.AZURE_CONTAINER_NAME ?? loadAsString('AZURE_CONTAINER_NAME'),
  SSL_CERT: loadAsString('SSL_CERT', false),
  NODE_ENV: loadAsString('NODE_ENV'),
  // DB_TEST_NAME: loadAsString('DB_TEST_NAME')
}
