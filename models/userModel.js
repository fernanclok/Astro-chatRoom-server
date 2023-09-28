const db = require("../sqliteDB");
const bcrypt = require("bcrypt");

const userModel = {
  authUser: async (userData) => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await userModel.getUserByUsername(userData.username);
        if (user) {
          const result = await bcrypt.compare(
            userData.password,
            user.password
          );
          if (result) {
            resolve(user);
          } else {
            reject(new Error("Contraseña incorrecta"));
          }
        } else {
          reject(new Error("El usuario no existe"));
        }
      } catch (error) {
        reject(error);
      }
    });
  },

  createUser: async (userData) => {
    return new Promise(async (resolve, reject) => {
      try {
        const password_hash = await bcrypt.hash(userData.password, 10);
        const newUser = { ...userData, password: password_hash };
        db.run(
          `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`,
          [newUser.username, newUser.email, newUser.password],
          function (err) {
            if (err) {
              reject(err);
            } else {
              resolve(this.lastID);
            }
          }
        );
      } catch (error) {
        reject(error);
      }
    });
  },

  getAllUsers: async () => {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM users", (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  },

  getUserById: async (id) => {
    return new Promise((resolve, reject) => {
      db.get("SELECT * FROM users WHERE user_id = ?", [id], (err, user) => {
        if (err) {
          reject(err);
        } else {
          resolve(user);
        }
      });
    });
  },

  getUserByUsername: async (username) => {
    return new Promise((resolve, reject) => {
      db.get(
        "SELECT * FROM Users WHERE username = ?",
        [username],
        (err, user) => {
          if (err) {
            reject(err);
          } else {
            resolve(user);
          }
        }
      );
    });
  },

  updateUser: async (id, userData) => {
    return new Promise((resolve, reject) => {
      db.run(
        "UPDATE Users SET username = ?, password = ? WHERE user_id = ?",
        [userData.username, userData.password, id],
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(null);
          }
        }
      );
    });
  },

  deleteUser: async (id) => {
    return new Promise((resolve, reject) => {
      db.run("DELETE FROM Users WHERE user_id = ?", [id], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(null);
        }
      });
    });
  },
};

module.exports = userModel;
