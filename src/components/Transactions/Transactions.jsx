import { useDispatch, useSelector } from 'react-redux';
import Transaction from './Transaction';
import { useEffect } from 'react';
import { fetchTransactions } from '../../features/transaction/transactionSlice';

const Transactions = () => {

  const dispatch = useDispatch()

  const { transaction, isLoading, isError, error } = useSelector((state) => state.transaction);

  useEffect(() => {
    dispatch(fetchTransactions())
  }, [dispatch])

  // Decide what to render
  let content = null;

  if (isLoading) content = <p>Loading....</p>;
  if (!isLoading && isError) content = <p className='error'>There was an error occurred: {error}</p>;
  if (!isLoading && !isError && transaction?.length > 0) {
    content = transaction.map((t) => <Transaction key={t.id} transaction={t} />);
  }
  if (!isLoading && !isError && transaction?.length === 0) {
    content = <p>No Transaction Found!</p>;
  }

  return (
    <div>
      <p className="second_heading">Your Transactions:</p>
      <div className="container_of_list_of_transactions">
        <ul>
          {content}
        </ul>
      </div>
    </div>
  );
};

export default Transactions;

