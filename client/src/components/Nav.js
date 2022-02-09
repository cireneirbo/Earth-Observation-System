import { Link } from "react-router-dom";

function Nav() {
  return (
    <div className="nav-bar">
      <h1>Identi-Flora-Cation</h1>

      <nav className="App-link"> 
        <Link to="/" className="App-link">Home</Link> |{" "}
        <Link to="/events" className="App-link">Events</Link> |{" "}
        <Link to="/about" className="App-link">About</Link>
      </nav>

    </div>
  );
}

export default Nav;