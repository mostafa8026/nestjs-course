/**
 * Attention: Written in TypeScript.
 * You can run it by installing TypeScript and running `npx ts-node weather.ts`.
 * 
 * 
 * Here we have a simple weather station (subject) that can be observed by multiple
 * weather displays (observers). The weather station notifies all of its observers
 * when the weather changes.
 */

/**
 * The Observer interface declares the update method, used by subjects.
 */
interface Observer {
  update(temperature: number, humidity: number, pressure: number): void;
}

/**
 * The Subject interface declares a set of methods for managing subscribers.
 */
interface Subject {
  registerObserver(observer: Observer): void;
  removeObserver(observer: Observer): void;
  notifyObservers(): void;
}

/**
 * The Subject owns some important state and notifies observers when the state
 */
class WeatherStation implements Subject {
  private observers: Observer[] = [];
  private temperature: number = 0;
  private humidity: number = 0;
  private pressure: number = 0;

  registerObserver(observer: Observer) {
    this.observers.push(observer);
  }

  removeObserver(observer: Observer) {
    const index = this.observers.indexOf(observer);
    if (index >= 0) {
      this.observers.splice(index, 1);
    }
  }

  /**
   * Trigger an update in each subscriber.
   */
  notifyObservers() {
    for (const observer of this.observers) {
      observer.update(this.temperature, this.humidity, this.pressure);
    }
  }

  /**
   * Set new measurements and notify observers.
   * @param temperature The temperature in degrees Celsius.
   * @param humidity The humidity in percent.
   * @param pressure The pressure in hectopascals.
   */
  setMeasurements(temperature: number, humidity: number, pressure: number) {
    this.temperature = temperature;
    this.humidity = humidity;
    this.pressure = pressure;
    this.notifyObservers();
  }
}

/**
 * The Observer interface declares the update method, used by subjects.
 */
class WeatherDisplay implements Observer {
  private temperature: number = 0;
  private humidity: number = 0;
  private pressure: number = 0;

  /**
   * Receive update from subject.
   * @param temperature The temperature in degrees Celsius.
   * @param humidity The humidity in percent.
   * @param pressure The pressure in hectopascals.
   */
  update(temperature: number, humidity: number, pressure: number) {
    this.temperature = temperature;
    this.humidity = humidity;
    this.pressure = pressure;
    this.display();
  }

  /**
   * Display weather data.
   */
  display() {
    console.log(`Temperature: ${this.temperature}°C, Humidity: ${this.humidity}%, Pressure: ${this.pressure}hPa`);
  }
}

/**
 * The client code.
 */

const weatherStation = new WeatherStation();
const display1 = new WeatherDisplay();
const display2 = new WeatherDisplay();
const display3 = new WeatherDisplay();

weatherStation.registerObserver(display1);
weatherStation.registerObserver(display2);
weatherStation.registerObserver(display3);

weatherStation.setMeasurements(25, 60, 1013);
weatherStation.setMeasurements(24, 55, 1009);

weatherStation.removeObserver(display2);

weatherStation.setMeasurements(23, 50, 1012);

/**
 * Output:
 * Temperature: 25°C, Humidity: 60%, Pressure: 1013hPa
 * Temperature: 25°C, Humidity: 60%, Pressure: 1013hPa
 * Temperature: 25°C, Humidity: 60%, Pressure: 1013hPa
 * Temperature: 24°C, Humidity: 55%, Pressure: 1009hPa
 * Temperature: 24°C, Humidity: 55%, Pressure: 1009hPa
 * Temperature: 24°C, Humidity: 55%, Pressure: 1009hPa
 * 
 * Temperature: 23°C, Humidity: 50%, Pressure: 1012hPa
 * Temperature: 23°C, Humidity: 50%, Pressure: 1012hPa
 */