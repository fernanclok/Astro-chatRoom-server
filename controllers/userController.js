const userModel = require('../models/userModel');

const userController = {
    authUser: async (req, res) => {
        try {
            const userData = req.body;
            const user = await userModel.authUser(userData);
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    createUser: async (req, res) => {
        try {
            const userData = req.body;
            const result = await userModel.createUser(userData);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getAllUsers: async (req, res) => {
        const users = await userModel.getAllUsers();
        res.json(users);
    },

    getUserById: async (req, res) => {
            const { id } = req.params;
            const result = await userModel.getUserById(req.params.id);
            res.status(200).json(result);
    },

    getUserByUsername: async (req, res) => {
            const username = req.params.username;
            const result = await userModel.getUserByUsername(username);
            res.json(result);
    },

    updateUser: async (req, res) => {
            const { id } = req.params;
            const userData = req.body;
            const result = await userModel.updateUser(id, userData);
            res.json(result);
    },

    deleteUser: async (req, res) => {
            const id = req.params.id;
            const result = await userModel.deleteUser(id);
            res.status(200).json(result);
    },
};

module.exports = userController;