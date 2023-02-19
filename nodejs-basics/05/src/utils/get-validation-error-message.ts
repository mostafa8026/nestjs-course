import { ValidationError } from "class-validator";

export function getValidationErrorMessage(error: ValidationError[]): string {
  /**
   * Retrieve the messages concatinated by comma
   */
  const messages = error.map((error) => {
    if (error.constraints) {
      return Object.values(error.constraints).join(", ");
    } else {
      return "";
    }
  }).join("\n");
  return messages;
}