import { Request, Response } from "express";
import { Order } from "../models/Order.model";
import { Customer } from "../models/Customer.model";
import io from "../utils/socketServer";

const orderController = {
    createOrder: async (req: Request, res: Response) => {
        try {
            const { uid } = res.locals;
            const { courierID, restaurantID } = req.body;
            let customerID;

            if (!courierID || !restaurantID) {
                return res.status(404).json({ error: "Missing data" });
            }

            const clientID = await Customer.findOne({
                where: {
                    user_id: uid
                }
            })

            if (clientID) {
                customerID = clientID.toJSON().id
                const newOrder = await Order.create({
                    client_id: customerID,
                    courier_id: courierID,
                    restaurant_id: restaurantID
                })
            }

            // Emitir para activar la variable de estado del incomming order
            io.emit("incommingOrder");

            return res.status(200).json({ success: `Order created succesfully` })

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Server error" });
        }
    }
};

export default orderController;