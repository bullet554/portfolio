import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Cart from './pages/Cart';
import ProductDetail from './pages/ProductDetail';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
    );
};

export default AppRoutes;