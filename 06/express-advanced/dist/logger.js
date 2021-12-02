"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
function logger(req, res, next) {
    console.log("Logging ...");
    next(); // remove it to see what will happen :)
}
exports.logger = logger;
