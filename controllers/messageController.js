const messageModel = require('../models/messageModel.js');

const messageController = {
    createMessage: async (req, res) => {
        try {
            const messageData = req.body;
            
            // Guardar el mensaje en la base de datos usando tu modelo
            const messageId = await messageModel.createMessage(messageData);

            // Agregar el ID del mensaje al objeto de datos
            messageData.id = messageId; 

            // Emitir el mensaje a todos los clientes en la sala
            io.to(messageData.roomId).emit('message', messageData);

            console.log(result);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getAllMessages: async (req, res) => {
        const messages = await messageModel.getAllMessages();
        res.json(messages);
    },

    getAllRoomMessages: async (req, res) => {
        const roomId = req.params.roomId;
        const roomMessages = await messageModel.getAllRoomMessages(roomId);
        res.json(roomMessages);
    },

    getAllUserRoomMessages: async (req, res) => {
        const userId = req.params.userId;
        const roomId = req.params.roomId;
        const userRoomMessages = await messageModel.getAllUserRoomMessages(userId, roomId);
        res.json(userRoomMessages);
    },

    getAllUserMessages: async (req, res) => {
        const userId = req.params.userId;
        const userMessages = await messageModel.getAllUserMessages(userId);
        res.json(userMessages);
    },
    
    deleteMessage: async (req, res) => {
        const messageId = req.params.messageId;
        const result = await messageModel.deleteMessage(messageId);
        res.json(result);
    },
};

module.exports = messageController;