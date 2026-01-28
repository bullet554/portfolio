import './Feature.css';
import feature1 from '../../assets/img/ui/feature_img-1.svg';
import feature2 from '../../assets/img/ui/feature_img-2.svg';
import feature3 from '../../assets/img/ui/feature_img-3.svg';

const Feature = () => {
    return (
        <section className="feature center">

            <div className="feature__content">
                <img src={feature1} alt="Feature image" className="feature__img" />
                    <h3 className="feature__name">Free Delivery</h3>
                    <p className="feature__info">Worldwide delivery on all. Authorit tively morph next-generation innov tion
                        with extensive models.</p>
            </div>

            <div className="feature__content">
                <img src={feature2} alt="Feature image" className="feature__img" />
                    <h3 className="feature__name">Sales & discounts</h3>
                    <p className="feature__info">Worldwide delivery on all. Authorit tively morph next-generation innov tion
                        with extensive models.</p>
            </div>

            <div className="feature__content">
                <img src={feature3} alt="Feature image" className="feature__img" />
                    <h3 className="feature__name">Quality assurance</h3>
                    <p className="feature__info">Worldwide delivery on all. Authorit tively morph next-generation innov tion
                        with extensive models.</p>
            </div>
        </section>
    );
}

export default Feature;