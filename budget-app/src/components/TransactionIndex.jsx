import { Link } from "react-router-dom";
import { Table, Container } from "react-bootstrap";
import "./TransactionIndex.css";

function capitalizeWords(string) {
  return string
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function TransactionIndex({ transactionsData, total }) {
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
      <div className={`${totalClass} text-center bg-light`}>
        <h1>Bank Account Total: ${total}</h1>
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
                <td>${transaction.amount}</td>
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
