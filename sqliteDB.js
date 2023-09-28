const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('chatroom.db');

// Código para crear tablas u otras configuraciones
db.serialize(() => {
//Tabla de Usuarios (Users)
db.run(`
CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
)
`);

// tabla de tipo de cuartos (room_type)
db.run(`
CREATE TABLE IF NOT EXISTS room_type (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
)
`);

//Tabla de cuartos (romms)
db.run(`
CREATE TABLE IF NOT EXISTS room (
    room_id INTEGER PRIMARY KEY,
    room_name TEXT NOT NULL,
    room_type_id INTEGER,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (room_type_id) REFERENCES room_type(id)
)
`);

//Tabla de cuarto_usuario (RoomUser)
db.run(`
CREATE TABLE IF NOT EXISTS room_user (
    id INTEGER PRIMARY KEY,
    room_id INTEGER,
    user_id INTEGER,
    FOREIGN KEY (room_id) REFERENCES room(room_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
)
`);

//Tabla de tipos de mensaje (message_type)
db.run(`
CREATE TABLE IF NOT EXISTS message_type (
    id INTEGER PRIMARY KEY,
    name TEXT
)
`);

// Tabla de Mensajes (Message)
db.run(`
CREATE TABLE IF NOT EXISTS message (
    message_id INTEGER PRIMARY KEY,
    user_id INTEGER,
    room_id INTEGER,
    message TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    message_type_id INTEGER,
    url VARCHAR(2000),
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (room_id) REFERENCES Room(room_id),
    FOREIGN KEY (message_type_id) REFERENCES message_type(id)
)`);
});
module.exports = db;
