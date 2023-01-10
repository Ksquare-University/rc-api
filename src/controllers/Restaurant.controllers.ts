import { Request, Response } from "express";
import { Restaurant } from "../models/Restaurant.model";


const restaurantcontroller = {
  getRestaurantById: async (req: Request, res: Response) => {
    try {
        let id = req.params.id;
        const resto = await Restaurant.findByPk(id);
        if (!resto) {
            res.status(404).json({
                error: "news not found",
            });
            return;
        }

        return resto;
    } catch (error) {
        res.status(500).json({
            message: "ERROR",
        });
        console.log(error);
    }
  },
  getAllRestaurantsbyOwnerId: async (req: Request, res: Response) => {
    try {
        
        const ownerId = req.params.ownerId;
      const resturants = await Restaurant.findAll( {where: { owner_id: ownerId}});
      if(!resturants){
        res.status(404).json({
            error: "Restaurants not found",
        });
        return;
      }
      res.status(200).json({
        restaurants: resturants,
      });

    } catch (error) {
      res.status(500).json({
        message: "ERROR",
      });
      console.log(error);
    }
  },
  createRestaurant: async (req: Request, res: Response) => {
    try {
      const { name, description, city_id, phone_number, owner_id } = req.body;
      
      if(!name || !description || !city_id || !phone_number|| !owner_id){
        res.status(404).json({
            message: "Missing data",
          })
      }
      const newRestaurant = Restaurant.create({name, description, city_id, phone_number, owner_id});
      
      res.status(200).json({
        message: "User created",
      })
      return newRestaurant;

    } catch (error) {
      res.status(500).json({
        message: "ERROR",
      });
      console.log(error);
    }
  },
  deleteRestaurantById: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const resto = await Restaurant.findByPk(id);
        if (!resto) {
          res.status(404).json({
            error: "User not found",
          });
          return;
        }
     
      const deleteRestaurant = await Restaurant.update({ is_deleted:true }, { where:{id:id} },);

        res.status(200).json({
          message: "User deleted",
          deleteRestaurant,
        })
     
    } catch (error) {
      res.status(500).json({
        message: "ERROR",
      });
      console.log(error);
    }
  },
  updateRestaurantById: async (req: Request, res: Response) => {
    try {
      const { id, name, description, city_id, phone_number, owner_id } = req.body;
      const updateResto = await Restaurant.update({ name, description, city_id, phone_number, owner_id }, { where:{id:id} },);
      if (!updateResto) {
        res.status(404).json({
          error: "User not found",
        });
        return;
      }
      res.status(200).json({
        message: "User Updated",
        user: updateResto,
      })
    } catch (error) {
      res.status(500).json({
        message: "ERROR",
      });
      console.log(error);
    }
  },


};

export default restaurantcontroller;