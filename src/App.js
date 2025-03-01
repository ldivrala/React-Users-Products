import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import Users from './pages/Users';
import Products from './pages/Products';

function App() {
  return (
    <DataProvider>
      <Router>
        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="/products" element={<Products />} />
          <Route path="/" element={<h1>Welcome! Go to /users or /products</h1>} />
        </Routes>
      </Router>
    </DataProvider>
  );
}

export default App;