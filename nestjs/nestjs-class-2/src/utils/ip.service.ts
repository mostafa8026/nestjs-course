import { Inject, Injectable } from "@nestjs/common";
import { IP_URL } from "./tokens.constant";
import got from 'got'

@Injectable()
export class IPService {

    constructor(@Inject(IP_URL) private ipUrl: string){
    }

    async getIP() {
        return await got.get(this.ipUrl);
    }
}