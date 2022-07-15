export interface DatabaseConfig {
  host: string
  port: string
  database: string
  username: string
  password: string
  authSource: string
}

export default {
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  database: process.env.POSTGRES_DB,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,

  getConfig(): DatabaseConfig {
    return {
      ...this.get('database'),
      type: 'postgres',
      entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
      synchronize: !!process.env.DEBUG,
    }
  },
}

