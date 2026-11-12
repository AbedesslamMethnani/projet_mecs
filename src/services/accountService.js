
import axios from "axios";

const API_URL = "http://localhost:8082/api/accounts";

export const getAccounts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

