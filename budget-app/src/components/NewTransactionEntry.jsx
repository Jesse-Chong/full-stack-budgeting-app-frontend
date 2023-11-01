import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card } from "react-bootstrap";

export default function NewTransactionEntry() {
  const navigate = useNavigate();
  const [formTransactionData, setFormTransactionData] = useState({
    item_name: "",
    amount: 0,
    date: "",
    from: "",
  });

  const handleTextChange = (e) => {
    setFormTransactionData({
      ...formTransactionData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedDate = new Date(
      formTransactionData.date
    ).toLocaleDateString();
    try {
      const response = await fetch("http://localhost:1111/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formTransactionData, date: formattedDate }),
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
    <>
      <h1
        className="text-center"
        style={{ background: "#333", color: "white", padding: "10px" }}
      >
        New
      </h1>
      <div className="d-flex justify-content-center align-items-center">
        <div className="NewTransaction">
          <Card className="border-5">
            <Card.Body>
              <form onSubmit={handleSubmit}>
                <label htmlFor="item_name">Item Name</label>
                <br />
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
                <br />
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
                <br />
                <input
                  id="date"
                  value={formTransactionData.date}
                  type="date"
                  onChange={handleTextChange}
                  placeholder="date"
                  required
                />
                <br />
                <label htmlFor="from">From:</label>
                <br />
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
                <button className="btn btn-primary" type="submit">
                  Submit
                </button>
              </form>
              <br />
              <Link to="/transactions">
                <button className="btn btn-warning">
                  Nevermind, take me back!
                </button>
              </Link>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
}
