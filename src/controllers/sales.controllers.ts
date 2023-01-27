import { Request, Response } from "express";
import { Order } from "../models/Order.model";
import { Customer } from "../models/Customer.model";
import { Sequelize, where } from "sequelize";
import { Restaurant  } from "../models/Restaurant.model";
import { sequelize } from "../models/config";
import { OrderStatus } from "../models/OrderStatus.Model";
import { Sale } from "../models/Sale.model";
import { OrderItems } from "../models/OrderItems.model";
import { Item } from "../models/Item.model";
import { Owner } from "../models/Owner.model";

const SalesController = {

  getSales: async (_req: Request, res: Response) => {
    const {uid} = _req.params;
    console.log(uid)
    try {
      const sales = await Sale.findAll({
      attributes: ['id', 'order_id','total_items', 'total_price','date'],
      include:[{
        attributes:['id', 'restaurant_id'],
        model:Order,
        as: "Order",
        include:[{
            attributes:['id'],
            model:OrderItems,
            as:"OrderItems",
            include:[{
                attributes:['name', 'price'],
                model:Item,
                as:"Item"
                }]
            },
            {
              model:Restaurant,
              as:"Restaurant",
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
            }
        ]
      },
      ] // SELECT id From "Todos" WHERE is_completed = true;
    })
      

    
    if(sales){
      const salesDestructuration = JSON.stringify(sales);
      const salesObject = JSON.parse(salesDestructuration);

      let FinalSalesBySingleOwner = [];

      for (let index = 0; index < salesObject.length; index++) {
        const isRestaurant = salesObject[index].Order.Restaurant;
        if(isRestaurant){
          FinalSalesBySingleOwner.push(salesObject[index]);
        }        
      }
      if(FinalSalesBySingleOwner.length === 0){
        return res.status(404).json({
          message: 'Orders not found',
        });
      }
       return res.status(200).json(
        FinalSalesBySingleOwner
      )
    }



    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Server error'
      });
    }
  },

  getSalesAll: async (_req: Request, res: Response) => {
    try {
      const orders = await Sale.findAll({
      attributes: ['id', 'order_id','total_items', 'total_price','date'],
      include:[{
        attributes:['id', 'restaurant_id'],
        model:Order,
        as: "Order",
        include:[{
            attributes:['id'],
            model:OrderItems,
            as:"OrderItems",
            include:[{
                attributes:['name', 'price'],
                model:Item,
                as:"Item"
                }]
            },
            {
              model:Restaurant,
              as:"Restaurant",
              include: [
                {
                  attributes: ['full_name','user_id'],
                  as : 'Owner',
                  model: Owner,
                }
              ],
            }
        ]
      },
      ] // SELECT id From "Todos" WHERE is_completed = true;
    })
      res.status(200).send(orders);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Server error'
      });
    }
  },
};

export default SalesController;