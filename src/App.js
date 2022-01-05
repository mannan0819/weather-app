import { Route, BrowserRouter, Routes } from "react-router-dom";
import { Weather } from "./components/wather";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Weather />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
