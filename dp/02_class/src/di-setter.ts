interface DriverInterface {
  drive(destination: string): void;
}

class SnappDriver implements DriverInterface {
  drive(destination: string): void {
    console.log(`snapp driver: I'm driving to the destination: ${destination}`);
  }
}

class PersonalDriver implements DriverInterface {
  drive(destination: string): void {
    console.log(
      `personal driver: I'm driving to the destination: ${destination}`
    );
  }
}

class CEO {
  driver: DriverInterface;
  constructor() {}

  setDriver(_driver: DriverInterface) {
    this.driver = _driver;
  }

  visitBussinessPartner(partnerLocation: string) {
    if (!this.driver) {
      throw new Error("You must call the setDriver before using this function");
    }
    console.log(
      `ceo: I want to meet a bussiness partner at the ${partnerLocation}`
    );
    this.driver.drive(partnerLocation);
    console.log(`ceo: I arrive at the location`);
  }
}

export function diConstructor() {
  let ceo = new CEO();
  ceo.setDriver(new PersonalDriver());
  ceo.visitBussinessPartner("Mashad");

  ceo.setDriver(new SnappDriver());
  ceo.visitBussinessPartner("Birjand");
}
