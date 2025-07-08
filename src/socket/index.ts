import io, { Socket } from "socket.io-client";

class SocketApi {
  static socket: null | Socket = null;

  static createConnection() {
    const token = localStorage.getItem('token');
    this.socket = io(import.meta.env.VITE_SERVER_URL, {
      query: { token }
    })

    this.socket.on('connect', () => {
      console.log('Connected to server');
    });
    
    this.socket.on('disconnect', () => {
      console.log('Disconnected to server');
    });
  }

  static disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}

export default SocketApi;
