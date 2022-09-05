import { registerAs } from "@nestjs/config";

export default registerAs('typeormConfig', () => {
    return {
        database: process.env['TYPEORM_DATABASE']
    }
})