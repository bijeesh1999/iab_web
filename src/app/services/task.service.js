import axios from "axios";
const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/user`

console.log({url:API_BASE_URL});


export const createNewTask = async (body) => {
    console.log({body});
  try {
    const newUser = await axios.post(`${API_BASE_URL}/create`,body);
    return newUser;
  } catch (error) {
    return error;
  }
};


export const findAllTasks = async (body) => {
    console.log({body});
  try {
    const newUser = await axios.post(`${API_BASE_URL}/list`,body);
    return newUser;
  } catch (error) {
    return error;
  }
};
