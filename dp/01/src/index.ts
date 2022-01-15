import { factory } from "./factory";
import { observer } from "./observer";
import { proxy } from "./proxy";
import { singleton } from "./singleton";

console.log("\n**** Running singleton pattern ...");
singleton();

console.log("\n**** Running Factory pattern ...");
factory();

console.log("\n**** Running Observer pattern ...");
observer();

console.log("\n**** Running Proxy pattern ...");
proxy();
