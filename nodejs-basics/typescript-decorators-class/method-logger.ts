import { mapper } from "./class-logger";

export function methodLogger(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log(`Method decorator called on: ${target.constructor.name}, ${propertyKey}`, descriptor);
    const originalMehod = descriptor.value;
    descriptor.value = function (...args: any[]) {
        const context = mapper[target.constructor.name];
        console.log(`Context is: ${context}`);
        console.log(`args are: `, args)
        return originalMehod.apply(this, args)
    }
    return descriptor;
}