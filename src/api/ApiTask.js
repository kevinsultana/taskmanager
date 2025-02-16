import axios from 'axios';

const ApiTask = token => {
  return axios.create({
    baseURL: 'https://todo-api-omega.vercel.app/api/v1',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
};

export default ApiTask;
