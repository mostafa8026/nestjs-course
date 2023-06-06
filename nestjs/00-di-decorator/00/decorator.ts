const contexts: Map<string, string> = new Map();

function SetContext(context: string) {
  return (target: any) => {
    contexts.set(target.name, context);
  }
}

function LoggerDecorator() {
  return (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) => {
    console.log('Decorator -> logger');
    console.log('target', target.constructor.name);
    console.log('propertyKey', propertyKey);
    console.log('descriptor', descriptor);
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      const context = contexts.get(target.constructor.name);
      console.log('context', context);
      console.log('Decorator -> logger -> before');
      const result = originalMethod.apply(this, args);
      console.log('Decorator -> logger -> after');
      return result;
    }
  }
}

@SetContext('User Class')
class User {
  name: string;

  @LoggerDecorator()
  sayHi(): string {
    console.log(`Hi, I am ${this.name}`);
    return 'Hi'
  }

  @LoggerDecorator()
  driveToWork(): void {
    console.log(`I'm Driving to work`)
  }
}

const user = new User();
user.sayHi();
user.driveToWork();

//console.log('contexts', contexts);

