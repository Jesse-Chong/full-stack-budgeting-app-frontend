import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, Container } from "react-bootstrap";
import './TransactionIndex.css'
const apiUrl = 'http://localhost:1111';

function capitalizeWords(string) {
  return string
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

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
      <Container>
        <div className={totalClass}>
          <h1>Bank Account Total: {total}</h1>
        </div>
        {transactionsData.length > 0 && (
          <Table bordered hover>
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactionsData.map((transaction) => (
                <tr key={transaction.id}>
                  <td>
                    <Link to={`/transactions/${transaction.id}`}>
                      {capitalizeWords(transaction.item_name)}
                    </Link>
                  </td>
                  <td>{transaction.amount}</td>
                  <td>{transaction.date}</td>
                  <td>
                    <Link to={`/transactions/${transaction.id}/edit`}>Edit</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
    );
}