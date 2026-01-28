import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import Breadcrumbs from "../components/Navigation/Breadcrumbs/Breadcrumbs";
import ProductCard from "../components/ProductCard/ProductCard";
import Subscribe from "../components/Subscribe/Subscribe";
import Loader from "../components/Loader/Loader";
import '../styles/pagesStyles/Product.css';

const Product = () => {
    const { id } = useParams();
    const { addToCart } = useContext(CartContext);
    const { user } = useAuth();

    const [product, setProduct] = useState(null);
    const [offerProducts, setOfferProducts] = useState([]);

    useEffect(() => {
        fetch(`/api/products/${id}`)
            .then(response => response.json())
            .then(data => setProduct(data))
            .catch(error => console.error('Error:', error));


        fetch('/api/products')
            .then(response => response.json())
            .then(data => setOfferProducts(data))
            .catch(error => console.error('Error:', error));
    }, [id]); // get offer products

    if (!product) {
        return <Loader />;
    }

    const featuredProducts = offerProducts.filter(p => p.is_featured);
    const currentProducts = featuredProducts.slice(0, 3);

    const handleAddToCart = async () => {
  if (!user) {
    alert("Please log in or register first");
    return;
  }

  try {
    await addToCart(product, 1, null, null); // <-- передаём сам product
    alert("Product added to cart");
  } catch (error) {
    console.error("Add to cart error:", error);
    alert("Failed to add product to cart"); // вренменно
  }
};


    return (
        <div>
            <Breadcrumbs />
            <section className="product-page center">

                <div className="product-page__show">

                    <div className="product-page__view">

                        <div className="product-page__arrow_left product-page__arrow">
                            <svg className="product-page__arrow_icon" width="31" height="31" viewBox="0 0 31 31" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M21.6998 7.7499L13.9498 15.4999L21.6998 23.2499L20.1498 26.3499L9.2998 15.4999L20.1498 4.6499L21.6998 7.7499Z"
                                    fill="black" />
                            </svg>
                        </div>

                        <img
                            src={product.img}
                            alt={product.name}
                            className="product-page__slide_img"
                        />

                        <div className="product-page__arrow_right product-page__arrow">
                            <svg className="product-page__arrow_icon" width="31" height="31" viewBox="0 0 31 31" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M9.2998 23.2499L17.0498 15.4999L9.2998 7.7499L10.8498 4.6499L21.6998 15.4999L10.8498 26.3499L9.2998 23.2499Z"
                                    fill="black" />
                            </svg>

                        </div>
                    </div>

                    <div className="product-page__content">

                        <div className="product-page__info">
                            <div className="product-page__info_subtitle">SOME KIND OF COLLECTION</div>
                            {/* <div className="product-page__info_subtitle">{product.collection}</div> */}
                            <div className="product-page__info_line center"></div>
                            <div className="product-page__info_title">{product.name}</div>
                            <div className="product-page__info_text">{product.info}</div>
                            <div className="product-page__info_price">${product.price}</div>
                        </div>

                        <div className="product-page__line"></div>

                        <div className="product-page__options">

                            <div className="product-page__choose sort">

                                <details className="sort__dtls">
                                    <summary className="sort__dtls__title">CHOOSE COLOR<svg width="10" height="5"
                                        viewBox="0 0 11 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M5.00214 5.00214C4.83521 5.00247 4.67343 4.94433 4.54488 4.83782L0.258102 1.2655C0.112196 1.14422 0.0204417 0.969958 0.00302325 0.781035C-0.0143952 0.592112 0.0439493 0.404007 0.165221 0.258101C0.286493 0.112196 0.460759 0.0204417 0.649682 0.00302327C0.838605 -0.0143952 1.02671 0.043949 1.17262 0.165221L5.00214 3.36602L8.83167 0.279536C8.90475 0.220188 8.98884 0.175869 9.0791 0.149125C9.16937 0.122382 9.26403 0.113741 9.35764 0.1237C9.45126 0.133659 9.54198 0.162021 9.6246 0.207156C9.70722 0.252292 9.7801 0.313311 9.83906 0.386705C9.90449 0.460167 9.95405 0.546351 9.98462 0.639855C10.0152 0.733359 10.0261 0.83217 10.0167 0.930097C10.0073 1.02802 9.97784 1.12296 9.93005 1.20895C9.88227 1.29494 9.81723 1.37013 9.73904 1.42982L5.45225 4.88068C5.32002 4.97036 5.16154 5.01312 5.00214 5.00214Z"
                                            fill="#6F6E6E" />
                                    </svg>
                                    </summary>
                                    <div className="sort__dtls__box">
                                        <label><input type="checkbox" /> XS</label>
                                        <label><input type="checkbox" /> S</label>
                                        <label><input type="checkbox" /> M</label>
                                        <label><input type="checkbox" /> L</label>
                                    </div>
                                </details>

                                <details className="sort__dtls">
                                    <summary className="sort__dtls__title">CHOOSE SIZE<svg width="10" height="5"
                                        viewBox="0 0 11 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M5.00214 5.00214C4.83521 5.00247 4.67343 4.94433 4.54488 4.83782L0.258102 1.2655C0.112196 1.14422 0.0204417 0.969958 0.00302325 0.781035C-0.0143952 0.592112 0.0439493 0.404007 0.165221 0.258101C0.286493 0.112196 0.460759 0.0204417 0.649682 0.00302327C0.838605 -0.0143952 1.02671 0.043949 1.17262 0.165221L5.00214 3.36602L8.83167 0.279536C8.90475 0.220188 8.98884 0.175869 9.0791 0.149125C9.16937 0.122382 9.26403 0.113741 9.35764 0.1237C9.45126 0.133659 9.54198 0.162021 9.6246 0.207156C9.70722 0.252292 9.7801 0.313311 9.83906 0.386705C9.90449 0.460167 9.95405 0.546351 9.98462 0.639855C10.0152 0.733359 10.0261 0.83217 10.0167 0.930097C10.0073 1.02802 9.97784 1.12296 9.93005 1.20895C9.88227 1.29494 9.81723 1.37013 9.73904 1.42982L5.45225 4.88068C5.32002 4.97036 5.16154 5.01312 5.00214 5.00214Z"
                                            fill="#6F6E6E" />
                                    </svg>
                                    </summary>
                                    <div className="sort__dtls__box">
                                        <label><input type="checkbox" /> XS</label>
                                        <label><input type="checkbox" /> S</label>
                                        <label><input type="checkbox" /> M</label>
                                        <label><input type="checkbox" /> L</label>
                                    </div>
                                </details>

                                <details className="sort__dtls">
                                    <summary className="sort__dtls__title">QUANTITY<svg width="10" height="5"
                                        viewBox="0 0 11 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M5.00214 5.00214C4.83521 5.00247 4.67343 4.94433 4.54488 4.83782L0.258102 1.2655C0.112196 1.14422 0.0204417 0.969958 0.00302325 0.781035C-0.0143952 0.592112 0.0439493 0.404007 0.165221 0.258101C0.286493 0.112196 0.460759 0.0204417 0.649682 0.00302327C0.838605 -0.0143952 1.02671 0.043949 1.17262 0.165221L5.00214 3.36602L8.83167 0.279536C8.90475 0.220188 8.98884 0.175869 9.0791 0.149125C9.16937 0.122382 9.26403 0.113741 9.35764 0.1237C9.45126 0.133659 9.54198 0.162021 9.6246 0.207156C9.70722 0.252292 9.7801 0.313311 9.83906 0.386705C9.90449 0.460167 9.95405 0.546351 9.98462 0.639855C10.0152 0.733359 10.0261 0.83217 10.0167 0.930097C10.0073 1.02802 9.97784 1.12296 9.93005 1.20895C9.88227 1.29494 9.81723 1.37013 9.73904 1.42982L5.45225 4.88068C5.32002 4.97036 5.16154 5.01312 5.00214 5.00214Z"
                                            fill="#6F6E6E" />
                                    </svg>
                                    </summary>
                                    <div className="sort__dtls__box">
                                        <label><input type="checkbox" /> XS</label>
                                        <label><input type="checkbox" /> S</label>
                                        <label><input type="checkbox" /> M</label>
                                        <label><input type="checkbox" /> L</label>
                                    </div>
                                </details>
                            </div>

                            <button
                                className="product__add-btn product-page__add-btn"
                                onClick={handleAddToCart}
                            >
                                <svg
                                    className="product-page__add-btn_cart" width="26" height="24" viewBox="0 0 32 29"
                                    fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M26.199 29C25.5512 28.9738 24.9396 28.6948 24.4952 28.2227C24.0509 27.7506 23.8094 27.1232 23.8225 26.475C23.8356 25.8269 24.1023 25.2097 24.5653 24.7559C25.0283 24.3022 25.6508 24.048 26.2991 24.048C26.9474 24.048 27.5697 24.3022 28.0327 24.7559C28.4957 25.2097 28.7624 25.8269 28.7755 26.475C28.7886 27.1232 28.5471 27.7506 28.1028 28.2227C27.6585 28.6948 27.0468 28.9738 26.399 29H26.199ZM6.75098 26.32C6.75098 25.79 6.90815 25.2718 7.20264 24.8311C7.49712 24.3904 7.91569 24.0469 8.4054 23.844C8.8951 23.6412 9.43399 23.5881 9.95386 23.6915C10.4737 23.7949 10.9512 24.0502 11.326 24.425C11.7009 24.7998 11.9562 25.2773 12.0596 25.7972C12.163 26.317 12.1098 26.8559 11.907 27.3456C11.7041 27.8353 11.3606 28.2539 10.9199 28.5483C10.4792 28.8428 9.96108 29 9.43103 29C9.07892 29.0003 8.73017 28.9311 8.40479 28.7966C8.0794 28.662 7.78374 28.4646 7.53467 28.2158C7.28559 27.9669 7.08805 27.6713 6.95325 27.3461C6.81844 27.0208 6.74902 26.6721 6.74902 26.32H6.75098ZM10.551 20.686C10.2916 20.6868 10.039 20.6024 9.83215 20.4457C9.62531 20.2891 9.47563 20.0689 9.40601 19.819L4.573 2.36401H1.18005C0.866568 2.36401 0.565906 2.23947 0.344238 2.01781C0.12257 1.79614 -0.00195312 1.49549 -0.00195312 1.18201C-0.00195312 0.868519 0.12257 0.567873 0.344238 0.346205C0.565906 0.124537 0.866568 5.81268e-06 1.18005 5.81268e-06H5.46106C5.72055 -0.00080736 5.97309 0.0837201 6.17981 0.240568C6.38653 0.397416 6.53589 0.617884 6.60498 0.868006L11.438 18.323H24.616L28.999 8.27501H14.399C14.2409 8.27961 14.0834 8.25242 13.9359 8.19507C13.7884 8.13771 13.6539 8.05134 13.5404 7.94108C13.4269 7.83082 13.3366 7.69891 13.275 7.55315C13.2134 7.40739 13.1816 7.25075 13.1816 7.0925C13.1816 6.93426 13.2134 6.77762 13.275 6.63186C13.3366 6.4861 13.4269 6.35419 13.5404 6.24393C13.6539 6.13367 13.7884 6.0473 13.9359 5.98994C14.0834 5.93259 14.2409 5.90541 14.399 5.91001H30.812C31.0077 5.90996 31.2003 5.95866 31.3724 6.05172C31.5446 6.14478 31.6908 6.27926 31.798 6.44301C31.9058 6.60729 31.9714 6.79569 31.9889 6.99145C32.0063 7.18721 31.9752 7.38424 31.8981 7.565L26.493 19.977C26.4007 20.1876 26.249 20.3668 26.0565 20.4927C25.864 20.6186 25.6391 20.6858 25.4091 20.686H10.551Z"
                                        fill="#E8E8E8" />
                                </svg>Add to Cart</button>
                        </div>
                    </div>
                </div>

                <div className="product-page__offers product__items">

                    {currentProducts.map((product, index) => {
                        if (product.is_featured) {
                            return (
                                <ProductCard key={index} product={product} />
                            );
                        }
                        return null;
                    })}
                </div>


            </section>
            <Subscribe />
        </div>
    );
}

export default Product;