import axios from "axios";

const BASE_URL = "http://localhost:5000";

export function getTasks() {
  return axios
    .get(`${BASE_URL}/api/tasks/list`)
    .then(response => response.data);
}

export function deleteTask(id) {
  return axios
    .post(`${BASE_URL}/api/tasks/delete/${id}`)
    .then(response => response.data)
    .catch(err => Promise.reject(err.message));
}

export function createTask(data) {
  return axios
    .post(`${BASE_URL}/api/tasks/create`, {
      question: data.question,
      tokenPairs: data.tokenPairs
    })
    .then(response => {
      return response.data;
    })
    .catch(err => Promise.reject(err.message));
}

export function updateTask(data, id) {
  return axios
    .post(`${BASE_URL}/api/tasks/update/${id}`, { data })
    .then(response => {
      return response.data;
    })
    .catch(err => Promise.reject(err.message));
}

export function createToken(data) {
  return axios
    .post(`${BASE_URL}/api/tokens/create`, {
      title: data.title,
      value: data.value
    })
    .then(response => {
      return response.data;
    })
    .catch(err => Promise.reject(err.message));
}

export function getTokens() {
  return axios
    .get(`${BASE_URL}/api/tokens/list`)
    .then(response => response.data);
}

export function deleteToken(id) {
  return axios
    .post(`${BASE_URL}/api/tokens/delete/${id}`)
    .then(response => response.data)
    .catch(err => Promise.reject(err.message));
}
