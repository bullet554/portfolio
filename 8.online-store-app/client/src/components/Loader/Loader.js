import "./Loader.css";

const Loader = ({ text = "Загрузка..." }) => {
  return (
    <div className="loader center">
      <div className="loader__spinner" aria-hidden="true"></div>
      <p className="loader__text">{text}</p>
    </div>
  );
};

export default Loader;