import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const apiUrl = 'http://localhost:1111';


export default function TransactionIndex() {
    const [transactionsData, setTransactionsData] = useState(null);

    useEffect(() => {
        try {
          fetch(`${apiUrl}/transactions`)
            .then((res) => {
              if (!res.ok) {
                throw new Error(`Request failed with status: ${res.status}`);
              }
              return res.json();
            })
            .then((data) => setTransactionsData(data))
            .catch((error) => console.error("Fetch error:", error));
        } catch (error) {
          console.error("Other error:", error);
        }
      }, []);

      return (
        <>
        <h1>Bank Account Total:</h1>
            {transactionsData &&
            transactionsData.map((transaction) => (
                <div key={transaction.id}>
                    <Link to={`/transactions/${transaction.id}`}>
                    {transaction.item_name} 
                    </Link>
                    {transaction.amount}
                    {transaction.date}
                    </div>
            ))}
        </>
      )
}