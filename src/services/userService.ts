import userSchema from "../schemas/schemas";
import { createErrorMessage } from "../utils/functions";

const createUserService = async (body: object): Promise<object | void> => {
  const { error } = userSchema.validate(body);
  if (error) throw createErrorMessage(400, error.message);
};


export {
  createUserService,
}
