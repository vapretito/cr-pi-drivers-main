import { Link } from "react-router-dom";
import "./landing.style.css";
import image from "../../Components/Imagenes/formula-1-logo-7.png";

const Landing = () => {
  return (
    <div className="landing">
        <div className="lines">
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>

      <div className="logo-container">
        <img className="logo" src={image} alt="Logo" />
      </div>
      <div className="contenedor">
        <Link to="/home">
          <button className="btn">Ingresar</button>
        </Link>
      </div>
      
      
      </div>
    </div>
  );
};

export default Landing;
