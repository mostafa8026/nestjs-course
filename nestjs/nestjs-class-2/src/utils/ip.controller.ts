import { Controller, Get } from "@nestjs/common";

@Controller('url-ip')
export class IPController {
    @Get()
    getURL() {
        return 'https://ifconfig.ovh';
    }
}