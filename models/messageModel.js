const db = require("../sqliteDB");

const messageModel = {
    createMessage: async (messageData) => {
        return new Promise((resolve, reject) => {
            db.run(
                `INSERT INTO message (room_id, user_id, message_type_id, message, url) VALUES (?, ?, ?, ?, ?)`,
                [messageData.room_id, messageData.user_id, messageData.message_type_id, messageData.message, messageData.url],
                function (err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(this.lastID);
                    }
                }
            );
        });
    },

    getAllMessages: async () => {
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM message", (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    },

    getAllRoomMessages: async (roomId) => {
        return new Promise((resolve, reject) => {
          db.all(
            "SELECT message.*, users.username FROM message INNER JOIN users ON message.user_id = users.user_id WHERE message.room_id = ?",
            [roomId],
            (err, rows) => {
              if (err) {
                reject(err);
              } else {
                resolve(rows);
              }
            }
          );
        });
      },

    getAllUserRoomMessages: async (roomId, userId) => {
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM message WHERE room_id = ? AND user_id = ?", [roomId, userId], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    },

    getAllUserMessages: async (userId) => {
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM message WHERE user_id = ?", [userId], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    },

    deleteMessage: async (messageId) => {
        return new Promise((resolve, reject) => {
            db.run("DELETE FROM message WHERE message_id = ?", [messageId], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.changes);
                }
            });
        });
    },
};

module.exports = messageModel;