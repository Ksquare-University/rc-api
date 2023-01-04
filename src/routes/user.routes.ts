import { Router, Request, Response } from "express";
import * as admin from "firebase-admin"; // npm install firebase-admin --save
import { createUser, disableUser, getAllUsers, readUser, updateUser, enableUser } from "../firebase";
// Still need to create middlewares to use them in this file
// import { isAuthenticated } from "../middlewares/isAuthenticated";
// import { isAuthorized } from "../middlewares/isAuthorized";

export const UserRouter = Router();

// ==================================  L C R U D  ==================================

// LIST - [GET] all
UserRouter.get('/', async (req: Request, res: Response) => {
    try {
        const listedUsers = await  getAllUsers(); 
        
        res.status(200).send({listedUsers});
    } catch (error) {
        res.status(400).send({error: "Couldn't list users. Verify the route"})
    }
})

// CREATE - [POST]
// Allow a client to sign up to our system
UserRouter.post('/new/client', async (req:Request, res: Response) => {
    const { displayName, email, password }  = req.body
    
    if (!displayName || !email || !password) {
        return res.status(400).send({error: 'Missing or incorrect fields'})
    }
    
    try {
        const newClientId = await createUser(displayName, email, password, 'client'); 
        
        res.status(201).send({
              success: "Client created successfully!", 
              id: newClientId
        })
    } catch (error) {
        res.status(500).send({error: "Something went wrong, couldn't create client."})
    }

})

// Only allow admins and superadmins to create managers (rest owners)
UserRouter.post('/new/manager', async (req:Request, res: Response) => {
    const { displayName, email, password }  = req.body
    
    if (!displayName || !email || !password) {
        return res.status(400).send({error: 'Missing or incorrect fields'})
    }
    
    try {
        const newManagerId = await createUser(displayName, email, password, 'manager');
        
        res.status(201).send({
              success: "Manager created successfully!", 
              id: newManagerId
        })
    } catch (error) {
        res.status(500).send({error: "Something went wrong, couldn't create restaurant manager."})
    }

})

// Only allow super admin (?) to create new admins
UserRouter.post('/new/admin', async (req:Request, res: Response) => {
    const { displayName, email, password  }  = req.body
    
    if (!displayName || !email || !password) {
        return res.status(400).send({error: 'Missing or incorrect fields'})
    }

    try {
        const newAdminId = await createUser(displayName, email, password, "admin");

        res.status(201).send({
            success: "Admin created successfully!", 
            id: newAdminId,
        })

    } catch (error) {
        res.status(500).send({error: "Something went wrong, couldn't create admin."})
    }

})

// READ - [GET]
UserRouter.get('/:userId', async (req:Request, res: Response) => {
    const id: string = req.params['userId'];

    if (+id <= 0) {
        return res.status(400).send({
            error: 'Invalid id'
        })
    }

    try {
        const fetchedUser = await readUser(id); 

        res.status(200).send({fetchedUser});
    } catch (error) {
        res.status(400).send({error: "Couldn't read user. The requested route doesn't exist"})
    }
})

// UPDATE - [PUT]
UserRouter.put('/:userId', async (req: Request, res: Response) => {
    const id: string = req.params['userId']; 

    if (+id <= 0) {
        return res.status(400).send({
            error: 'Invalid id'
        })
    }
    const {displayName, email, password}  = req.body;

    if (!displayName || !email || !password) {
        return res.status(400).send({error: 'Missing or incorrect fields'})
    }
    
    try {
        const updatedUser = await updateUser(id, displayName, email, password); 
        
        res.status(200).send({updatedUser});
    } catch (error) {
        res.status(400).send({error: "Couldn't update user. Verify the requested user ID"})
    }

})


// DELETE - [DELETE]
// A user can call an endpoint to disable its account (this is a soft-delete operation)
UserRouter.delete('/:userId', async (req: Request, res: Response) => {
    const id: string = req.params['userId'];
    const userInfo = await admin.auth().getUser(id);

    if (+id <= 0) {
        return res.status(400).send({
            error: 'Invalid id'
        })
    }

    if(userInfo.disabled){
        return res.status(200).send({
            message: 'Nothing to do here, this account is already disabled. Try a different user id.'
        });
    }

    try {
        const disabledUser = await disableUser(id) 

        res.status(200).send({disabledUser});
    } catch (error) {
        res.status(400).send({error: "Couldn't disable user. Verify the requested user ID"})
    }
})


// UNDO DELETE - [PATCH]
// Admins can modify the disabled property from the User model back to false. 
UserRouter.patch('/activate/:userId', async (req: Request, res: Response) => {
    const id: string = req.params['userId'];
    const userInfo = await admin.auth().getUser(id);

    if (+id <= 0) {
        return res.status(400).send({
            error: 'Invalid id'
        })
    }

    if(!userInfo.disabled){
        return res.status(200).send({
            message: 'Nothing to do here, this account is already active. Try a different user id.'
        });
    }

    try {
        const enabledUser = await enableUser(id)  

        res.status(200).send({enabledUser});
    } catch (error) {
        res.status(400).send({error: "Couldn't enable user. Verify the requested path or user ID"})
    }
})
