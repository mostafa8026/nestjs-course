class Requester {
  role: string;
  request() {
    console.log("new request");
  }
}

class ProxyRequest {
  realClass: Requester;

  constructor(_realClass: Requester) {
    this.realClass = _realClass;
  }

  proxyRequest() {
    if (this.realClass.role == "manager") {
      this.realClass.request();
    } else {
      console.log(`You're not authorized to run this function`);
    }
  }
}

export function proxy() {
  let c = new Requester();
  c.role = "user";
  let p = new ProxyRequest(c);

  p.proxyRequest();

  let c2 = new Requester();
  c2.role = "manager";
  let p2 = new ProxyRequest(c2);

  p2.proxyRequest();
}
