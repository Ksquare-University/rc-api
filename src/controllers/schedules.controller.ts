import { Request, Response } from "express";
import { OpeningDays } from "../models/OpeningDays.model";
import { OpeningTimes } from "../models/OpeningTimes.model";

const SchedulesController = {

  getSchedules: async (_req: Request, _res: Response) => {
    try {
      const openingDays = await OpeningDays.findAll({
        where: {
          is_deleted: false
        }
      })

      if (!openingDays) {
        return _res.status(404).json({
          message: 'Schedules not found',
        });
      }

      if(openingDays.length === 0){
        return _res.status(404).json({
            message: 'The schedules list is empty',
          });
      }

      const data =  await Promise.all(openingDays.map(async (value) => {
        const opening_times = await OpeningTimes.findAll(
          {
            where: {
              openday_id: value.id,
            }
          }
        )
        return {...value, opening_times}
      }));
      _res.status(200).send(data);
    } catch (error) {
      console.log(error);
      _res.status(500).json({
        message: 'Server error'
      });
    }
  },

  getSchedulesById: async (req: Request, _res: Response) => {
    try {
      const scheduleId = req.params.scheduleId;
      const openingDays = await OpeningDays.findAll({
        where: {
          is_deleted: false,
          id: scheduleId
        }
      })

      if (!openingDays) {
        return _res.status(404).json({
          message: 'Schedules not found',
        });
      }

      if(openingDays.length === 0){
        return _res.status(404).json({
            message: 'The schedules list is empty',
          });
      }

      const data =  await Promise.all(openingDays.map(async (value) => {
        const opening_times = await OpeningTimes.findAll(
          {
            where: {
              openday_id: value.id,
            }
          }
        )
        return {...value, opening_times}
      }));
      _res.status(200).send(data);
    } catch (error) {
      _res.status(500).json({
        message: "ERROR",
      });
      console.log(error);
    }
  },

  createSchedules: async (req: Request, res: Response) => {
    try {
      const { day, restaurant_id, init_time, end_time} = req.body;
      const newOpeningDay = await OpeningDays.create({day, restaurant_id});
      const newOpeningTime = await OpeningTimes.create({
        init_time,
        end_time,
        openday_id: newOpeningDay.id,
      })

      res.status(200).json( {
        ...newOpeningDay,
        ...newOpeningTime
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Server error'
      });
    }
  },

  deleteSchedule: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const courseDeleted = await OpeningDays.update({
        is_deleted: true
        },{ 
        where: {
          id: id,
        }
      });


      if (!courseDeleted) return res.status(404).json({
        message: 'Schedules does not exists'
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

export default SchedulesController;