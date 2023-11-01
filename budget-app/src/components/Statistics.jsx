import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, Button, Container } from "react-bootstrap";
import "./Statistics.css";

export default function Statistics({ transactionsData }) {
  const [percentageSpent, setPercentageSpent] = useState(null);
  const [totalSpent, setTotalSpent] = useState(0);

  const handleCalculatePercentageClick = () => {
    calculatePercentageSpent();
  };

  const calculatePercentageSpent = () => {
    const totalSpent = transactionsData.reduce((sum, transaction) => {
      if (parseFloat(transaction.amount) < 0) {
        return sum + parseFloat(transaction.amount);
      }
      return sum;
    }, 0);

    const totalIncome = transactionsData.reduce((sum, transaction) => {
      if (parseFloat(transaction.amount) > 0) {
        return sum + parseFloat(transaction.amount);
      }
      return sum;
    }, 0);

    if (totalIncome === 0) {
      setPercentageSpent(0);
    } else {
      const percentage = (totalSpent / totalIncome) * 100;
      setPercentageSpent(percentage.toFixed(2));
    }

    setTotalSpent(totalSpent);
  };

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <Card className="border-5">
        <Card.Header className="bg-primary text-white">
          Monthly Statistics
        </Card.Header>
        <Card.Body className="d-flex justify-content-between flex-column">
          <Card.Title>Calculate Percentage Spent</Card.Title>
          <div className="mb-3">
            <Button
              id="calculatePercentage"
              variant="primary"
              onClick={handleCalculatePercentageClick}
            >
              Push to calculate
            </Button>
          </div>
          <div className="mb-3">
            <Card.Text>Total Spent: ${Math.abs(totalSpent)}</Card.Text>
            {percentageSpent !== null ? (
              <Card.Text>
                Percentage Spent: {Math.abs(percentageSpent)}%
              </Card.Text>
            ) : (
              <Card.Text>
                Click the button to calculate percentage spent.
              </Card.Text>
            )}
          </div>
        </Card.Body>
        <Card.Footer>
          <Link to="/transactions">
            <Button variant="warning">Back to Transactions</Button>
          </Link>
        </Card.Footer>
      </Card>
    </Container>
  );
}
