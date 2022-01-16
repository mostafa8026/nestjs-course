import { DIContainer } from "@wessberg/di";

// Creating a container...
const container = new DIContainer();

interface Driver3 {
  goto(destination: String): void;
}

class UberDriver3 implements Driver3 {
  goto(destination: String) {
    // drive to the destination
    console.log("Automating the goto");
  }
}

container.registerSingleton<Driver3, UberDriver3>();

class Ceo3 {
  constructor(private driver: Driver3) {}

  visitBusinessPartner() {
    // 1. prepare presentation materials
    this.driver.goto("business partner's office");
    // 3. convince partner to cooperate with our company
  }
}

container.registerSingleton<Ceo3>();

export function diContainer() {
  const ceo = container.get<Driver3>();
}
