import { Request, Response } from "express";
import { ClientAddress } from "../models/ClientAddress.model";

const addressController = {
    getAddressByCustomerId: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;

            const customeraddress = await ClientAddress.findOne({where:{client_id:id}});

            if (!customeraddress) {
                return res.status(404).json({
                    message: 'Admin not found',
                });
            }

            res.status(200).json({
                customeraddress,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Server error'
            });
        }
    },
};

export default addressController;