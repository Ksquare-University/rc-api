import { Request, Response } from "express";
import { Item } from "../models/Item.model";

const itemcontroller = {
    getItemById: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;

            const items = await Item.findByPk(id);

            if (!items) {
                return res.status(404).json({
                    message: 'Admin not found',
                });
            }

            res.status(200).json({
                items,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Server error'
            });
        }
    },
    getItemsbyRestaurantId: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;

            const items = await Item.findAll({where: {restaurant_id:id}});

            if (!items) {
                return res.status(404).json({
                    message: 'Admin not found',
                });
            }

            res.status(200).json({
                items,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Server error'
            });
        }
    },
    createItem: async (req: Request, res: Response) => {
      try {
        const { name, price, restaurant_id} = req.body;
        console.log(name );
        if(!name || !price){
          res.status(404).json({
              message: "Missing data",
            })
        }
        const newItem = Item.create({name, price, restaurant_id});
        

        //console.log(newItem);
            res.status(200).json({
                message: "Item created",
                //item: (await newItem) 
              });
  

      } catch (error) {
        res.status(500).json({
          message: "ERROR",
        });
        console.log(error);
      }
    },

};

export default itemcontroller;