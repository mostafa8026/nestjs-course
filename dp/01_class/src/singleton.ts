class TribeService {
  name: string = "";
  static instance: TribeService = null;

  constructor(_name: string) {
    this.name = _name;
  }

  insert() {}

  static getInstance(name: string) {
      if(this.instance == null) {
          this.instance = new TribeService(name);
      }

      return this.instance;
  }

  log() {
    console.log(`${this.name}, Tribe Service ...`);
  }
}

export function singleton() {
  TribeService.getInstance("tribe 1").log();
  let ts2 = TribeService.getInstance("tribe 2");
  ts2.log();
}
