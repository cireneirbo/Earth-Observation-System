import { Outlet, Link } from "react-router-dom";
import Nav from './components/Nav';
import './App.css';

function App() {
  return (
    <div>
      <Nav />
      <Outlet />
    </div>
  );
}

export default App;
