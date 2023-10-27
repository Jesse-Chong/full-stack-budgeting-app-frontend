import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const deleteTransaction = async (id) => {
    try {
      const response = await fetch(`http://localhost:1111/transactions/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        console.error("Error deleting transaction");
      } else {
        console.log("Transaction deletion completed:", response.status);
      }
    } catch (err) {
      console.error("Error while deleting transaction:", err);
    }
  };
  

export default function ShowTransaction() {
    const [transactionsData, setTransactionsData] = useState(null);
    const { item_name, amount, date, from } = transactionsData || {};
    const navigate = useNavigate();
    const { id } = useParams();
    console.log("ID Parameter:", id);

    useEffect(() => {
        const fetchTransactionData = async () => {
            try {
                const response = await fetch(`http://localhost:1111/transactions/${id}`)
                const transactionData = await response.json();
                setTransactionsData(transactionData);
            } catch (err) {
                console.log(err);
            }
        };
        fetchTransactionData();
    }, [id]);
    
      const handleDelete = async () => {
        await deleteTransaction(id);
        navigate("/transactions");
      };

    return (
        <>
        <div>
            {transactionsData && (
                 <>
                <h1>Full Details</h1>
                <p>{item_name}</p>
                <p>{amount}</p>
                <p>{date}</p>
                <p>{from}</p>
                <button onClick={() => navigate('/transactions')}>Back</button>
                <button onClick={handleDelete}>Complete Erasure</button>
                <button onClick={() => navigate(`/transactions/${id}/edit`)}>Edit</button>
                </>
            )}
            </div>
            </>
    )
}