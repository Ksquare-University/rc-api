import { Request, Response } from "express";

import { Owner } from "../models/Owner.model";


const ownercontroller = {
    getAdminById: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;

            const manager = await Owner.findByPk(id);

            if (!manager) {
                return res.status(404).json({
                    message: 'Admin not found',
                });
            }

            res.status(200).json({
                manager,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Server error'
            });
        }
    },
    getAdminByUId: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;

            const manager = await Owner.findOne({where: {user_id:id}});

            if (!manager) {
                return res.status(404).json({
                    message: 'Admin not found',
                });
            }

            res.status(200).json({
                manager,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Server error'
            });
        }
    },

};

export default ownercontroller;