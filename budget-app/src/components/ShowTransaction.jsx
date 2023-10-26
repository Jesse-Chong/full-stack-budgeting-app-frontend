import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

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
                </>
            )}
            </div>
            </>
    )
}