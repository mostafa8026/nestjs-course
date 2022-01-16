class Ceo {
  driver: Driver;

  constructor(){
      this.driver = new Driver();
  }

  visitBusinessPartner() {
    // 1. prepare presentation materials
    this.driver.goto("business partner's office");
    // 3. convince the partner to cooperate with our company
  }
}

class Driver {
  goto(destination: String) {
    // drive a car to destination
    console.log(`Arrive to the destination: ${destination}`);
  }
}
