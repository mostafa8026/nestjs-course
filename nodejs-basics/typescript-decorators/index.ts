import { logMethod, simpleLog } from "./simple-log-decorator";

@simpleLog
class SimpleClass {
    name: string = '';

    constructor(name: string) {
        this.name = name;
    }

    @logMethod
    logName(makeItUppercase: boolean) {
        const name = this.name;
        if (makeItUppercase) {
            return name.toUpperCase();
        }
        console.log('Inside the main function')
        return name;
    }
}

console.log('=================================')
console.log('Start our program...')
const simpleClass = new SimpleClass('John');
simpleClass.logName(false);
console.log('=================================')