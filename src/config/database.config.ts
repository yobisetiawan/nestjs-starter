import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  client: process.env.DATABASE_CLIENT,
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  logging: process.env.DATABASE_LOGGING === 'true',
  synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
}));
