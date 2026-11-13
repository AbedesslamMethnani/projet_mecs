
import axios from "axios";

const API_URL = "http://localhost:8082/api/accounts";

export const getAccounts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createAccount = async (accountData) => {
  const response = await axios.post(API_URL, accountData);
  return response.data;
};

export const updateAccountStatus = async (id, status) => {
  const response = await axios.patch(
    `${API_URL}/${id}/status`,
    null,
    {
      params: { status },
    }
  );
  return response.data;
};
