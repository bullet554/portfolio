import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import Subscribe from "../components/Subscribe/Subscribe";
import Loader from "../components/Loader/Loader";
import CartCard from "../components/CartCard/CartCard";
import '../styles/pagesStyles/Cart.css';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);
    const { user } = useAuth();

    const navigate = useNavigate();

    const isLoading = !Array.isArray(cart);

    // if (!Array.isArray(cart)) {
    //     return <div>Загрузка корзины...</div>;
    // }

    const total = cart.reduce((acc, item) => {
        if (item && item.price) {
            return acc + item.quantity * item.price;
        }
        return acc;
    }, 0);

    const handleQuantityChange = (cartItemId, newQuantity) => {
        updateQuantity(cartItemId, newQuantity);
    };

    const handleRemove = (cartItemId) => {
        removeFromCart(cartItemId);
    };

    const handleClearCart = async (e) => {
        e.preventDefault();
        await clearCart();
    };


    const handleCheckout = () => {
        if (!user) {
            alert('Please log in or register first');
            return;
        }
        // Логика перехода к оформлению заказа
    };

    return (
        <>
            <section className="breadcrumbs center">

                <div className="breadcrumbs__left">
                    <h1 className="breadcrumbs__left_title">SHOPPING CART</h1>
                </div>

                <ul className="breadcrumbs__right"></ul>
            </section>

            <section className="center">
                <div className="cart-page">

                    <div className="cart-product__added">

                        {isLoading ? (
                            <div className="cart-product__loader">
                                <Loader text="Загрузка корзины..." />
                            </div>
                        ) : cart.length === 0 ? (
                            <div>The shopping cart is empty</div>
                        ) : (
                            <>
                                {cart.map((item) => (
                                    <CartCard
                                        key={item.id}
                                        cartItem={item}
                                        onQuantityChange={handleQuantityChange}
                                        onRemove={handleRemove}
                                    />
                                ))}
                            </>
                        )}

                        {/* {cart.length === 0 ? (
                            <div>The shopping cart is empty</div>
                        ) : (
                            <>
                                {cart.map((item) => (
                                    <CartCard
                                        key={item.id}
                                        cartItem={item}
                                        onQuantityChange={handleQuantityChange}
                                        onRemove={handleRemove}
                                    />
                                ))}
                            </>
                        )} */}

                        <div className="cart-product__buttons">

                            <div className="cart-product__button_left">
                                <form className="cart-product__button_name" action="#">
                                    <button
                                        className="cart-product__button_style"
                                        onClick={handleClearCart}
                                    >
                                        CLEAR SHOPPING CART
                                    </button>
                                </form>
                            </div>

                            <div className="cart-product__button_right">
                                <form
                                    className="cart-product__button_name" action="#"
                                    onSubmit={(e) => { e.preventDefault(); }}
                                >
                                    <button
                                        className="cart-product__button_style"
                                        onClick={() => navigate("/catalog")}
                                    >
                                        CONTINUE SHOPPING
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="cart-adress">

                        <div className="cart__fields">
                            <h2 className="cart-adress__title">SHIPPING ADRESS</h2>
                            <input className="cart-adress__input" type="text" placeholder="Bangladesh" />
                            <input className="cart-adress__input" type="text" placeholder="State" />
                            <input className="cart-adress__input" type="text" placeholder="Postcode / Zip" />
                            <form className="cart-adress__button_name" action="#">
                                <button className="cart-adress__button_style">GET A QUOTE</button>
                            </form>
                        </div>

                        <div className="cart-buy">
                            <p className="cart-buy__subtitle">SUB TOTAL ${total}</p>
                            <h2 className="cart-buy__title">GRAND TOTAL <span className="cart-buy_select-color">${total}</span></h2>
                            <div className="cart-buy__line"></div>
                            <form className="cart-buy__button_name" action="#">
                                <button
                                    className="cart-buy__button_style"
                                    onClick={handleCheckout}
                                >
                                    PROCEED&nbsp;TO&nbsp;CHECKOUT
                                </button> {/* Думаю пока что не реализовывать логику сохранения в БД закза */}
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <Subscribe />
        </>
    );
}

export default Cart;