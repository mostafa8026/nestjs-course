"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const s = joi_1.default.object({
    id: joi_1.default.number().min(0),
    name: joi_1.default.string(),
});
class User {
    set id(id) {
        if (s.validate({ id: id })) {
            throw new Error("Id must be greater than 0");
        }
        this._id = id;
    }
    get id() {
        console.log("getter");
        return this._id;
    }
}
const u = new User();
u.id = 1;
console.log(u.id);
