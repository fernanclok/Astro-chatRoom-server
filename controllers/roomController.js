const roomModel = require("../models/roomModel");

const roomController = {
    createRoom: async (req, res) => {
        try {
        const roomData = req.body;
        const result = await roomModel.createRoom(roomData);
        res.json(result);
        } catch (error) {
        res.status(500).json({ error: error.message });
        }
    },
    
    getAllRooms: async (req, res) => {
        const rooms = await roomModel.getAllRooms();
        res.json(rooms);
    },
    
    deleteRoom: async (req, res) => {
        const roomId = req.params.roomId;
        const result = await roomModel.deleteRoom(roomId);
        res.json(result);
    },
};

module.exports = roomController;