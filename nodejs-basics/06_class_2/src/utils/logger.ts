import dotenv from 'dotenv';
import winston from 'winston';
dotenv.config()

console.log(process.env.LOG_LEVEL)
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL,
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple()
  ),
  transports: [
    new winston.transports.Console(),
  ],
});


export default logger;
