import editImage from '../../assets/images/edit.svg';
import deleteImage from '../../assets/images/delete.svg';
import { useDispatch } from 'react-redux';
import { editActive } from '../../features/transaction/transactionSlice';

const Transaction = ({ transaction }) => {
  const { name, amount, type } = transaction || {};

  const dispatch = useDispatch()

  const handleEdit = () => {
    dispatch(editActive(transaction))
  }


  return (
    <li className={`transaction ${type}`}>
      <p>{name}</p>
      <div className="right">
        <p>৳ {amount}</p>
        <button className="link" onClick={handleEdit}>
          <img className="icon" src={editImage} alt="Edit" />
        </button>
        <button className="link">
          <img className="icon" src={deleteImage} alt="Delete" />
        </button>
      </div>
    </li>
  );
};

export default Transaction;
