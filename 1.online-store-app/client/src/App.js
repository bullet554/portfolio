import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Product from './pages/Product';
import Registration from './pages/Registration';
import Cart from './pages/Cart';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;