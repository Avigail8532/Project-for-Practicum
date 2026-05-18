import axios from 'axios';

// הכתובת הבסיסית 
const BASE_URL = 'http://localhost:3000/api/admin'; 

export const getAllUsers = async () => {
  const response = await axios.get(`${BASE_URL}/admin/users`);
  return response.data; // או פשוט להחזיר את response, תלוי איך בנית את ה-API
};
export const getUserHistory = async (userId) => {
  const response = await axios.get(`${BASE_URL}/admin/users/${userId}/history`);
  return response.data;
};