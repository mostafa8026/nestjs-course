interface Lawyer {
  name: string;
  driver: Driver;

  goToCourt(): void;
  setDriver(driver: Driver): void;
}

interface Driver {
  name: string;
  navigator: NavigatorInterface;

  drive(pointA: string, pointB: string): void;
}

interface NavigatorInterface {
  name: string;

  navigate(pointA: string, pointB: string): void;
}

class LawyerNo1 implements Lawyer {
  name: string;
  driver: Driver;

  constructor(name: string) {
    this.name = name;
  }

  setDriver(driver: Driver): void {
    this.driver = driver;
  }

  goToCourt(): void {
    console.log(`I'm going to court By ${this.driver.name}`);
    this.driver.drive('Here', 'Court');
  }
}

class SnappDriver implements Driver {
  name: string;
  navigator: NavigatorInterface;

  constructor(name: string, navigator: NavigatorInterface) {
    this.name = name;
    this.navigator = navigator;
  }

  drive(pointA: string, pointB: string): void {
    console.log(`${this.name}: I'm driving from ${pointA} to ${pointB}`);
    this.navigator.navigate(pointA, pointB);
  }
}

class UberDriver extends SnappDriver {
}

class GoogleNavigator implements NavigatorInterface {
  name: string;

  constructor() {
    this.name = 'Google';
  }

  navigate(pointA: string, pointB: string): void {
    console.log(`${this.name}: I'm navigating from ${pointA} to ${pointB}`);
  }
}

const container = new DICointainer();

const lawyer = container.get('lawyer');
const googleNavigator = container.get('navigator');
const driver = container.get('driver');

lawyer.setDriver(driver);

lawyer.goToCourt();