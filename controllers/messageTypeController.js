const messageTypeModel = require('../models/messageTypeModel.js');

const messageTypeController = {
    createMessageType: async (req, res) => {
        try {
            const messageTypeData = req.body;
            const result = await messageTypeModel.createMessageType(messageTypeData);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getAllMessageTypes: async (req, res) => {
        const messageTypes = await messageTypeModel.getAllMessageTypes();
        res.json(messageTypes);
    },
};

module.exports = messageTypeController;