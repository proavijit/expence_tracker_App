import axios from "../../utils/axios"


export const getTransactions = async () => {
  const responce = await axios.get('/transactions');
  return responce.data
}

export const addTransaction = async (data) =>{
  const responce = await axios.post('/transactions', data);
  return responce.data
}

export const editTransaction = async(id, data) => {
  const responce = await axios.put(`/transactions${id}`, data);
  return responce.data;

}

export const deleteTransaction = async(id) => {
 const responce = axios.delete(`/transactions${id}`)
 return responce.data;
}