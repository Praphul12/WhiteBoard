import Board from "./components/Board"
import Toolbar from "./Toolbar";
import BoardProvider from "./store/board-provider";
import ToolboxProvider from "./store/toolbox-provider";
import ToolBox from "./components/ToolBox";
function App() {
  return (
    <BoardProvider>
    <ToolboxProvider>
      <ToolBox/>
      <Toolbar/>
      <Board/>
    </ToolboxProvider>
    </BoardProvider>

  );
}

export default App;
