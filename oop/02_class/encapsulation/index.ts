import joi, { object } from "joi";

const s = joi.object({
  id: joi.number().min(0),
  name: joi.string(),
});

class User {
  private _id: number | undefined;
  _name: string | undefined;

  set id(id: number | undefined) {
    if (s.validate({ id: id })) {
      throw new Error("Id must be greater than 0");
    }
    this._id = id;
  }

  get id(): number | undefined {
    console.log("getter");
    return this._id;
  }
}

const u = new User();
u.id = 1;
console.log(u.id);
