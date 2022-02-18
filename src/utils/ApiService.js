import axios from "axios";

let baseUrl = `http://localhost:3001/`;

const addUser = async (userData) => {
  //console.log(userData);
  let result = {};
  try {
    let url = baseUrl + `user`;
    const response = await axios.post(url, userData);
    //console.log("response:", response);
    result = response.data;
    //console.log("addUserResult:", result);
  } catch (error) {
    console.error("error:", error);
  }
  return result;
};
const updateUser = async (userData) => {
  console.log(userData);
  userData.lastEditBy = localStorage.getItem("adminName");
  let result = {};
  try {
    let url = baseUrl + `user`;
    // let url = `http://localhost:3001/user/`;

    const response = await axios.patch(url);
    //console.log("response:", response);
    result = response.data;
    //console.log("addUserResult:", result);
  } catch (error) {
    console.error("error:", error);
  }
  return result;
};

const getUsers = async ({ attribute, value }) => {
  //console.log(attribute, value);
  let result = {};
  let response;
  try {
    let url = baseUrl + `user/${attribute}/${value}`;
    response = await axios.get(url);
    //console.log("response:", response);

    result = response.data;
    console.log("response:", result);
  } catch (error) {
    console.error("error:", error.response.status);
    if (error.response.status === 500) result.err = true;
    else if (error.response.status === 401) {
      result.message = "Unauthorized request LOGIN AGAIN ";
      result.success = 0;
      localStorage.clear();
      result.unauthorized = true;
    }
  }
  return result;
};
const getUserById = async (id) => {
  //console.log(attribute, value);
  let result = {};
  let response;
  try {
    let url = baseUrl + `user/id/${id}`;
    // let url = `http://localhost:3001/user/id/${id}`;
    response = await axios.get(url);
    console.log("response:", response);
    
    result = response.data;
  } catch (error) {
    console.error("error:", error.response.status);
    if (error.response.status === 500) result.err = true;

  }
  return result;
};

const getAllUsers = async () => {
  let result = {};
  let response;
  try {
    let url = baseUrl + `user/all`;
    response = await axios.get(url);
    //console.log("response:", response);
    if (response.status === 401) {
      localStorage.clear();
    }
    result = response.data;
  } catch (error) {
    console.error("error:", error.response.status);
    if (error.response.status === 500) result.err = true;

  }
  return result;
};
const deleteUser = async (userData) => {
  //console.log(userData);
  let result = {};
  try {
    let url = baseUrl + `user`;
    const response = await axios.delete(url);
    //console.log("response:", response);
    result = response.data;
    //console.log("deleteUserResult:", result);
  } catch (error) {
    console.error("error:", error);
  }
  return result;
};

export {
  addUser,
  updateUser,
  getUsers,
  deleteUser,
  getAllUsers,
  getUserById,
};
