import {io, Socket} from 'socket.io-client';

export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig()
    let socket: Socket | null = null;

    const connectSocket = () => {
        if (socket?.connected) return socket;
        //@ts-ignore
        socket = io(config.public.chatServerUrl || 'http://localhost:4000', {
            autoConnect: false,
            transports: ['websocket', 'polling']
        })
        return socket;
    }

    const disconnectSocket = () => {
        if (socket) {
            socket.disconnect();
            socket = null;
        }
    }
    return {
        provide: {
            socket: {
                connect: connectSocket,
                disconnect: disconnectSocket,
                get instance() {
                    return socket;
                }
            }
        }
    }
})
