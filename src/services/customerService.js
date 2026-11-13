import axios from "axios";

const API_URL = "http://localhost:8081/api/customers";

export const getCustomers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
//ajouter
export const createCustomer = async (customerData) => {
  const response = await axios.post(API_URL, customerData);
  return response.data;
};
//modifier
export const updateCustomer = async (id, customerData) => {
  const response = await axios.put(`${API_URL}/${id}`, customerData)
  return response.data
}
//supprimer
export const deleteCustomer = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`)
  return response.data
}