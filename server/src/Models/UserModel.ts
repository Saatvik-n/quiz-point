import { prop, getModelForClass } from "@typegoose/typegoose";


class User {
  @prop({required: true, unique: true})
  public username!: string;

  @prop({required: true})
  public name!: string;

  @prop({required: true})
  public password!: string;
}

export const userModel = getModelForClass(User, {
  schemaOptions: {collection: "users"}
})