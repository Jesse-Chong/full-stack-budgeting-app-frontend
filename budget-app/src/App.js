import { BrowserRouter as Router } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

import './App.css';


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
      </div>
    </Router>
  );
}

export default App;
