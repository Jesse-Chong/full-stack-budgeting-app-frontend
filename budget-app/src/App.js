import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import TransactionIndex from "./components/TransactionsIndex";
import { Navbar, Nav } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ShowTransaction from "./components/ShowTransaction";
import NewTransactionEntry from "./components/NewTransactionEntry";


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
            <Route path='/' element={<TransactionIndex />} />
            <Route path="/transactions" element={<TransactionIndex/>} />
            <Route path="/transactions/:id" element={<ShowTransaction/>} />
            <Route path="/transactions/new" element={<NewTransactionEntry />} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;
