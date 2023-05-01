export function simpleLog(target: Function) {
    console.log(`Class ${target.name} was decorated`);
}

export function logMethod(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log(`Class ${target.name} was decorated with property ${propertyKey} and descriptor`, descriptor);
    console.log(`let's change the function behavior`);
    const originalFunction = descriptor.value;
    descriptor.value = function (...args: any[]) {
        console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')
        console.log(`Calling ${propertyKey} with arguments`, args);
        const result = originalFunction.apply(this, args);
        console.log(`Result of ${propertyKey} is`, result);
        console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')
        return result;
    }
    console.log('it changed')
    return descriptor;
}
