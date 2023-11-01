import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import { useState, useEffect } from "react";
import TransactionIndex from "./components/TransactionIndex";
import { Navbar, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ShowTransaction from "./components/ShowTransaction";
import NewTransactionEntry from "./components/NewTransactionEntry";
import EditTransactionEntry from "./components/EditTransactionEntry";
import Statistics from "./components/Statistics";

function App() {
  const [transactionsData, setTransactionsData] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchTotal();
    fetchTransactions();
  }, []);

  const fetchTotal = async () => {
    try {
      const apiUrl = "http://localhost:1111";
      const response = await fetch(`${apiUrl}/transactions`);
      const data = await response.json();

      const newTotal = data.reduce(
        (sum, transaction) => sum + parseFloat(transaction.amount),
        0
      );
      setTotal(newTotal);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchTransactions = async () => {
    try {
      const apiUrl = "http://localhost:1111";
      const response = await fetch(`${apiUrl}/transactions`);
      const data = await response.json();

      data.forEach((transaction) => {
        transaction.amount = parseFloat(transaction.amount);
      });

      setTransactionsData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <Router>
      <div className="app">
        <Navbar
          className="d-flex justify-content-between"
          bg="dark"
          variant="dark"
        >
          <Nav>
            <Nav.Link href="/transactions/new">New Entry</Nav.Link>
          </Nav>
          <Navbar.Brand as={NavLink} to="/transactions">
            Budget App
          </Navbar.Brand>
          <Nav>
            <Nav.Link href="/transactions/statistics">Statistics</Nav.Link>
          </Nav>
        </Navbar>
        <Routes>
          <Route
            path="/transactions"
            element={
              <TransactionIndex
                total={total}
                transactionsData={transactionsData}
              />
            }
          />
          <Route path="/transactions/new" element={<NewTransactionEntry />} />
          <Route path="/transactions/:id" element={<ShowTransaction />} />
          <Route
            path="/transactions/:id/edit"
            element={<EditTransactionEntry />}
          />
          <Route
            path="/transactions/statistics"
            element={<Statistics transactionsData={transactionsData} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
