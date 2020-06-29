import axios from "axios";

export const customAxios = axios.create({
  baseURL: `https://know-your-plant-api.herokuapp.com`,
});

export const setAuthToken = (token: any) => {
  if (token) {
    customAxios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete customAxios.defaults.headers.common.Authorization;
  }
};
