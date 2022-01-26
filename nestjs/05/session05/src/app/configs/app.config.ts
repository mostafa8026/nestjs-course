import { registerAs } from '@nestjs/config';

export default registerAs('root', () => {
  return {
    environemt: process.env.NODE_ENV || 'development',
    database: {
      host: process.env.HOST,
      port: parseInt(process.env.PORT, 10) || 1533,
    },
  };
});
