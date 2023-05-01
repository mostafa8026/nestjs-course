import { IsString } from "class-validator";
import { classLogger } from "./class-logger";
import { methodLogger } from "./method-logger";

@classLogger('Mostafa')
export class UserDto {
    @IsString()
    name: string = '';

    constructor(name: string) {
        this.name = name;
    }

    @methodLogger
    logName(makeItUppercase: boolean) {
        if (makeItUppercase) {
            console.log(this.name.toUpperCase());
        } else {
            console.log(this.name);
        }
    }
}