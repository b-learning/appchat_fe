import Login from "./page/Login/Login";
import { Routes, Route } from "react-router-dom";
import SignUp from "./page/SignUp/SignUp";
import NotFound from "./page/NotFound/notfound.component";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
