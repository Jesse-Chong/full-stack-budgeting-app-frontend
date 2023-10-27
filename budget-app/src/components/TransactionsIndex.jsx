import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './TransactionIndex.css'
const apiUrl = 'http://localhost:1111';

export default function TransactionIndex() {
    const [transactionsData, setTransactionsData] = useState([]);
    const [total, setTotal] = useState(0);
    console.log("total", total)

    useEffect(() => {
      fetchTransactions();
    }, []);
  
    const fetchTransactions = async () => {
      try {
        const response = await fetch(`${apiUrl}/transactions`);
        const data = await response.json();
        console.log("Fetched data:", data);
    
        data.forEach(transaction => {
          transaction.amount = parseFloat(transaction.amount);
        });
    
        setTransactionsData(data);
    
        const newTotal = data.reduce((sum, t) => sum + t.amount, 0);
        console.log("New total:", newTotal);
        setTotal(newTotal);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    let totalClass;
  
    if (total < 0) {
      totalClass = "red";
    } else if (total <= 100) {
      totalClass = "yellow";
    } else {
      totalClass = "green";
    }
  


      return (
        <>
         <div className={totalClass}>
        <h1>Bank Account Total: {total}</h1>
        </div>
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