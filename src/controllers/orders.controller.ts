import { Request, Response } from "express";
import { Order } from "../models/Order.model";
import { Customer } from "../models/Customer.model";
import { Sequelize } from "sequelize";

const OrdersController = {

  getOrders: async (_req: Request, res: Response) => {
    try {
      console.log('sdsdsds')
      const orders = await Order.findAll({
      attributes: ['id', 'full_name'], // SELECT id From "Todos" WHERE is_completed = true;
      include:{
        model:Customer,
        where: {
          id: Sequelize.col('Customer.id')
        }
      }
        
    })

      if (!orders) {
        return res.status(404).json({
          message: 'City not found',
        });
      }

      if(orders.length === 0){
        return res.status(404).json({
            message: 'The cities list is empty',
          });
      }

      console.log()
      res.status(200).send(orders);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Server error'
      });
    }
  },
};

export default OrdersController;