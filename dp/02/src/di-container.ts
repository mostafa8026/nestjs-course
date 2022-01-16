import { createInjector } from "typed-inject";

interface Driver3 {
  goto(destination: String): void;
}

class UberDriver3 implements Driver3 {
  goto(destination: String) {
    // drive to the destination
    console.log("Automating the goto");
  }
}

class Ceo3 {
  constructor(private driver: Driver3) {}

  visitBusinessPartner() {
    // 1. prepare presentation materials
    this.driver.goto("business partner's office");
    // 3. convince partner to cooperate with our company
  }
}

const appInjector = createInjector().provideValue("driver", UberDriver3);

export function diContainer() {
  const driver = appInjector.resolve("driver");
}
