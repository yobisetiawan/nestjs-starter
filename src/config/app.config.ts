import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port: parseInt(process.env.APP_PORT, 10) || 3222,
  baseUrl: process.env.APP_BASE_URL,
}));
