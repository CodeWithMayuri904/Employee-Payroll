// import axios from "axios";

// // base url of backend server
// const BASE_URL = "http://localhost:8080/api/employees";

// const employeeApi = axios.create({
//     baseURL: BASE_URL
// });

// export default employeeApi;


// // api/employeeApi.js
// import axios from "axios";

// const BASE_URL = "http://localhost:8080/api/employees";

// const employeeApi = axios.create({ baseURL: BASE_URL });

// // helper functions
// export const getEmployees = () => employeeApi.get("/");
// export const addEmployee = (data) => employeeApi.post("/", data);
// export const deleteEmployee = (id) => employeeApi.delete(`/${id}`);
// export const updateEmployee = (id, data) => employeeApi.put(`/${id}`, data);

// export default employeeApi;

import axios from "axios";

const API_URL = "http://localhost:5000/api"; // ✅ match backend port

export const getEmployees = () => axios.get(`${API_URL}/employees`);
export const addEmployee = (data) => axios.post(`${API_URL}/add-employee`, data);
export const updateEmployee = (id, data) => axios.put(`${API_URL}/update-employee/${id}`, data);
export const deleteEmployee = (id) => axios.delete(`${API_URL}/delete-employee/${id}`);