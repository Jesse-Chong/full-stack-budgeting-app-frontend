import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TransactionIndex from "./components/TransactionsIndex";
import { Navbar, Nav } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ShowTransaction from "./components/ShowTransaction";


function App() {
  return (
    <Router>
      <div className="app">
        <Navbar
          className="d-flex justify-content-between"
          bg="dark"
          variant="dark"
          >
            <Nav>
              <Nav.Link href="/transactions">Transactions</Nav.Link>
            </Nav>
            <Navbar.Brand>Budget App</Navbar.Brand>
            <Nav>
              <Nav.Link href="/transactions/statistics">Statistics</Nav.Link>
            </Nav>
          </Navbar>
          <Routes>
            <Route path='/' element={<TransactionIndex />} />
            <Route path="/transactions" element={<TransactionIndex/>} />
            <Route path="/transactions/:id" element={<ShowTransaction/>} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;
