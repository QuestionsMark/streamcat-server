import { io } from ".."

export const socketManager = async () => {
    io.on('connection', socket => {
        socket.broadcast.emit('user-connected', `Dołączył użytkownik o id: ${socket.id}`);
        socket.on('disconnect', () => {
            socket.broadcast.emit('user-disconnected', `Użytkownik o id: ${socket.id} poszedł w pizdu :(`)
        })
    })
};