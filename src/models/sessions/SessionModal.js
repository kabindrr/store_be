import SessionSchema from "./SessionSchema.js";

export const createNewSession = (sessionObj) => {
  return SessionSchema(sessionObj).save();
};
