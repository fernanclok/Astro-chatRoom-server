const roomUserModel = require('../models/roomUserModel');

const roomUserController = {
    createRoomUser: async (req, res) => {
        try {
            const roomUserData = req.body;
            const result = await roomUserModel.createRoomUser(roomUserData);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getAllUserRooms: async (req, res) => {
        const userId = req.params.userId;
        const userRooms = await roomUserModel.getAllUserRooms(userId);
        res.json(userRooms);
    },

    getAllRoomUsers: async (req, res) => {
        const roomId = req.params.roomId;
        const roomUsers = await roomUserModel.getAllRoomUsers(roomId);
        res.json(roomUsers);
    },

    deleteRoom: async (req, res) => {
        const roomId = req.params.roomId;
        const result = await roomUserModel.deleteRoom(roomId);
        res.json(result);
    },

    deleteRoomUser: async (req, res) => {
        const roomId = req.params.roomId;
        const userId = req.params.userId;
        const result = await roomUserModel.deleteRoomUser(roomId, userId);
        res.json(result);
    },
};

module.exports = roomUserController;