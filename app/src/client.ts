import io from 'socket.io-client';

//@ts-ignore
const socket = io.connect('http://localhost:8080')
//const socket = io.connect() //prod

const connect = (cb: Function) => {
  return socket.emit('handshake', async (response: any) => {
    cb(response)
  });
}

const setLocalstorage = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.error("error trying to set " + key + " to localstorage", error);
  }
}

const getLocalstorage = (key: string) => {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.error("error trying to set " + key + " to localstorage", error);
  }
}


export {
  connect,
  socket,
  getLocalstorage,
  setLocalstorage
};

