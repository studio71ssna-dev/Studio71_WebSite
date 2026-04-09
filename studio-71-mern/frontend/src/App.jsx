import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./Home";
import Invoice from './Invoice';
import OrderPage from './OrderPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/invoice/:id" element={<Invoice />} />
      </Routes>
    </Router>
  );
}

export default App;