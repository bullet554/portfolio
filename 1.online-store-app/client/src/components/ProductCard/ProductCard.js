import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    const { addToCart } = useContext(CartContext);
    const { user } = useAuth();

    const handleAddToCart = async () => {
        if (!user) {
            alert('Please log in or register first');
            return;
        }
        await addToCart(product, 1, product.color, product.size);
    };

    return (
        <div className="product__item">
            <div className="product__image-wrapper">
                <img
                    src={product.img}
                    alt={product.name}
                    className="product__img"
                />
                <button
                    className="product__add"
                    onClick={handleAddToCart}
                >
                    Add to Cart
                </button>
            </div>
            <div className="product__content">
                <Link
                    to={`/product/${product.id}`}
                    className="product__name"
                >
                    {product.name}
                </Link>
                <p className="product__info">{product.info}</p>
                <Link to="#" className="product__price">${product.price}</Link>
            </div>
        </div>
    );
};

export default ProductCard;