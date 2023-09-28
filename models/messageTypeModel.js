const db = require("../sqliteDB");

const messageTypeModel = {
    createMessageType: async (messageTypeData) => {
        return new Promise((resolve, reject) => {
            db.run(
                `INSERT INTO message_type (name) VALUES (?)`,
                [messageTypeData.name],
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

    getAllMessageTypes: async () => {
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM message_type", (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    },
};

module.exports = messageTypeModel;