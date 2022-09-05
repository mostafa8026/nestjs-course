import { registerAs } from "@nestjs/config";

export const userConfig = registerAs('userConfig', ()=>{
    return {
        ipUrl: process.env['IP_URL']
    }
})