import { Request, Response } from "express";
import { Order } from "../models/Order.model";
import { Customer } from "../models/Customer.model";
import { Sequelize, where } from "sequelize";
import { Restaurant  } from "../models/Restaurant.model";
import { sequelize } from "../models/config";
import { OrderStatus } from "../models/OrderStatus.Model";
import { Owner } from "../models/Owner.model";

const OrdersController = {

  getOrders: async (_req: Request, res: Response) => {
    const {uid} = _req.params;
    console.log(uid)
    try {
      const orders = await Order.findAll({
      attributes: ['id'], // SELECT id From "Todos" WHERE is_completed = true;
      include: [{
        model:Customer,
        as:'Customer',
        },
        { 
        attributes: ['name'],
        model:Restaurant,
        as : 'Restaurant',
          include: [
            {
              attributes: ['full_name','user_id'],
              as : 'Owner',
              model: Owner,
              where:{
                user_id: uid
              }
            }
          ],
        },
        { 
        attributes: ['id','name'],
        model: OrderStatus,
        as:'OrderStatus',
        }
      ],
    })
    
    if(orders){
      const orderDestructuration = JSON.stringify(orders);
      const orderObject = JSON.parse(orderDestructuration);

      let FinalOrdersBySingleOwner = [];

      for (let index = 0; index < orderObject.length; index++) {
        const isRestaurant = orderObject[index].Restaurant;
        if(isRestaurant){
          FinalOrdersBySingleOwner.push(orderObject[index]);
        }        
      }
      if(FinalOrdersBySingleOwner.length === 0){
        return res.status(404).json({
          message: 'Orders not found',
        });
      }
       return res.status(200).json(
        FinalOrdersBySingleOwner
      )
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

  getClientsByOrders: async (_req: Request, res: Response) => {
    const {uid} = _req.params;
    try {
      const orders = await Order.findAll({
      attributes: ['id'], // SELECT id From "Todos" WHERE is_completed = true;
      include: [{
        model:Customer,
        as:'Customer',
        },
        { 
        attributes: ['name'],
        model:Restaurant,
        as : 'Restaurant',
          include: [
            {
              attributes: ['full_name','user_id'],
              as : 'Owner',
              model: Owner,
              where:{
                user_id: uid
              }
            }
          ],
        },
        { 
        attributes: ['id','name'],
        model: OrderStatus,
        as:'OrderStatus',
        }
      ],
    })

    if(orders){
      const orderDestructuration = JSON.stringify(orders);
      const orderObject = JSON.parse(orderDestructuration);

      let FinalOrdersBySingleOwner = [];

      for (let index = 0; index < orderObject.length; index++) {
        const isRestaurant = orderObject[index].Restaurant;
        if(isRestaurant){
          FinalOrdersBySingleOwner.push(orderObject[index]);
        }        
      }
      if(FinalOrdersBySingleOwner.length === 0){
        return res.status(404).json({
          message: 'Orders not found',
        });
      }
       return res.status(200).json(
        FinalOrdersBySingleOwner
      )
    }
  
      console.log()
      res.status(200).send(orders);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Server error'
      });
    }

    return res.status(404).json({
          message: 'Orders not found',
    });
  },


  getOrdersAll: async (_req: Request, res: Response) => {
    try {
      const orders = await Order.findAll({
      attributes: ['id'], // SELECT id From "Todos" WHERE is_completed = true;
      include: [{
        attributes: ['full_name'],
        model:Customer
        },
        { 
        attributes: ['name'],
        model:Restaurant
        },
        { 
        attributes: ['id','name'],
        model: OrderStatus
        }
    ]
        
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