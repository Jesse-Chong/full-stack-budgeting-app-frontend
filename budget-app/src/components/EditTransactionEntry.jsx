import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";

export default function EditTransactionEntry() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [transactionsData, setTransactionsData] = useState({
    item_name: "",
    amount: 0,
    date: "",
    from: "",
  });

  const handleTextChange = (e) => {
    const fieldName = e.target.id;
    const value = e.target.value;
    console.log(`Updating ${fieldName} with value: ${value}`);
    setTransactionsData({ ...transactionsData, [e.target.id]: e.target.value });
  };

  const updateTransactionsEntry = async () => {
    try {
      const response = await fetch(`http://localhost:1111/transactions/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transactionsData),
      });

      if (response.ok) {
        navigate(`/transactions/${id}`);
      } else {
        console.error("Transaction entry update failed:", response.status);
      }
    } catch (error) {
      console.error("Error while updating transaction entry:", error);
    }
  };

  useEffect(() => {
    const fetchTransactionData = async () => {
      try {
        const response = await fetch(`http://localhost:1111/transactions/${id}`);
        if (response.ok) {
          const data = await response.json();
          setTransactionsData(data);
        } else {
          console.error("Failed to fetch transaction data:", response.status);
        }
      } catch (error) {
        console.error("Error while fetching transaction data:", error);
      }
    };
    fetchTransactionData();
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault(e);
    updateTransactionsEntry();
  };

  return (
    <div className="EditTransactionEntry">
      <h1> Edit </h1>
      <Card className="border-5">
        <Card.Body>
          <form onSubmit={handleSubmit}>
            <label htmlFor="item-name">Item's Name:</label>
            <input
              id="item_name"
              value={transactionsData.item_name}
              type="text"
              onChange={handleTextChange}
              placeholder="item-name"
              required
            />
            <br />
            <label htmlFor="amount">Amount:</label>
            <input
              id="amount"
              value={transactionsData.amount}
              type="number"
              onChange={handleTextChange}
              placeholder="amount"
              required
            />
            <br />
            <label htmlFor="date">Date:</label>
            <input
              id="date"
              value={transactionsData.date}
              type="text"
              onChange={handleTextChange}
              placeholder="date"
              required
            />
            <br />
            <label htmlFor="from">From:</label>
            <input
              id="from"
              value={transactionsData.from}
              type="text"
              onChange={handleTextChange}
              placeholder="from"
              required
            />
            <br />
            <br />
            <button type="submit">Submit</button>
          </form>
          <br />
          <Link to="/transactions">
            <button>Nevermind, take me back!</button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
}