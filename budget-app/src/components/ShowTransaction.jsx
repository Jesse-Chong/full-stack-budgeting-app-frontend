import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

function capitalizeWords(string) {
  return string
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

module.export = { capitalizeWords };

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
        const response = await fetch(
          `http://localhost:1111/transactions/${id}`
        );
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
      <h1
        className="text-center"
        style={{ background: "#333", color: "white", padding: "10px" }}
      >
        Full Details
      </h1>
      <div className="d-flex justify-content-center align-items-center h-100">
        <Card className="border-5">
          <Card.Body className="text-center p-3">
            {transactionsData && (
              <>
                <p>{capitalizeWords(item_name)}</p>
                <p>Amount: {amount}</p>
                <p>Date: {date}</p>
                <p>From: {capitalizeWords(from)}</p>
                <div>
                  <button
                    className="btn btn-warning me-2"
                    onClick={() => navigate("/transactions")}
                  >
                    Back
                  </button>
                  <button
                    className="btn btn-danger me-2"
                    onClick={handleDelete}
                  >
                    Complete Erasure
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate(`/transactions/${id}/edit`)}
                  >
                    Edit
                  </button>
                </div>
              </>
            )}
          </Card.Body>
        </Card>
      </div>
    </>
  );
}
