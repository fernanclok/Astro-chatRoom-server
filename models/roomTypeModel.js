const db = require("../sqliteDB");

const roomTypeModel = {
    createRoomType: async (roomTypeData) => {
        return new Promise((resolve, reject) => {
        db.run(
            `INSERT INTO room_type (name) VALUES (?)`,
            [roomTypeData.name],
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
    
    getAllRoomTypes: async () => {
        return new Promise((resolve, reject) => {
        db.all("SELECT * FROM room_type", (err, rows) => {
            if (err) {
            reject(err);
            } else {
            resolve(rows);
            }
        });
        });
    },
};

module.exports = roomTypeModel;