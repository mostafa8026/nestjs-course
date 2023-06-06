// interface Lawyer {
//   name: string;

//   goToCourt(driver: Driver): void;
// }

// interface Driver {
//   name: string;

//   drive(pointA: string, pointB: string, navigator: NavigatorInterface): void;
// }

// interface NavigatorInterface {
//   name: string;

//   navigate(pointA: string, pointB: string): void;
// }

// class LawyerNo1 implements Lawyer {
//   name: string;

//   constructor(name: string) {
//     this.name = name;
//   }

//   goToCourt(driver: Driver): void {
//     console.log(`I'm going to court By ${driver.name}`);
//     driver.drive('Here', 'Court', new GoogleNavigator());
//   }
// }

// class SnappDriver implements Driver {
//   name: string;

//   constructor(name: string) {
//     this.name = name;
//   }

//   drive(pointA: string, pointB: string, navigator: NavigatorInterface): void {
//     console.log(`${this.name}: I'm driving from ${pointA} to ${pointB}`);
//     navigator.navigate(pointA, pointB);
//   }
// }

// class GoogleNavigator implements NavigatorInterface {
//   name: string;

//   constructor() {
//     this.name = 'Google';
//   }

//   navigate(pointA: string, pointB: string): void {
//     console.log(`${this.name}: I'm navigating from ${pointA} to ${pointB}`);
//   }
// }

// const lawyer = new LawyerNo1('Ali');
// lawyer.goToCourt(new SnappDriver('Hassan'));