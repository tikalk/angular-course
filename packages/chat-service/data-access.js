const rooms = {};

export function getRooms() {
    return rooms.entries();
}

export function getRoomById(roomId) {
    return rooms[roomId];
}

export function addRoom(room) {
    const {id} = room;

    if (rooms[id]) {
        return;
    }

    room.mesages = [];

    rooms[id] = room;
}

export function message(roomId, message) {
    rooms[roomId].messages.push(message);
}
