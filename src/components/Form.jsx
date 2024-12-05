import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeTransaction, createTransactions } from "../features/transaction/transactionSlice";

const Form = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [amount, setAmount] = useState('');
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();
  const { isLoading, isError, editing } = useSelector((state) => state.transaction);

  // Listen for edit mode activation
  useEffect(() => {
    if (editing?.id) {
      setEditMode(true);
      setName(editing.name || "");
      setType(editing.type || "");
      setAmount(editing.amount || "");
    } else {
      setEditMode(false);
      reset();
    }
  }, [editing]);

  // Reset form fields
  const reset = () => {
    setName("");
    setType("");
    setAmount("");
  };

  // Handle transaction creation
  const handleCreate = (e) => {
    e.preventDefault();
    dispatch(createTransactions({
      name,
      type,
      amount: Number(amount),
    }));
    reset();
  };

  // Handle transaction update
  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(changeTransaction({
      id: editing?.id,
      data: {
        name,
        type,
        amount: Number(amount),
      },
    }));
    setEditMode(false);
    reset();
  };

  // Cancel edit mode
  const cancelEditMode = () => {
    reset();
    setEditMode(false);
  };

  return (
    <div className="form">
      <h3>{editMode ? "Edit transaction" : "Add new transaction"}</h3>
      <form onSubmit={editMode ? handleUpdate : handleCreate}>
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
              type="radio"
              name="type"
              value="expense"
              checked={type === 'expense'}
              onChange={() => setType('expense')}
            />
            <label>Expense</label>
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
          {editMode ? 'Update Transaction' : 'Add Transaction'}
        </button>

        {isError && !isLoading && <p className="error">There was an error occurred</p>}
      </form>
      {editMode && (
        <button onClick={cancelEditMode} className="btn cancel_edit">
          Cancel Edit
        </button>
      )}
    </div>
  );
};

export default Form;
