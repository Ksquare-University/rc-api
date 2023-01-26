import { Request, Response } from 'express';
import { OrderItems } from '../models/OrderItems.model';
import { Item } from '../models/Item.model';

const orderItemsController = {
  getOrderItemsByOrderId: async (req: Request, res: Response) => {
    try {
      const { orderId } = req.params;
      const foundItems = await OrderItems.findAll({
        include: {
          model: Item,
          attributes: ['name', 'price', 'restaurant_id', 'is_deleted'],
        },
        where: {
          order_id: orderId,
        },
        attributes: ['id', 'order_id', 'item_id', 'quantity', 'is_deleted'],
      });

      if (!foundItems) {
        return res.status(404).json({
          error: 'Order not found!',
        });
      }

      return res.status(200).send(foundItems);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Something went wrong!' });
    }
  },
  addItemsToOrder: async (req: Request, res: Response) => {
    try {
      const { orderId } = req.params;
      const { itemId, quantity } = req.body;

      if (!itemId || quantity <= 0) {
        return res.status(400).json({ error: 'No item to add!' });
      }

      await OrderItems.create({
        item_id: itemId,
        order_id: Number(orderId),
        quantity: quantity,
      });

      return res
        .status(200)
        .json({ success: `Item added to order ${orderId}` });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Something went wrong!' });
    }
  },
  updateItemquantity: async (req: Request, res: Response) => {
    try {
      const { orderId } = req.params;
      const { itemId, quantity } = req.body;

      if (!itemId || !quantity) {
        {
          return res.status(400).json({ error: 'No item to update!' });
        }
      }

      await OrderItems.update(
        {
          quantity: quantity,
        },
        {
          where: {
            item_id: itemId,
            order_id: orderId,
          },
        }
      );

      return res.status(200).json({ success: 'Item updated successfully!' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Something went wrong!' });
    }
  },
  deleteItem: async (req: Request, res: Response) => {
    try {
      const { orderId } = req.params;
      const { itemId } = req.body;

      if (!itemId) {
        return res.status(400).json({ error: 'No item to delete!' });
      }

      await OrderItems.destroy({
        where: {
          order_id: orderId,
          item_id: itemId,
        },
      });

      return res.status(200).json({ success: 'Item deleted successfully!' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Something went wrong!' });
    }
  },
};

export default orderItemsController;
