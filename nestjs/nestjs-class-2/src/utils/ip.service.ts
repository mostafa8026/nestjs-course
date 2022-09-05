import { Inject, Injectable } from "@nestjs/common";
import { UTIL_MODULE_CONFIG_OPTIONS } from "./tokens.constant";
import got from 'got'
import { UtilModuleConfigOptions } from "./ip-async-options.interface";

@Injectable()
export class IPService {

    constructor(
        @Inject(UTIL_MODULE_CONFIG_OPTIONS)
        private utilModuleConfigOptions: UtilModuleConfigOptions
    ) {
        console.log(this.utilModuleConfigOptions);
    }

    async getIP() {
        console.log(this.utilModuleConfigOptions)
        return await got.get(this.utilModuleConfigOptions.ipUrl);
    }
}