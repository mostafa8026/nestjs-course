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
  constructor(private driver: DriverInterface) {}

  visitBussinessPartner(partnerLocation: string) {
    console.log(
      `ceo: I want to meet a bussiness partner at the ${partnerLocation}`
    );
    this.driver.drive(partnerLocation);
    console.log(`ceo: I arrive at the location`);
  }
}

export function diConstructor(){
    let ceo = new CEO(new SnappDriver());
    ceo.visitBussinessPartner('Mashad');
}