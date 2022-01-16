interface Driver1 {
    goto(destination: String): void;
}

class UberDriver1 implements Driver1 {
    goto(destination: String) {
        // drive to the destination
    }
}


class Ceo1 {

    constructor(private driver: Driver1){}

    visitBusinessPartner() {
      // 1. prepare presentation materials
      this.driver.goto("business partner's office")
      // 3. convince partner to cooperate with our company
    }
  }