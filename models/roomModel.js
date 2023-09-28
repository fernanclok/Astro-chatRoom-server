const db = require("../sqliteDB"); 

const roomModel = {
    createRoom: async (roomData) => {
        return new Promise((resolve, reject) => {
            db.run(
                `INSERT INTO room (room_name, room_type_id) VALUES (?, ?)`,
                [roomData.room_name, roomData.room_type_id],
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

    getAllRooms: async () => {
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM room", (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    },

    deleteRoom: async (roomId) => {
        return new Promise((resolve, reject) => {
            db.run("DELETE FROM room WHERE room_id = ?", [roomId], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.changes);
                }
            });
        });
    },
};

module.exports = roomModel;