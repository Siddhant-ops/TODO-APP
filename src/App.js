import "./App.css";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import { useStateValue } from "./Context/StateProvider";

function App() {
  const [{ user }, dispatch] = useStateValue();
  return <div className="App">{!user ? <Login /> : <Home />}</div>;
}

export default App;
