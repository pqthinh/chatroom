import openSocket from "socket.io-client";

export function useSocketIo() {
  return openSocket("http://localhost:3000", { autoConnect: false, reconnectionDelayMax: 10000, });
}
