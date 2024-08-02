import axios from "axios";

const API_URL = "/api/files/";

export const getFiles = (parentId = null) => axios.get(API_URL + parentId);
export const createFile = (data) => axios.post(API_URL, data);
export const updateFile = (id, data) => axios.put(API_URL + id, data);
export const deleteFile = (id) => axios.delete(API_URL + id);
