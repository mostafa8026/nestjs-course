import { registerAs } from "@nestjs/config"

export const appConfig = registerAs('appconfig', () => {
    return {
        port: +process.env['PORT']
    }
});