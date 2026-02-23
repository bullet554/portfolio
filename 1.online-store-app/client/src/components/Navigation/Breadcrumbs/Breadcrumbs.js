import { Link } from 'react-router-dom';
import './Breadcrumbs.css';

const Breadcrumbs = ({ items }) => {
    return (
        <section className="breadcrumbs center">
            <div className="breadcrumbs__left">
                <h1 className="breadcrumbs__left_title">NEW ARRIVALS</h1>
            </div>
            <ul className="breadcrumbs__right">
                <Link to="/" className="breadcrumbs__link">HOME</Link>
                <Link to="#" className="breadcrumbs__link">MEN</Link>
                <Link to="#" className="breadcrumbs__link">NEW ARRIVALS</Link>
            </ul>
        </section>
    );
};

export default Breadcrumbs;