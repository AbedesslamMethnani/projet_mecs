
import axios from 'axios'

const API_URL = 'http://localhost:8083/api/transactions'

export const getTransactions = async () => {
  const response = await axios.get(API_URL)
  return response.data
}
