import { useEffect, useState } from "react";
import Breadcrumbs from "../components/Navigation/Breadcrumbs/Breadcrumbs";
import SortFilter from "../components/Navigation/SortFilter/SortFilter";
import ProductCard from "../components/ProductCard/ProductCard";
import Feature from "../components/Feature/Feature";
import Subscribe from "../components/Subscribe/Subscribe";
import arrowLeft from '../assets/img/ui/paginArrowLeft.svg';
import arrowRight from '../assets/img/ui/paginArrowRight.svg';
import '../styles/pagesStyles/Catalog.css';
import Loader from "../components/Loader/Loader";

const Catalog = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 9;

    const [isLoading, setIsLoading] = useState(true);

    const [featuredOnly, setFeaturedOnly] = useState(false);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [priceSort, setPriceSort] = useState('none');

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        let isMounted = true;

        const loadProducts = async () => {
            try {
                setIsLoading(true);
                scrollToTop();

                const res = await fetch('/api/products');
                const data = await res.json();

                // искусственная задержка (можно убрать)
                await new Promise((resolve) => setTimeout(resolve, 2000));

                if (isMounted) {
                    setProducts(data);
                }
            } catch (error) {
                console.error('Error:', error);
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        loadProducts();

        return () => {
            isMounted = false;
        };
    }, []);

    const filteredProducts = products
        .filter(p => (featuredOnly ? p.is_featured : true))
        .filter(p => (selectedSizes.length ? selectedSizes.includes(p.size) : true));

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (priceSort === 'asc') return a.price - b.price;
        if (priceSort === 'desc') return b.price - a.price;
        return 0;
    });

    const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    useEffect(() => {
        setCurrentPage(1);
    }, [featuredOnly, selectedSizes, priceSort]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        scrollToTop();
    };

    const handlePrevClick = () => {
        setCurrentPage(currentPage - 1);
        scrollToTop();
    };

    const handleNextClick = () => {
        setCurrentPage(currentPage + 1);
        scrollToTop();
    };

    return (
        <>
            <Breadcrumbs />
            <SortFilter
                featuredOnly={featuredOnly}
                setFeaturedOnly={setFeaturedOnly}
                selectedSizes={selectedSizes}
                setSelectedSizes={setSelectedSizes}
                priceSort={priceSort}
                setPriceSort={setPriceSort}
            />
            <section className="product center">

                <div className="product__items">

                    {isLoading ? (
                        <Loader text="Loading of products..." />
                    ) : (
                        currentProducts.map((product, index) => (
                            <ProductCard key={index} product={product} />
                        ))
                    )}
                </div>

                <div className="pagination">
                    <div className="pagination__content">
                        {currentPage > 1 && (
                            <img
                                src={arrowLeft}
                                onClick={handlePrevClick}
                                className="pagination__btn-arrow"
                            />
                        )}

                        {Array.from({ length: totalPages }, (_, index) => index + 1).map(number => (
                            <button
                                key={number}
                                onClick={() => handlePageChange(number)}
                                className={`
                                pagination__btn 
                                ${currentPage === number ? 'pagination__btn_active' : ''}
                                `}
                            >
                                {number}
                            </button>
                        ))}

                        {currentPage < totalPages && (
                            <img
                                src={arrowRight}
                                onClick={handleNextClick}
                                className="pagination__btn-arrow"
                            />
                        )}
                    </div>
                </div>
            </section>
            <Feature />
            <Subscribe />
        </>
    );
}

export default Catalog;