const roomTypeModel = require('../models/roomTypeModel.js');

const roomTypeController = {
    createRoomType: async (req, res) => {
        try {
            const roomTypeData = req.body;
            const result = await roomTypeModel.createRoomType(roomTypeData);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getAllRoomTypes: async (req, res) => {
        const roomTypes = await roomTypeModel.getAllRoomTypes();
        res.json(roomTypes);
    },
};

module.exports = roomTypeController;