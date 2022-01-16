import { createInjector } from "typed-inject";

interface DriverInterface {
  navigator: NavigatorInterface;

  drive(destination: string): void;
}

interface NavigatorInterface {
  navigate(start: string, destination: string): string[];
}

class GoogleMapsNavigator implements NavigatorInterface {
  public static inject = [] as const;

  navigate(start: string, destination: string): string[] {
    console.log(`navigating from ${start} to ${destination}`);
    let places: string[] = [];
    places.push(start);
    places.push("Gonabad");
    places.push(destination);

    return places;
  }
}

class NeshanNavigator implements NavigatorInterface {
  public static inject = [] as const;

  navigate(start: string, destination: string): string[] {
    console.log(`navigating from ${start} to ${destination}`);
    let places: string[] = [];
    places.push(start);
    places.push("Ghaen");
    places.push(destination);

    return places;
  }
}

class SnappDriver implements DriverInterface {
  public static inject = ["navigator"] as const;

  constructor(public navigator: NavigatorInterface) {}

  drive(destination: string): void {
    this.navigator.navigate("here", destination);

    console.log(`snapp driver: I'm driving to the destination: ${destination}`);
  }
}

class PersonalDriver implements DriverInterface {
  public static inject = ["navigator"] as const;

  constructor(public navigator: NavigatorInterface) {}

  drive(destination: string): void {
    this.navigator.navigate("here", destination);

    console.log(
      `personal driver: I'm driving to the destination: ${destination}`
    );
  }
}

class CEO {
  public static inject = ["driver"] as const;

  constructor(private driver: DriverInterface) {}

  visitBussinessPartner(partnerLocation: string) {
    console.log(
      `ceo: I want to meet a bussiness partner at the ${partnerLocation}`
    );
    this.driver.drive(partnerLocation);
    console.log(`ceo: I arrive at the location`);
  }
}

export function diContainer() {
  const appInjector = createInjector()
    .provideClass("navigator", GoogleMapsNavigator)
    .provideClass("driver", PersonalDriver)
    .provideClass("ceo", CEO);

  const ceo = appInjector.resolve("ceo");
  ceo.visitBussinessPartner("Mashad");
}

export function diConstructor() {
  let ceo = new CEO(new SnappDriver(new GoogleMapsNavigator()));
  ceo.visitBussinessPartner("Mashad");
}
