const db = require("../sqliteDB");

const roomUserModel = {
    createRoomUser: async (roomUserData) => {
        return new Promise((resolve, reject) => {
            db.run(
                `INSERT INTO room_user (room_id, user_id) VALUES (?, ?)`,
                [roomUserData.room_id, roomUserData.user_id],
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

    getAllUserRooms: async (userId) => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT room.room_id, room.room_name
                FROM room_user
                JOIN room ON room_user.room_id = room.room_id
                WHERE room_user.user_id = ?;
            `;
            
            db.all(query, [userId], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    // rows contendrá los IDs y nombres de las salas a las que el usuario pertenece
                    const rooms = rows.map((row) => ({
                        room_id: row.room_id,
                        room_name: row.room_name
                    }));
                    resolve(rooms);
                }
            });
        });
    },

    getAllRoomUsers: async (roomId) => {
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM room_user WHERE room_id = ?", [roomId], (err, rows) => {
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
            db.run("DELETE FROM room_user WHERE room_id = ?", [roomId], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.changes);
                }
            });
        });
    },

    deleteRoomUser: async (roomId, userId) => {
        return new Promise((resolve, reject) => {
            db.run("DELETE FROM room_user WHERE room_id = ? AND user_id = ?", [roomId, userId], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.changes);
                }
            });
        });
    },
};

module.exports = roomUserModel;