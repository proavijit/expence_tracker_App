import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTransactions } from "../features/transaction/transactionSlice";

const Form = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [amount, setAmount] = useState('');
  const dispatch = useDispatch();
  const { isLoading, isError } = useSelector((state) => state.transaction);

  const handleCreate = (e) => {
    e.preventDefault();
    dispatch(createTransactions({
      name,
      type,
      amount: Number(amount),
    }));
  };

  return (
    <div className="form">
      <h3>Add new transaction</h3>
      <form onSubmit={handleCreate}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter title"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group radio">
          <label>Type</label>
          <div className="radio_group">
            <input
              type="radio"
              name="type"
              value="income"
              checked={type === 'income'}
              onChange={() => setType('income')}
            />
            <label>Income</label>
          </div>
          <div className="radio_group">
            <input
              required
              type="radio"
              name="type"
              value="expense"
              checked={type === 'expense'}
              onChange={() => setType('expense')}
            />
            <label htmlFor="transaction_type">Expense</label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            required
            placeholder="300"
            name="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <button disabled={isLoading} className="btn" type="submit">
          Add Transaction
        </button>

        {isError && !isLoading && <p className="error">There was an error occurred</p>}
      </form>
      <button className="btn cancel_edit">Cancel Edit</button>
    </div>
  );
};

export default Form;
