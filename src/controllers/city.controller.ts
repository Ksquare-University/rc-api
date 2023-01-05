import { Request, Response } from "express";
import { City } from "../models/city.model";

const CityController = {

  getCity: async (_req: Request, res: Response) => {
    try {
      const cities = await City.findAll({
      attributes: ['id', 'name'], // SELECT id From "Todos" WHERE is_completed = true;
      where: {
          is_active: true
      }
  })

      if (!cities) {
        return res.status(404).json({
          message: 'City not found',
        });
      }

      if(cities.length === 0){
        return res.status(404).json({
            message: 'The cities list is empty',
          });
      }

      console.log()
      res.status(200).send(cities);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Server error'
      });
    }
  },

  getCityById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const course = await City.findByPk(Number(id));

      if (!course) return res.status(404).json({
        message: "City does not exists",
      });

      res.status(200).json(course);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Server error'
      });
    }
  },

  createCity: async (req: Request, res: Response) => {
    try {
      const { name } = req.body;

      const newCity = await City.create({ name });
      
      res.status(200).json(newCity);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Server error'
      });
    }
  },

  deleteCourse: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const courseDeleted = await City.update({
        is_active: false
        },{ 
        where: {
          id: id,
        }
      });

      if (!courseDeleted) return res.status(404).json({
        message: 'City does not exists'
      })
      
      res.status(200).json(courseDeleted);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Server error'
      });
    }
  },
};

export default CityController;