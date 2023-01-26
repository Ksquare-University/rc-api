import { Request, Response } from 'express';
import { Order } from '../models/Order.model';
import { Customer } from '../models/Customer.model';
import io from '../utils/socketServer';
import { Courier } from '../models/Courier.model';
import { ClientAddress } from '../models/ClientAddress.model';
import { OrderItems } from '../models/OrderItems.model';
import { Item } from '../models/Item.model';
import { OrderStatus } from '../models/OrderStatus.Model';

const orderController = {
  getOrdersByRestaurantId: async (req: Request, res: Response) => {
    try {
      const { restaurantId } = req.params;
      if (!restaurantId) return res.status(400).send({ message: 'Missing Id' });

      const orders = await Order.findAll({
        attributes: ['id', 'restaurant_id', 'createdAt', 'updatedAt'],
        include: [
          {
            model: Courier,
            attributes: ['id', 'full_name', 'phone_number', 'user_id'],
            as: 'courier',
          },
          {
            model: Customer,
            include: [{ model: ClientAddress }],
            attributes: ['id', 'full_name', 'phone_number', 'user_id'],
            as: 'Customer',
          },
          {
            model: OrderItems,
            include: [{ model: Item }],
            attributes: [
              'item_id',
              'quantity',
              'is_deleted',
              'createdAt',
              'updatedAt',
            ],
            as: 'items',
          },
          {
            model: OrderStatus,
            attributes: ['id', 'name'],
            as: 'order_status',
          },
        ],
        where: { restaurant_id: restaurantId },
      });

      if (!orders) return res.status(404).send({ message: 'No orders found' });

      return res.status(200).send(orders);
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: 'Server error' });
    }
  },

  createOrder: async (req: Request, res: Response) => {
    try {
      const { uid } = res.locals;
      const { courierID, restaurantID } = req.body;
      let customerID;

      if (!courierID || !restaurantID) {
        return res.status(404).json({ error: 'Missing data' });
      }

      const clientID = await Customer.findOne({
        where: {
          user_id: uid,
        },
      });

      if (clientID) {
        customerID = clientID.toJSON().id;
        const newOrder = await Order.create({
          client_id: customerID,
          courier_id: courierID,
          restaurant_id: restaurantID,
        });
      }

      // Emitir para activar la variable de estado del incomming order
      io.emit('incommingOrder');

      return res.status(200).json({ success: `Order created succesfully` });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Server error' });
    }
  },
};

export default orderController;
