import { Request, Response } from "express";
import { Customer } from "../models/Customer.model";

import { Owner } from "../models/Owner.model";


const customercontroller = {
    getCustomerById: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;

            const customer = await Customer.findByPk(id);

            if (!customer) {
                return res.status(404).json({
                    message: 'Customer not found',
                });
            }

            res.status(200).json({
                customer,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Server error'
            });
        }
    },
    getCustomerByUId: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;

            const customer = await Customer.findOne({where: {user_id:id}});

            if (!customer) {
                return res.status(404).json({
                    message: 'Customer not found',
                });
            }

            res.status(200).json({
                customer,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Server error'
            });
        }
    },

};

export default customercontroller;