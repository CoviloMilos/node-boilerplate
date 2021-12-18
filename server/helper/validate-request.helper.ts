import { errors } from "../../config/constants/error.constant";
import { validateOrReject, ValidationError } from "class-validator";

// eslint-disable-next-line @typescript-eslint/ban-types
export const validateRequestBody = async (object: Object): Promise<void> => {
  try {
    await validateOrReject(object);
  } catch (error) {
    return Promise.reject(errors.invalidRequest(error as ValidationError[]));
  }
};
