class Driver {
  drive(destination: string) {
    console.log(`driver: I'm driving to the destination: ${destination}`);
  }
}

class SnappDriver {
  drive(destination: string) {
    console.log(`snapp driver: I'm driving to the destination: ${destination}`);
  }
}

class CEO {
  visitBussinessPartner(driver: Driver, partnerLocation: string) {
    console.log(
      `ceo: I want to meet a bussiness partner at the ${partnerLocation}`
    );
    driver.drive(partnerLocation);
    console.log(`ceo: I arrive at the location`);
  }
}

export function badWay() {
  let ceo = new CEO();
  let driver = new SnappDriver();
  ceo.visitBussinessPartner(driver, "Mashad");
}
