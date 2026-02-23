import { Link } from 'react-router-dom';
import './Offer.css';

const Offer = () => {
    return (
        <section className="offer center">

            <Link to="#" className="offer__items offer__item-1">
                <p className="offer__subtitle">30% OFF</p>
                <h2 className="offer__title">FOR WOMEN</h2>
            </Link>

            <Link to="#" className="offer__items offer__item-2">
                <p className="offer__subtitle">HOT DEAL</p>
                <h2 className="offer__title">FOR MEN</h2>
            </Link>

            <Link to="#" className="offer__items offer__item-3">
                <p className="offer__subtitle">NEW ARRIVALS</p>
                <h2 className="offer__title">FOR KIDS</h2>
            </Link>

            <Link to="#" className="offer__items offer__item-4">
                <p className="offer__subtitle">LUXIROUS & TRENDY</p>
                <h2 className="offer__title">ACCESORIES</h2>
            </Link>
        </section>
    );
}

export default Offer;