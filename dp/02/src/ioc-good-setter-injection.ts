interface Driver2 {
  goto(destination: String): void;
}

class UberDriver2 implements Driver2 {
  goto(destination: String) {
    // drive to the destination
  }
}

class Ceo2 {
  private driver: Driver2 = null;

  setDriver(driver: Driver) {
    this.driver = driver;
  }

  visitBusinessPartner() {
    // 1. prepare presentation materials
    this.driver?.goto("business partner's office");
    // 3. convince partner to cooperate with our company
  }
}
