const map: Map<string, any> = new Map();

@LogContext('AAAAAAA')
class ADecorator {
  @Logger()
  sayHi(name: string) {
    console.log('Hi', name)
  }

  @Logger()
  logSomething(text: string) {
    console.log(text);
  }
}

function LogContext(context: string) {
  return (target: Function) => {
    map.set(target.name, {
      context
    });
  }
}

function Logger() {
  return (
    target: ADecorator,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) => {
    console.log('target', target);
    console.log('propertyKey', propertyKey);
    console.log('descriptor', descriptor);

    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      console.log('args', args)
      const { context } = map.get(target.constructor.name);
      console.info('context ', context)
      return originalMethod.apply(this, args);
    }

    return descriptor;
  }
}

const a = new ADecorator();
a.sayHi('Mostafa');
