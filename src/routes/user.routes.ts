import { Router, Request, Response } from "express";
import * as admin from "firebase-admin"; // npm install firebase-admin --save
import {
  createUser,
  disableUser,
  getAllUsers,
  readUser,
  updateUser,
  enableUser,
} from "../firebase";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { isAuthorized } from "../middlewares/isAuthorized";
import axios, { AxiosError } from "axios";


export const UserRouter = Router();

// ==================================  L C R U D  ==================================

// LIST - [GET] all
// Only superadmins and admins can have access to all users info
UserRouter.get(
  "/",
  isAuthenticated,
  isAuthorized({ roles: ["superadmin", "admin"], allowSameUser: true }),
  async (req: Request, res: Response) => {
    try {
      const listedUsers = await getAllUsers();

      res.status(200).send({ listedUsers });
    } catch (error) {
      res.status(400).send({ error: "Couldn't list users. Verify the route" });
    }
  }
);

// CREATE - [POST]
// Allow anyone to signup as a customer to rappi, no auth needed
UserRouter.post("/customer", async (req: Request, res: Response) => {
  const { displayName, email, password } = req.body;

  if (!displayName || !email || !password) {
    return res.status(400).send({ error: "Missing or incorrect fields" });
  }

  try {
    const newCustomerId = await createUser(
      displayName,
      email,
      password,
      "customer"
    );

    res.status(201).send({
      success: "customer created successfully!",
      id: newCustomerId,
    });
  } catch (error) {
    res
      .status(500)
      .send({ error: "Something went wrong, couldn't create customer." });
  }
});

// Only allow admins and superadmins to create restaurant owners
UserRouter.post(
  "/owner",
  isAuthenticated,
  isAuthorized({ roles: ["superadmin", "admin"], allowSameUser: true }),
  async (req: Request, res: Response) => {
    const { displayName, email, password } = req.body;

    if (!displayName || !email || !password) {
      return res.status(400).send({ error: "Missing or incorrect fields" });
    }

    try {
      const newOwnerId = await createUser(
        displayName,
        email,
        password,
        "owner"
      );

      res.status(201).send({
        success: "owner created successfully!",
        id: newOwnerId,
      });
    } catch (error) {
      res.status(500).send({
        error: "Something went wrong, couldn't create restaurant owner.",
      });
    }
  }
);

// Only allow super admin (?) to create new admins
UserRouter.post(
  "/admin",
  isAuthenticated,
  isAuthorized({ roles: ["superadmin"], allowSameUser: true }),
  async (req: Request, res: Response) => {
    const { displayName, email, password } = req.body;

    if (!displayName || !email || !password) {
      return res.status(400).send({ error: "Missing or incorrect fields" });
    }

    try {
      const newAdminId = await createUser(
        displayName,
        email,
        password,
        "admin"
      );

      res.status(201).send({
        success: "Admin created successfully!",
        id: newAdminId,
      });
    } catch (error) {
      res
        .status(500)
        .send({ error: "Something went wrong, couldn't create admin." });
    }
  }
);

// READ - [GET]
UserRouter.get(
  "/:userId",
  isAuthenticated,
  isAuthorized({
    roles: ["superadmin", "admin"],
    allowSameUser: true,
  }),
  async (req: Request, res: Response) => {
    const id: string = req.params["userId"];

    if (+id <= 0) {
      return res.status(400).send({
        error: "Invalid id",
      });
    }

    try {
      const fetchedUser = await readUser(id);

      res.status(200).send({ fetchedUser });
    } catch (error) {
      res
        .status(400)
        .send({
          error: "Couldn't read user. The requested route doesn't exist",
        });
    }
  }
);

// UPDATE - [PUT]
UserRouter.put(
  "/:userId",
  isAuthenticated,
  isAuthorized({
    roles: ["superadmin", "admin"],
    allowSameUser: true,
  }),
  async (req: Request, res: Response) => {
    const id: string = req.params["userId"];

    if (+id <= 0) {
      return res.status(400).send({
        error: "Invalid id",
      });
    }
    const { displayName, email, password } = req.body;

    if (!displayName || !email || !password) {
      return res.status(400).send({ error: "Missing or incorrect fields" });
    }

    try {
      const updatedUser = await updateUser(id, displayName, email, password);

      res.status(200).send({ updatedUser });
    } catch (error) {
      res
        .status(400)
        .send({ error: "Couldn't update user. Verify the requested user ID" });
    }
  }
);

// DELETE - [DELETE]
// A user can call an endpoint to disable its account (this is a soft-delete operation)
UserRouter.delete(
  "/:userId",
  isAuthenticated,
  isAuthorized({
    roles: ["superadmin", "admin"],
    allowSameUser: true,
  }),
  async (req: Request, res: Response) => {
    const id: string = req.params["userId"];
    const userInfo = await admin.auth().getUser(id);

    if (+id <= 0) {
      return res.status(400).send({
        error: "Invalid id",
      });
    }

    if (userInfo.disabled) {
      return res.status(200).send({
        message:
          "Nothing to do here, this account is already disabled. Try a different user id.",
      });
    }

    try {
      const disabledUser = await disableUser(id);

      res.status(200).send({ disabledUser });
    } catch (error) {
      res
        .status(400)
        .send({ error: "Couldn't disable user. Verify the requested user ID" });
    }
  }
);

// UNDO DELETE - [PATCH]
// Admins and superadmins can modify the disabled property from the User model back to false.
UserRouter.patch(
  "/activate/:userId",
  isAuthenticated,
  isAuthorized({ roles: ["superadmin", "admin"], allowSameUser: false }),
  async (req: Request, res: Response) => {
    const id: string = req.params["userId"];
    const userInfo = await admin.auth().getUser(id);

    if (+id <= 0) {
      return res.status(400).send({
        error: "Invalid id",
      });
    }

    if (!userInfo.disabled) {
      return res.status(200).send({
        message:
          "Nothing to do here, this account is already active. Try a different user id.",
      });
    }

    try {
      const enabledUser = await enableUser(id);

      res.status(200).send({ enabledUser });
    } catch (error) {
      res.status(400).send({
        error: "Couldn't enable user. Verify the requested path or user ID",
      });
    }
  }
);

// As an Admin User I can login with my credentials (email,pass) for an Admin User on FireBase
UserRouter.post("/admin/signin",async (req: Request, res: Response) => {
  const {token} = req.body;

  if (!token) {
    return res.status(400).send({error: "Missing fields"});
  };

  try {

      const decodedToken: admin.auth.DecodedIdToken = await admin.auth().verifyIdToken(token);
      if (!decodedToken) return res.status(401).send({error: "No authentication"});
      if (decodedToken.role !== "admin") {
        return res.status(401).send({error: "No Admin credential"});
      };
      res.status(200).send(decodedToken);

      // return res.status(401).send({error: "No authentication"});

  } catch (error: AxiosError | any) {
      console.log(error);
      res.status(401).send({errorName: error?.name, message: "Bad Credentials"});
  }
});
