import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addTransaction, deleteTransaction, editTransaction, getTransactions } from "./transactionAPI"

const initialState = {
  transaction: [],
  isLoading: false,
  isError:false,
  error: ''
}


export const fetchTransactions = createAsyncThunk('transaction/fetchTransactions',async()=> {
  const transactions = await getTransactions()
  return transactions
})

export const createTransactions = createAsyncThunk('transaction/createTransactions', async(data)=>{
  const transaction = await addTransaction(data)
  return transaction
})

export const changeTransaction = createAsyncThunk("transaction/changeTransaction", async({id, data})=>{
  const transaction = await editTransaction(id, data);
      return transaction
})

export const removeTransaction = createAsyncThunk("transaction/removeTransaction", async(id)=>{
  const transaction = await deleteTransaction(id)
  return transaction
})

//create Slice

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  extraReducers: (builder) =>{
    builder
    .addCase(fetchTransactions.pending, (state, action)=>{
      state.isError = false;
      state.isLoading = true;
    })
    .addCase(fetchTransactions.fulfilled, (state, action)=>{
      state.isError = false;
      state.isLoading = false;
      state.transaction = action.payload;
    })
    .addCase(fetchTransactions.rejected, (state, action) =>{
      state.isLoading = false;
      state.isError = true;
      state.error = action.error.message;
      state.transaction = [];
    })
    // create Transaction
    .addCase(createTransactions.pending, (state, action)=>{
      state.isError = false;
      state.isLoading = true;
    })
    .addCase(createTransactions.fulfilled, (state, action)=>{
      state.isError = false;
      state.isLoading = false;
      state.transaction.push(action.payload);
    })
    .addCase(createTransactions.rejected, (state, action) =>{
      state.isLoading = false;
      state.isError = true;
      state.error = action.error.message;
      state.transaction = [];
    })
    
    // change Transaction
    .addCase(changeTransaction.pending, (state, action)=>{
      state.isError = false;
      state.isLoading = true;
    })
    .addCase(changeTransaction.fulfilled, (state, action)=>{
      state.isError = false;
      state.isLoading = false;
      const indexToUpdate = state.transaction.findIndex(t=>t.id === action.payload.id);
      state.transaction[indexToUpdate] = action.payload
    })
    .addCase(changeTransaction.rejected, (state, action) =>{
      state.isLoading = false;
      state.isError = true;
      state.error = action.error.message;
      state.transaction = [];
    })
        // delete Transaction
        .addCase(removeTransaction.pending, (state, action)=>{
          state.isError = false;
          state.isLoading = true;
        })
        .addCase(removeTransaction.fulfilled, (state, action)=>{
          state.isError = false;
          state.isLoading = false;
          state.transaction = state.transaction.filter(t => t.id !== action.payload)
        })
        .addCase(removeTransaction.rejected, (state, action) =>{
          state.isLoading = false;
          state.isError = true;
          state.error = action.error.message;
          state.transaction = [];
        })

  }
})

export default transactionSlice.reducer