import avatar from '../../assets/img/misc/subscribe__hero.jpg';
import './Subscribe.css';

const Subscribe = () => {
    return (
        <section className="subscribe ">

            <div className="subscribe__left">
                <img src={avatar} alt="subscribe hero" className="subscribe__img" />
                <p
                    className="subscribe__info"
                >
                    “Vestibulum quis porttitor dui! Quisque viverra nunc mi,
                    <span className="subscribe__italic"> a pulvinar </span>
                    purus condimentum“
                </p>
            </div>

            <div className="subscribe__right">
                <h2 className="subscribe__title">SUBSCRIBE </h2>
                <p className="subscribe__subtitle">FOR OUR NEWLETTER AND PROMOTION</p>
                <div className="subscribe__form">
                    <input
                        className="subscribe__email"
                        type="email"
                        placeholder="Enter Your Email"
                    />
                    <button className="subscribe__btn">Subscribe</button>
                </div>
            </div>
        </section>
    );
}

export default Subscribe;