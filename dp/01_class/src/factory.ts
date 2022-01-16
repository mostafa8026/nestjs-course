interface Logistic {
  create(): Transport;
}

class RoadLogistic implements Logistic {
  create(): Transport {
    return new Truck();
  }
}

class SeaLogistic implements Logistic {
  create(): Transport {
    return new Ship();
  }
}

class AirLogistic implements Logistic {
  create(): Transport {
    return new Ship();
  }
}

interface Transport {
  deliver(): void;
}

class Truck implements Transport {
  deliver(): void {
    console.log("Truck");
  }
}

class Ship implements Transport {
  deliver(): void {
    console.log("Ship");
  }
}

class Airplane implements Transport {
  deliver(): void {
    console.log("Airplane");
  }
}

export function factory() {
  let r = new RoadLogistic();
  const c = r.create();

  c.deliver();

  let s = new SeaLogistic();
  const a = s.create();
  a.deliver();
}
