import instance from "./baseApi";

export function getData(endpoint, options = {}) {
  return new Promise((resolve, reject) => {
    instance
      .get(endpoint, options)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}

export function getOne(endpoint, id, options = {}) {
  return new Promise((resolve, reject) => {
    instance
      .get(`${endpoint}/${id}`, options)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}

export function postData(endpoint, data, options = {}) {
  return new Promise((resolve, reject) => {
    instance
      .post(endpoint, data, options)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}

export function deleteData(endpoint, id, options = {}) {
  return new Promise((resolve, reject) => {
    instance
      .delete(`${endpoint}/${id}`, options)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}

export function updateData(endpoint, id, data, options = {}) {
  return new Promise((resolve, reject) => {
    instance
      .put(`${endpoint}/${id}`, data, options)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}
