import { Request, Response } from "express";
import * as admin from "firebase-admin";

// A middleware that will check if a user is authenticated according to its token
export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: Function
) => {
  // No authorization header
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send({ error: "No auth" });
  }
  // No correct scheme (Bearer)
  if (!authorization.startsWith("Bearer")) {
    return res.status(401).send({ error: "No auth" });
  }

  // Check if the token is valid
  const splittedToken = authorization.split("Bearer ");
  if (splittedToken.length !== 2) {
    return res.status(401).send({ error: "No auth" });
  }

  const token = splittedToken[1];

  try {
    const decodedToken: admin.auth.DecodedIdToken = await admin
      .auth()
      .verifyIdToken(token);
    res.locals = {
      ...res.locals,
      email: decodedToken.email,
      uid: decodedToken.uid,
      role: decodedToken.role,
    };
    return next();
  } catch (error) {
    console.error(error);
    return res.status(401).send({ error: "No auth" });
  }
};
