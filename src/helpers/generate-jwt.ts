import jwt from "jsonwebtoken";

const generateJWT = (uid: string) => {
  return new Promise((resolve, reject) => {
    const payload = { uid };
    jwt.sign(
      payload,
      process.env.SECRET_KEY || "",
      {
        expiresIn: "1h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("You are could not generate Token.");
        } else {
          resolve(token);
        }
      }
    );
  });
};

export default generateJWT;
