class DICointainer {

  instances: Map<string, any> = new Map();

  provide(token: 'lawyer' | 'driver' | 'navigator'): any {
    switch (token) {
      case 'lawyer':
        return new LawyerNo1('Ali');
      case 'driver':
        return new UberDriver('Hassan', this.provide('navigator'));
      case 'navigator':
        return new GoogleNavigator();
    }
  }

  get(token: 'lawyer' | 'driver' | 'navigator'): any {
    if (this.instances.has(token)) {
      return this.instances.get(token);
    }
    const instance = this.provide(token);
    this.instances.set(token, instance);
    return instance;
  }
}