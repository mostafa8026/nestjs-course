interface Publication {
  subscribe(user: Observer): void;
  unsubscribe(user: Observer): void;

  newPublish(): void;
}

class Magazine implements Publication {
  subscribers: Observer[] = [];
  subscribe(user: Observer): void {
    if (this.subscribers.indexOf(user) == -1) {
      this.subscribers.push(user);
      console.log("Subject: You are successfuly subscribed to Magazine");
    } else {
      console.log("Subject: You already subscribed!");
    }
  }
  unsubscribe(user: Observer): void {
    const index = this.subscribers.indexOf(user);
    if (index >= 0) {
      this.subscribers.splice(index, 1);
    }
  }
  newPublish(): void {
    console.log("Subject: new publish");
    this.subscribers.forEach((x) => {
      x.notifyMe();
    });
  }
}

interface Observer {
  notifyMe(): void;
}

class User implements Observer {
  notifyMe(): void {
    console.log("Observer: I receive new publish");
  }
}

export function observer() {
  let m = new Magazine();

  let o1 = new User();
  let o2 = new User();

  m.subscribe(o1);
  m.subscribe(o1);
  m.subscribe(o2);

  m.newPublish();

  m.unsubscribe(o1);

  m.newPublish();
}
