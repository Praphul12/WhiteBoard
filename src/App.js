import Board from "./components/Board";
import Toolbar from "./Toolbar";
import BoardProvider from "./store/board-provider";
import ToolboxProvider from "./store/toolbox-provider";
import ToolBox from "./components/ToolBox";
import { useState, useEffect } from "react";
import Authentication from "./components/Authentication";
import "./App.css"

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
  const savedToken = localStorage.getItem("token");
  if (savedToken) {
    setToken(savedToken);
  }
  }, []);
  const handleLogin = (jwt) => {
    console.log(jwt);
    localStorage.setItem("token", jwt);
    setToken(jwt);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  if (!token) {
    // show login/signup if no token
    return <Authentication onLogin={handleLogin} />;
  }

  // show the app once logged in
  return (
    <BoardProvider>
      <ToolboxProvider>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
        <ToolBox />
        <Toolbar />
        <Board />
      </ToolboxProvider>
    </BoardProvider>
  );
}

export default App;
