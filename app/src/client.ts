import io from 'socket.io-client';
import { GET_COLLECTIONS_PARAMS } from './constants';

//@ts-ignore
const socket = io.connect('http://localhost:8080')
//const socket = io.connect() //prod

const connect = (cb: Function) => {
  return socket.emit('handshake', async (response: any) => {
    cb(response)
  });
}

const getCollection = (address: string, cb: Function) => {
  return socket.emit('getCollection', address, async (response: any) => {
    cb(response)
  });
}

const getCollections = (params: GET_COLLECTIONS_PARAMS, cb: Function) => {
  return socket.emit('getCollections', params, async (response: any) => {
    cb(response)
  });
}

const createCollection = (name: string, symbol: string, address: string, from: string, cb: Function) => {
  return socket.emit('createCollection', name, symbol, address, from, async (response: any) => {
    console.log('response', response)
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
  setLocalstorage,
  createCollection,
  getCollections,
  getCollection
};

