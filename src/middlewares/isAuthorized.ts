import { Request, Response } from "express";
import { Role } from "../models/user.model";

type authorizationOptions = {
  roles: Role[];
  allowSameUser: boolean;
};

// A middleware that will check if a user is authorized according to its role
export const isAuthorized = (options: authorizationOptions) => {
  return (req: Request, res: Response, next: Function) => {
    const { uid, email, role } = res.locals;
    const { userId } = req.params;

    if (email === process.env.SUPER_USER) {
      return next();
    }

    if (!role) {
      return res.status(403).send();
    }

    if (options.roles.includes(role)) {
      return next();
    }

    if (options.allowSameUser && userId && userId === uid) {
      return next();
    } else {
      return res.status(403).send("No Auth");
    }
  };
};
