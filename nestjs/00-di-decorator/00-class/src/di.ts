const driverToken = 'DRIVER';
const navigatorToken = 'NAVIGATOR';
const lawyerToken = 'LAWYER';

type Factory = () => any;

class container {

  instances: Map<string, any> = new Map();
  instanceFactory: Map<string, Factory> = new Map();

  public getInstance(token: string) {
    const tokenInstance = this.instances.get(token);
    if (tokenInstance) {
      return this.instances.get(token);
    } else {
      const t = this.createInstance(token)
      this.instances.set(token, t);
      return t;
    }
  }

  createInstance(token: string): any {
    const factory = this.instanceFactory.get(token) as Factory;
    return factory();
  }

  bind(token: string, factory: Factory) {
    this.instanceFactory.set(token, factory);
  }
}


class Lawyer {
  driver: Driver;

  set Driver(driver: Driver) {
    this.driver = driver;
  }

  goToCourt() {
    console.log('I am going to court');
    this.driver.drive('Here', 'Counrt House');
  }
}

class Driver {
  navigator: RouteNavigator;

  set Navigator(navigator: RouteNavigator) {
    this.navigator = navigator;
  }

  drive(pointA: string, pointB: string) {
    console.log(`I am driving from ${pointA} to ${pointB}`);
    this.navigator.navigate(pointA, pointB);
  }
}

class SnappDriver extends Driver {
  drive(pointA: string, pointB: string): void {
    console.log(`I am a snapp driver, driving from ${pointA} to ${pointB} using Snapp`);
    this.navigator.navigate(pointA, pointB);
  }
}

class RouteNavigator {
  navigate(pointA: string, pointB: string) {
    console.log(`I am navigating from ${pointA} to ${pointB}`);
  }
}


const lawyer = new Lawyer();
const containert = new container();
containert.bind(lawyerToken, () => {
  return 2343423;
});
containert.bind(driverToken, () => {
  return new Driver()
});
containert.bind(navigatorToken, () => {
  return new Lawyer()
});

const driver = containert.getInstance(driverToken) as Driver;
driver.Navigator = containert.getInstance(navigatorToken) as RouteNavigator;

lawyer.Driver = driver;