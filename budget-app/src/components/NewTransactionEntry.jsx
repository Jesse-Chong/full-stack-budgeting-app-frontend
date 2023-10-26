import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card } from "react-bootstrap"

export default function NewTransactionEntry() {
  const navigate = useNavigate();
  const [formTransactionData, setFormTransactionData] = useState({
    item_name: "",
    amount: 0,
    date: "",
    from: "",
  });

  const handleTextChange = (e) => {
    setFormTransactionData({ ...formTransactionData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:1111/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formTransactionData),
      });
  
      if (response.ok) {
        const newItem = await response.json();
        const newItemId = newItem.id;
        console.log("New Item ID:", newItemId);

        navigate(`/transactions/${newItemId}`);
      } else {
        console.error("Transaction entry creation failed:", response.status);
      }
    } catch (error) {
      console.error("Error while creating transaction:", error);
    }
  };

  return (
    <div className="NewTransaction">
      <h1>New</h1>
      <Card className="border-5">
        <Card.Body>
          <form onSubmit={handleSubmit}>
            <label htmlFor="item_name">Item Name:</label>
            <input
              id="item_name"
              value={formTransactionData.item_name}
              type="text"
              onChange={handleTextChange}
              placeholder="item name"
              required
            />
            <br />
            <label htmlFor="amount">Amount:</label>
            <input
              id="amount"
              value={formTransactionData.title}
              type="number"
              onChange={handleTextChange}
              placeholder="amount"
              required
            />
            <br />
            <label htmlFor="date">date:</label>
            <input
              id="date"
              value={formTransactionData.date}
              type="number"
              onChange={handleTextChange}
              placeholder="date"
              required
            />
            <br />
            <label htmlFor="from">From:</label>
            <input
              id="from"
              value={formTransactionData.from}
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