import JWT from "jsonwebtoken";

export const Sign_Access_JWT = (obj) => {
  const token = JWT.sign(obj, process.env.JWT_Access_Secret, {
    expiresIn: "1d",
  });
  return token;
};

export const Verify_Access_JWT = (token) => {
  try {
    return JWT.verify(token, process.env.JWT_Access_Secret);
  } catch (error) {
    console.log(error.message);
  }
};
