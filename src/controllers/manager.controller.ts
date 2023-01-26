import { Request, Response } from 'express';
import { Manager } from '../models/Manager.Model';

const maangercontroller = {
  getManagerById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const manager = await Manager.findByPk(id);

      if (!manager) {
        return res.status(404).json({
          message: 'manager not found',
        });
      }

      res.status(200).json({
        manager,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Server error',
      });
    }
  },

  getManagerByUid: async (req: Request, res: Response) => {
    try {
      const { uid } = req.params;

      const manager = await Manager.findOne({ where: { user_id: uid } });

      if (!manager) {
        return res.status(404).json({
          message: 'Manager not found',
        });
      }

      return res.status(200).json({
        manager,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'Server error',
      });
    }
  },
};

export default maangercontroller;
